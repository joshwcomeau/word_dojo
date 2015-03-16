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
    source        = require('vinyl-source-stream');


function errorLog (error) {
  console.error(error.message); 
  this.emit('end');
}

gulp.task('default', function() {
    gulp.start('browserify');
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


gulp.task('browserify', function(){
  var b = browserify();
  b.transform(reactify); // use the reactify transform
  b.add('./public/js/main.js');
  return b.bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('./public'));
});

gulp.task('scripts', function() {

  return gulp.src('')
    .pipe(browserify({
      insertGlobals : true,
      transform: ['reactify'],
      extensions: ['.jsx'],
      debug : !gulp.env.production
    }))
    .pipe(gulp.dest('./public/js/main.built.js'))  
});

gulp.task('watch', ['styles', 'scripts'], function() {
  gulp.watch('public/**/*.js', ['scripts']);
  gulp.watch('public/**/*.scss', ['styles']);
});