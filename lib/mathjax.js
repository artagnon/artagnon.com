import { readFileSync, writeFileSync } from 'fs';

import { argv } from 'yargs';
import { AllPackages } from 'mathjax-full/js/input/tex/AllPackages.js';
import { MathJax } from 'mathjax-full/js/components/startup.js';
import 'mathjax-full/js/util/entities/all.js';

const source = require('mathjax-full/components/src/source.js').source;

// Configure MathJax, with everything except startup.document
MathJax.config = {
    loader: {
        paths: { mathjax: 'mathjax-full/es5', custom: '.' },
        require: require,
        source: source,
        load: ['input/tex', 'output/chtml', '[custom]/jsdomAdaptor', '[custom]/xypic'],
        failed: err => console.log(err)
    },
    tex: {
        packages: AllPackages.concat('xypic'),
        inlineMath: [['$', '$']]
    },
    startup: {
        input: ['tex'],
        output: 'chtml',
        elements: ['.mathjax', 'li > a', 'h1', 'h2', 'h3'],
        handler: 'HTML'
    },
    chtml: {
        fontURL: 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/output/chtml/fonts/woff-v2'
    },
    JSDOM: require('jsdom').JSDOM
};

argv._.forEach(r => {
    // Import the loader and extract the new MathJax object out of it
    import('mathjax-full/js/components/loader.js').then(m => {
        MathJax = m.MathJax;
        // First, load the tex, chtml, svg, and liteDOM packages
        MathJax.loader.load('input/tex', 'output/chtml', '[custom]/jsdomAdaptor').then(_ => {
            // Set the various fields in MathJax.startup, as required by xypic
            MathJax.startup.getComponents();

            // Now load xypic, which installs a render-hook
            MathJax.loader.load('[custom]/xypic').then(_ => {
                // Read in the HTML file
                const html = MathJax.startup.getDocument(readFileSync(r, 'utf8'));

                // xypic has used the adaptor
                const adaptor = MathJax.startup.adaptor;

                // Typeset the document, with the render hooks that xypic has put in place
                html.render();

                // Output the resulting HTML in-place
                writeFileSync(r, adaptor.doctype(html.document) + adaptor.outerHTML(adaptor.root(html.document)));
            }).catch(err => console.log(err))
        }).catch(err => console.log(err))
    }).catch(err => console.log(err));
});
