const gulp = require('gulp');
const stylus = require('gulp-stylus');
const config = require('../config').stylus;

gulp.task('stylus', function() {
  return gulp.src(config.src)
    .pipe(stylus({
      'compress': true,
      'include css': true
    }))
    .pipe(gulp.dest(config.dest));
});