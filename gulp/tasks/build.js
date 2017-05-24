const gulp = require('gulp');
const uglify = require('gulp-uglify');
const config = require('../config').uglify;

gulp.task('build', ['browserify','html', 'stylus', 'images', 'libraries'], function() {
  return gulp.src(config.src)
    .pipe(uglify())
    .pipe(gulp.dest(config.dest));
});
