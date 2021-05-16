import minify from "@node-minify/core";
import babelMin from "@node-minify/babel-minify";
import sass from "sass";
import { writeFileSync } from "fs";

minify({
  compressor: babelMin,
  input: "design/script.js",
  output: "dist/script.min.js",
  callback: (err, _) => {
    if (err) console.log(err);
  },
});

writeFileSync("dist/style.min.css", sass.renderSync({ file: "design/style.sass" }).css.toString());
