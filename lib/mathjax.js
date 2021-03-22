import { Worker, isMainThread, parentPort, workerData } from 'worker_threads';
import { readFileSync, writeFileSync } from 'fs';
import { argv } from 'yargs';
import 'colors';
const ProgressBar = require('progress');

import * as mathjax from 'mathjax-full';

if (isMainThread) {
  let progress = new ProgressBar(`[${'TeX'.green} ]: |:bar| :current/:total`, {
    total: argv._.length,
    incomplete: ' ',
  });

  // Create a new Worker wrapped in a Promise, for each filename
  async function renderJax(MathJax, filename) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(__filename, { workerData: { MathJax: MathJax, filename: filename } });
      worker.on('message', () => {
        progress.tick();
        resolve();
      });
      worker.on('error', reject);
      worker.on('exit', (code) => {
        if (code !== 0) {
          reject(`Worker stopped with error $code`);
        }
      });
    });
  }

  mathjax
    .init({
      options: {
        typesetError: (_, math, err) => console.log(math.math + ': ' + err),
      },
      loader: {
        paths: { mathjax: 'mathjax-full/es5', custom: '.' },
        require: require,
        load: ['input/tex-full', 'output/chtml', '[custom]/xypic'],
      },
      tex: {
        packages: { '[+]': ['xypic'] },
        inlineMath: [['$', '$']],
      },
      chtml: {
        fontURL: 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/output/chtml/fonts/woff-v2',
      },
    })
    .then((MathJax) => {
      // Wait until all Promises are resolved
      Promise.all(argv._.map((f) => renderJax(MathJax, f)));
    })
    .catch((err) => console.log(err));
} else {
  // Extract from workerData
  const MathJax = workerData.MathJax;
  const f = workerData.filename;

  // Get the html document
  const html = (MathJax.startup.document = MathJax.startup.getDocument(readFileSync(f, 'utf8')));

  // xypic has used the adaptor
  const adaptor = MathJax.startup.adaptor;

  // Clear the font cache
  html.outputJax.font.clearCache();

  // Typeset the document, with the render hooks that xypic has put in place
  html.clear().render();

  // Output the resulting HTML in-place
  writeFileSync(f, adaptor.doctype(html.document) + adaptor.outerHTML(adaptor.root(html.document)));

  // Post a message to the main thread
  parentPort.postMessage(`Rendered $f`);
}
