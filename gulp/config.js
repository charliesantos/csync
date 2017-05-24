var dest = 'dist';
var src = 'app';
var gutil = require('gulp-util');

module.exports = {
  browserify: {
    src: src + '/app.js',
    dest: dest + '/',
    outputName: 'app.js'
  },
  html: {
    src: src + '/index.html',
    dest: dest
  },
  uglify: {
    src: dest + '/app.js',
    dest: dest + '/'
  },
  stylus: {
    src: src + '/styles/main.styl',
    dest: dest
  },
  images: {
    src: src + '/images/*.*',
    dest: dest + '/images/'
  },
  libraries: {
    src: src + '/libraries/**/*.js',
    dest: dest + '/libraries/'
  }
};
