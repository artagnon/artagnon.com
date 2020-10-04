import { src, dest, parallel } from "gulp";
import concat from "gulp-concat";
import cleanCSS from "gulp-clean-css";
import minify from "gulp-minify";

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

const _js = js;
export { _js as js };
const _css = css;
export { _css as css };
const _default = parallel(js, css);
export { _default as default };
