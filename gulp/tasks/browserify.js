const gulp = require('gulp');
const gutil = require('gulp-util');
const source = require('vinyl-source-stream');
const browserify = require('browserify');
const config = require('../config').browserify;

gulp.task('browserify', function() {
  var bundler = browserify(config.src, config);

  bundler.transform('babelify');

  return bundler.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source(config.outputName))
    .pipe(gulp.dest(config.dest));
});