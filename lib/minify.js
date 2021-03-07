var minify = require('@node-minify/core');
var babelMin = require('@node-minify/babel-minify');
var cleanCSS = require('@node-minify/clean-css');

minify({
  compressor: babelMin,
  input: 'design/script.js',
  output: 'dist/script.min.js',
  callback: (err, _) => { if (err) console.log(err); }
});

minify({
  compressor: cleanCSS,
  input: 'design/style.css',
  output: 'dist/style.min.css',
  callback: (err, _) => { if (err) console.log(err); }
});
