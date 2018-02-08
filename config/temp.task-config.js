'use strict';

const shell = require('gulp-shell');
const path = require('path');
const browserSync = require('browser-sync');

module.exports = {
  html        : true,
  images      : false,
  fonts       : false,
  static      : false,
  svgSprite   : false,
  ghPages     : false,
  stylesheets : false,
  javascripts: {
    entry: {
      app: ["./app.js"]
    }
  },
  browserSync: {
    // files:["static", "content", "layouts", "data", "archetypes"],
    // logLevel: "debug",
    server: {
      baseDir: 'public'
    }
  },

  production: {
    rev: true
  },

  html:{
    alternateTask: function(gulp, PATH_CONFIG, TASK_CONFIG) {
      return function() {
        console.log(PATH_CONFIG.html.src);
        const paths = {
          src: path.resolve(process.env.PWD, PATH_CONFIG.src, '../'),
          dest: path.resolve(process.env.PWD, PATH_CONFIG.dest, PATH_CONFIG.html.dest),
        }
        gulp.src(paths.src)
          .pipe(shell('hugo -s <%= file.path %>'))
          .pipe(browserSync.stream())
      }
    }
  }
}
