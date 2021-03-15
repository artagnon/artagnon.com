import { readFileSync, writeFileSync } from 'fs';
import glob from 'glob';

glob('**/*.html', (_, res) =>
  res.forEach(r => {
    require('mathjax-full').init({
      loader: {
        paths: { custom: '.' },
        load: ['[custom]/xypic'],
      },
      tex: {
        packages: { '[+]': ['xypic'] },
        inlineMath: [['$', '$']]
      },
      document: readFileSync(r, 'utf8')
    }).then((MathJax) => {
      const adaptor = MathJax.startup.adaptor;
      const html = MathJax.startup.document;
      writeFileSync(r, adaptor.doctype(html.document) + adaptor.outerHTML(adaptor.root(html.document)));
    }).catch(err => console.log(err));
  }));
