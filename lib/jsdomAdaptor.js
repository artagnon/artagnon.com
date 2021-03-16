import { jsdomAdaptor } from 'mathjax-full/js/adaptors/jsdomAdaptor.js';

if (MathJax.startup) {
  MathJax.startup.registerConstructor('jsdomAdaptor', () => jsdomAdaptor(MathJax.config.JSDOM));
  MathJax.startup.useAdaptor('jsdomAdaptor', true);
}
