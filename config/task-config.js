const shell = require('gulp-shell');
const path = require('path');
const browserSync = require('browser-sync');

module.exports = {
  html        : true,
  images      : true,
  fonts       : true,
  static      : true,
  svgSprite   : true,
  ghPages     : false,
  stylesheets : true,
  javascripts: {
    entry: {
      app: ["./app.js"]
    }
  },
  browserSync: {
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
        const paths = {
          src: path.resolve(process.env.PWD, PATH_CONFIG.src, PATH_CONFIG.html.src),
          dest: path.resolve(process.env.PWD, PATH_CONFIG.dest, PATH_CONFIG.html.dest),
        }
        return gulp.src(paths.src)
          .pipe(shell('hugo -s <%= file.path %> -d "../../public/"'))
          .pipe(gulp.dest(paths.dest))
          .pipe(browserSync.stream())
      }
    }
  }
}
