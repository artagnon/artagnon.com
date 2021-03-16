import { readFileSync, writeFileSync } from 'fs';
import { argv } from 'yargs';

import * as mathjax from 'mathjax-full';

mathjax.init({
    options: {
        typesetError: (_, math, err) => console.log(math + ": " + err)
    },
    loader: {
        paths: { mathjax: 'mathjax-full/es5', custom: '.' },
        require: require,
        load: ['input/tex-full', 'output/chtml', '[custom]/jsdomAdaptor', '[custom]/xypic'],
    },
    tex: {
        packages: { '[+]': ['xypic'] },
        inlineMath: [['$', '$']]
    },
    startup: {
        elements: ['.mathjax', 'li > a', 'h1', 'h2', 'h3'],
    },
    chtml: {
        fontURL: 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/output/chtml/fonts/woff-v2'
    },
    JSDOM: require('jsdom').JSDOM
}).then((MathJax) =>
    argv._.forEach(r => {
        // Read in the HTML file
        const html = MathJax.startup.document = MathJax.startup.getDocument(readFileSync(r, 'utf8'));

        // xypic has used the adaptor
        const adaptor = MathJax.startup.adaptor;

        // Clear the font cache
        html.outputJax.font.clearCache();

        // Typeset the document, with the render hooks that xypic has put in place
        html.clear().rerender();

        // Output the resulting HTML in-place
        writeFileSync(r, adaptor.doctype(html.document) + adaptor.outerHTML(adaptor.root(html.document)));
    })
).catch(err => console.log(err));
