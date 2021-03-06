var gulp = require('gulp'),
    noprotocol = require('gulp-noprotocol');


gulp.task('facebook', function() {
  return gulp
    .src([
      './facebook/js/**/*.js'
    ])
    .pipe(noprotocol.angular({
      deps: [],
      module: 'facebookApp',
      minify: false
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('twitter', function() {
  return gulp
    .src([
      './twitter/js/**/*.js'
    ])
    .pipe(noprotocol.angular({
      deps: [],
      module: 'twitterApp',
      minify: false
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['facebook', 'twitter']);