var gulp = require('gulp'),
    rename = require('gulp-rename'),
    gutil = require('gulp-util'),
    changed = require('gulp-changed'),
    webserver = require('gulp-webserver');

// run init tasks
gulp.task('.', ['depends', 'dist']);

gulp.task('default', ['.']);

// run development task
gulp.task('dev', ['dist', 'watch', 'serve']);

gulp.task('dist', ['ts', 'html', 'images', 'css', 'scss']);

// serve the dist dir
gulp.task('serve', function () {
  gulp.src('dist')
   .pipe(webserver({
      // open: true
      livereload: true
   }));
});

// watch for changes and run the relevant task
gulp.task('watch', function () {
  gulp.watch('src/**/*.ts', ['ts']);
  gulp.watch('src/img/**/*.*', ['images']);
  gulp.watch('src/**/**/*.html', ['html']);
  gulp.watch('src/**/**/*.twig', ['twig']);
  gulp.watch('src/**/**/*.css', ['css']);
  gulp.watch('src/**/**/*.scss', ['scss']);
});

// move dependencies into dist dir
gulp.task('depends', function () {
  gulp.src('depends/**/*.*').pipe(gulp.dest('dist/depends'));
  gulp.src('src/nw/*.*').pipe(gulp.dest('dist'));
});

// transpile typescript
gulp.task('ts', function(){
  var tsc = require('gulp-typescript');
  var conf = require('./tsconfig.json');

  var res = gulp.src([
      'src/**/*.ts',
      'typings/**/*.d.ts'
    ])
  .pipe(changed('src/**/*.ts'))
  .pipe(tsc(conf.compilerOptions))
  .js.pipe(gulp.dest('dist'));
});

// move html
gulp.task('html', function () {
  return gulp.src('src/**/*.html')
    .pipe(changed('src/**/*.html'))
    .pipe(gulp.dest('dist'))
});

// move images
gulp.task('images', function () {
  return gulp.src('src/img/**/*.*')
    .pipe(gulp.dest('dist/img'))
});

// move css
gulp.task('css', function () {
  return gulp.src('src/**/*.css')
    .pipe(changed('src/**/*.css'))
    .pipe(gulp.dest('dist'))
});

// transpile scss
gulp.task('scss', function () {
  var sass = require('gulp-ruby-sass');

  sass('src/scss/**/*.scss')
    .on('error', sass.logError)
    .pipe(changed('src/scss/**/*.scss'))
    .pipe(gulp.dest('dist/css'));

    sass('src/app/**/*.scss', {
      loadPath: [
        process.cwd()+'/src'
      ]
    })
    .on('error', sass.logError)
    .pipe(changed('src/app/**/*.scss'))
    .pipe(gulp.dest('dist/app'));
});

// zip distribution folder
gulp.task('zip', () => {
  const zip = require('gulp-zip');
  return gulp.src('dist/**/*')
    .pipe(zip('build.zip'))
    .pipe(gulp.dest('build'));
});
