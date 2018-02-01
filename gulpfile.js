//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'), //本地安装gulp所用到的地方
    less = require('gulp-less'),
    minify = require('gulp-minify'),
    uglify = require('gulp-uglify'),
    connect = require('gulp-connect'), //livereload
    livereload = require('gulp-livereload'),
    cssminify = require('gulp-minify-css')
var browserSync = require('browser-sync').create(); // 静态服务器
var reload = browserSync.reload;


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

gulp.task('browser-sync', function() {
    var files = [
        'pages/*.html',
        'css/*.css',
        'js/*.js'
    ];
    browserSync.init({
        server: {
            baseDir: "dist",
        },
        port: 8080
    });
});
//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组) 
//gulp.dest(path[, options]) 处理完后文件生成路径

//定义看守任务
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('src/less/*.less', ['testLess']);
    gulp.watch('src/js/*.js', ['testjs']);
    gulp.watch('src/css/*.css', ['testCss']);
    gulp.watch('src/pages/*.html', ['testhtml']);
    gulp.watch('src/*.html', ['testhtml']);
    gulp.watch(['src/less/*.less', 'src/js/*.js', 'src/css/*.css', 'src/pages/*.html', 'src/*.html'], reload);
});

//定义默认任务
gulp.task('default', ['testLess', 'testjs', 'testhtml', 'testCss', 'watch', 'browser-sync', 'connect']);