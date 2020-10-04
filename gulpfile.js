const { src, dest, parallel } = require("gulp");
const concat = require("gulp-concat");
const cleanCSS = require("gulp-clean-css");
const minify = require("gulp-minify");

function css() {
  return src([
    "design/all.css",
    "design/print.css"
  ])
    .pipe(cleanCSS())
    .pipe(concat("style.min.css"))
    .pipe(dest("dist"));
}

function js() {
  return src("design/*.js")
    .pipe(minify({ noSource: true }))
    .pipe(concat("script.min.js"))
    .pipe(dest("dist"));
}

exports.js = js;
exports.css = css;
exports.default = parallel(js, css);
