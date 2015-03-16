var gulp          = require('gulp'),
    sass          = require('gulp-sass'),
    autoprefixer  = require('gulp-autoprefixer'),
    minifycss     = require('gulp-minify-css'),
    jshint        = require('gulp-jshint'),
    uglify        = require('gulp-uglify'),
    imagemin      = require('gulp-imagemin'),
    rename        = require('gulp-rename'),
    concat        = require('gulp-concat'),
    notify        = require('gulp-notify'),
    cache         = require('gulp-cache'),
    livereload    = require('gulp-livereload'),
    sourcemaps    = require('gulp-sourcemaps');

function errorLog (error) {
  console.error(error.message); 
  this.emit('end');
}

gulp.task('default', function() {
    gulp.start('styles', 'scripts', 'watch');
});

gulp.task('styles', function() {
  return gulp.src('public/assets/css/*.scss')
    .pipe(sourcemaps.init())
      .pipe(sass())
      .on('error', errorLog)
      .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
      .pipe(minifycss())
      .pipe(concat('style.min.css'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('public/assets/css/'))
    .pipe(livereload())
    .pipe(notify({ message: 'Styles task complete' }));
});


gulp.task('scripts', function() {
  return gulp.src(['public/**/*.module.js', 'public/app.routes.js', 'public/app.js', 'public/components/**/*.js', 'public/shared/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(sourcemaps.init())
      .pipe(concat('main.min.js'))
      .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .on('error', errorLog)
    .pipe(gulp.dest('public/assets/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('watch', ['styles', 'scripts'], function() {
  gulp.watch('public/**/*.js', ['scripts']);
  gulp.watch('public/**/*.scss', ['styles']);
});