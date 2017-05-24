const gulp = require('gulp');
const config = require('../config').html;

gulp.task('html', function() {
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest));
});