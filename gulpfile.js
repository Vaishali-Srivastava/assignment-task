var gulp = require('gulp')
compass = require('gulp-compass')
browserSync = require('browser-sync').create()
imagemin = require('gulp-imagemin')
cache = require('gulp-cache')
minify = require('gulp-minify')
realFavicon = require('gulp-real-favicon'),
  autoprefixer = require('gulp-autoprefixer');
fs = require('fs');
// images Compression
gulp.task('images', function() {
  return gulp.src('./app/public/images/**/*.+(png|jpg|jpeg|gif|svg)').pipe(cache(imagemin([
    imagemin.gifsicle({ interlaced: true }),
    imagemin.jpegtran({ progressive: true }),
    imagemin.optipng({ optimizationLevel: 3 }),
    imagemin.svgo({
      plugins: [{
        removeViewBox: true
      }]
    })
  ]))).pipe(gulp.dest('./app/public/images'))
});
// Sass Compiler
gulp.task('compass', function() {
  return gulp.src('./app/public/scss/**.scss')
    .pipe(
      compass({
        style: 'compressed',
        // style: 'compact',
        image: './app/public/images',
        css: './app/public/css',
        sass: './app/public/scss',
        sourcemap: true
      })
    ).pipe(autoprefixer())
    .pipe(gulp.dest('./app/public/css'))
    .pipe(browserSync.stream())
});
// Javascript Compression
gulp.task('compress', function() {
  gulp.src('./app/public/js/dev/**/*.js').pipe(minify({
    ext: {
      //src:'.min.js',
      min: '.min.js'
    },
    exclude: ['tasks'],
    ignoreFiles: ['*.combo.js', '*.min.js']
  })).pipe(gulp.dest('./app/public/js'))
});
// BrowserSync
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './',
    },
    startPath: "./app/public/index.phtml"
  })
});

// Combining Gulp tasks
gulp.task('serve', ['browserSync', 'compass', 'compress'], function() {
  gulp.watch("./app/public/scss/*.scss", ['compass']);
  gulp.watch("./app/public/js/dev/**/*.js", ['compress']).on('change', browserSync.reload);
  // gulp.watch("./app/public/*.html").on('change', browserSync.reload);
});
// Build App 
gulp.task('build', ['compass', 'images', 'compress', 'generate-favicon', 'inject-favicon-markups']);
gulp.task('default', ['serve']);