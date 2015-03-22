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
    sourcemaps    = require('gulp-sourcemaps'),
    react         = require('gulp-react'),
    reactify      = require('reactify'),
    browserify    = require('browserify'),
    source        = require('vinyl-source-stream'),
    webserver     = require('gulp-webserver');


function errorLog (error) {
  console.error(error.message); 
  this.emit('end');
}

gulp.task('default', function() {
    gulp.start('browserify', 'styles', 'webserver', 'watch');
});

gulp.task('styles', function() {
  return gulp.src('public/scss/*.scss')
    .pipe(sourcemaps.init())
      .pipe(sass())
      .on('error', errorLog)
      .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
      .pipe(minifycss())
      .pipe(concat('style.css'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('public/'));
});


gulp.task('browserify', function(){
  var b = browserify();
  b.transform(reactify); // use the reactify transform
  b.add('./public/js/main.js');
  return b.bundle()
    .pipe(source('main.js'))
    .pipe(rename('main.built.js'))
    .pipe(gulp.dest('./public'));

});

gulp.task('webserver', function() {
  gulp.src('public')
    .pipe(webserver({
      livereload: false,
      directoryListing: false,
      open: true,
      fallback: 'index.html'
    }));
});

gulp.task('watch', ['styles', 'browserify'], function() {
  gulp.watch([
    'public/js/components/**/*.jsx', 
    'public/js/actions/**/*.js', 
    'public/js/constants/**/*.js', 
    'public/js/stores/**/*.js', 
    'public/js/utils/**/*.js',
    'public/js/main.js'
  ], ['browserify']);
  gulp.watch('public/**/*.scss', ['styles']);
});