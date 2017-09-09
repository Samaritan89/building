const gulp = require('gulp');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const minify = require('gulp-clean-css');

gulp.task('clean', () => {
  del.sync(['build']);
});

gulp.task('watch', () => {
  const watcher = gulp.watch('src/**/*', ['clean', 'less']);
  watcher.on('change', event => {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});

gulp.task('less', (done) => {
  gulp.src('src/style/**/*.less')
    .pipe(less())
    .pipe(autoprefixer({
      browsers: ['last 4 versions', 'Firefox >= 10']
    }))
    .pipe(minify({
      compatibility: 'ie8'
    }))
    .pipe(gulp.dest('build/style'));
});

gulp.task('default', [
  'clean',
  'less'
]);
