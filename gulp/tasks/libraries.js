var gulp = require('gulp');
var config = require('../config').libraries;

gulp.task('libraries', function() {
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest));
});
