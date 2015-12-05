var gulp = require('gulp');

var nodemon = require('gulp-nodemon');

var jsFiles = ['*.js', 'public/**/*.js'];

gulp.task('inject', function() {
  var wiredep = require('wiredep').stream;
  var inject = require('gulp-inject');

  var injectSrc = gulp.src(['./public/assets/css/*.css', './public/assets/js/*.js'], {
    read: false,
  });

  var injectOptions = {
    ignorePath: '/public/assets',
  };

  var options = {
    bowerJson: require('./bower.json'),
    directory: './public/assets/lib',
    ignorePath: '../../public/assets',
  };

  return gulp.src('./server/views/*.ejs')
    .pipe(wiredep(options))
    .pipe(inject(injectSrc, injectOptions))
    .pipe(gulp.dest('./server/views'));
});

gulp.task('serve', ['inject'], function() {
  var options = {
    script: 'app.js',
    delayTime: 1,
    env: {
      PORT: 8000,
    },
    watch: jsFiles,
  };

  return nodemon(options)
    .on('restart', function(ev) {
      console.log('restarting');
    });
});
