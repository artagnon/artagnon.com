var fs = require('fs');
var glob = require('glob');

glob('**/*.html', (_, res) =>
  res.forEach(r => {
    require('mathjax').init({
      loader: {
        load: ['./xypic.min.js'],
      },
      tex: {
        packages: { '[+]': ['xypic'] },
        inlineMath: [['$', '$']]
      },
      document: fs.readFileSync(r, 'utf8')
    }).then((MathJax) => {
      const adaptor = MathJax.startup.adaptor;
      const html = MathJax.startup.document;
      fs.writeFileSync(r, adaptor.doctype(html.document) + adaptor.outerHTML(adaptor.root(html.document)));
    }).catch(err => console.log(err));
  }));
