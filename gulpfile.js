//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'), //本地安装gulp所用到的地方
    less = require('gulp-less'),
    minify = require('gulp-minify'),
    cssminify = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    connect = require('gulp-connect'), //livereload
    livereload = require('gulp-livereload'),
    runSequence = require('run-sequence'),
    del = require('del'),
    browserSync = require('browser-sync').create(), // 静态服务器
    reload = browserSync.reload;

//定义一个testLess任务（自定义任务名称）
gulp.task('testLess', function() {
    gulp.src('src/less/index.less') //该任务针对的文件
        .pipe(less()) //该任务调用的模块
        .pipe(gulp.dest('dist/css')) //将会在src/css下生成index.css
        .pipe(connect.reload())
});
gulp.task('testCss', function() {
    gulp.src('src/css/*.css') //该任务针对的文件
        .pipe(cssminify()) //该任务调用的模块
        .pipe(gulp.dest('dist/css')) //将会在src/css下生成index.css
        .pipe(connect.reload())
});
gulp.task('testjs', function() {
    gulp.src('src/js/*.js') //该任务针对的文件
        .pipe(uglify({ mangle: false })) //该任务调用的模块
        .pipe(gulp.dest('dist/js')) //将会在src/css下生成index.css
        .pipe(connect.reload())
});
gulp.task('testhtml', function() {
    gulp.src('src/pages/*.html')
        .pipe(gulp.dest('dist/pages'))
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist/'))
        .pipe(connect.reload());
});
//定义livereload任务
gulp.task('connect', function() {
    connect.server({
        notify: false,
        livereload: true
    });
});
// 清空输出目录
gulp.task('clean', () => del(['.tmp', 'dist/*', '!dist/.git'], {
    dot: true
}));
//浏览器实时刷新
gulp.task('browser-sync', ['default'], () => {
    browserSync.init({
        server: {
            baseDir: "dist",
        },
        port: 8080
    });
    //定义看守任务
    gulp.watch('src/less/*.less', ['testLess']);
    gulp.watch('src/js/*.js', ['testjs']);
    gulp.watch('src/css/*.css', ['testCss']);
    gulp.watch('src/pages/*.html', ['testhtml']);
    gulp.watch('src/*.html', ['testhtml']);
    gulp.watch(['src/less/*.less', 'src/js/*.js', 'src/css/*.css', 'src/pages/*.html', 'src/*.html'], reload);
});
//定义默认任务
gulp.task('default', ['clean'], cb =>
    runSequence(
        ['testLess', 'testjs', 'testhtml', 'testCss'], // 第二步：打包 
        cb
    )
);