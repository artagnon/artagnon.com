import glob from 'glob';

var htmlFiles = function () {
  glob('**/*.html', (_, res) => res);
};

