var config = require('./config.json');
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');

var browserify = require('browserify');
var transform = require('vinyl-transform');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('buildjs', function(){
    var browserified = transform(function(filename){
        var b = browserify({entries: [filename], debug: true});
        return b.bundle();
    });

    return gulp.src(config.js_path + '/app.js')
        .pipe(browserified)
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.dist_path + '/js'));
});

var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');

gulp.task('buildcss', function(){
    gulp.src(config.scss_path + '/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(cssmin())
        .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.dist_path + '/css'));
});

var htmlmin = require('gulp-htmlmin');

gulp.task('buildhtml', function(){
    gulp.src('./index.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(config.dist_path));
});

gulp.task('watch', function(){
    gulp.watch(config.js_path + '/**/*.js', ['buildjs']);
    gulp.watch(config.scss_path + '/**/*.scss', ['buildcss']);
    gulp.watch('./index.html', ['buildhtml']);
});