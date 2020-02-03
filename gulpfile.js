var gulp = require('gulp');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');

function css() {
  return gulp.src('design/*.css')
  .pipe(concat('style.min.css'))
  .pipe(cleanCSS())
  .pipe(gulp.dest('design'), { sourcemaps: true })
}

exports.default = css;
