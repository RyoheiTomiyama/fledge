'use strict'
var gulp = require('gulp');
var config = require('./gulpConfig');
var gulpLoadPlugins = require('gulp-load-plugins');
var $ = gulpLoadPlugins();
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('watch',function(){
	console.log('now loading ...');
	gulp.watch(config.jade.src,['jade']);
	gulp.watch('./src/less/**/*.less',['less']);
	// gulp.watch('./www/**/*.html', browserSync.reload);
	// gulp.watch('./www/css/**/*.css', browserSync.reload);
});

gulp.task('jade', function(){
	return gulp.src(config.jade.src)
		.pipe($.plumber({
			errorHandler: function (err) {
				console.log(err.message);
				this.emit('end');
			}
		}))
		.pipe($.jade({
			pretty: true
		}))
		.pipe(gulp.dest(config.jade.dst))
		.pipe(browserSync.reload({stream:true}));
});

//lessタスク
gulp.task('less', function () {
	return gulp.src(config.less.src)
		.pipe($.plumber({
			errorHandler: function (err) {
				console.log(err.message);
				this.emit('end');
			}
		}))
		.pipe($.sourcemaps.init())
		.pipe($.less())
		.pipe($.autoprefixer(config.autoprefixer.options))
		.pipe($.sourcemaps.write('./maps'))
		.pipe(gulp.dest(config.less.dst))
		.pipe(browserSync.reload({stream:true}))
		// .pipe(browserSync.stream())
		.on('error', function (err) {
			console.log(err);
		});
});

gulp.task('server',function(){
	browserSync.init({
		server: {
			baseDir: "./www"
		}
	});
});

gulp.task('default',['watch','server']);


