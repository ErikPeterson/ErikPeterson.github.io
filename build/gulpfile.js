var config = require('./config.json');
var gulp = require('gulp');

var browserify = require('browserify');
var transform = require('vinyl-transform');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('buildjs', function(){
    var browserified = transform(function(filename){
        var b = browserify(filename);
        return b.bundle();
    });

    return gulp.src(config.js_path + '/app.js')
        .pipe(browserified)
        .pipe(uglify())
        .pipe(gulp.dest(config.dist_path + '/js'));
});

var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');

gulp.task('buildcss', function(){
    gulp.src(config.scss_path + '/main.scss')
        .pipe(sass())
    .pipe(gulp.dest(config.dist_path + '/css'));
});

gulp.task('watch', function(){
    gulp.watch(config.js_path + '/**/*.js', ['buildjs']);
    gulp.watch(config.scss_path + '/**/*.scss', ['buildcss']);
    gulp.watch('./index.html', ['buildhtml']);
});