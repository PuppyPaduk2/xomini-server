'use strict';

const gulp = require('gulp');
const conf = require('./gulp-conf');
const typescript = require('gulp-typescript');
const browserSync = require('browser-sync').create();

const paths = {
    ts: ['src/**/*.ts'],
    package: './package.json'
};
const browserSyncConfig = {
    proxy: { target: 'localhost:3000' },
    server: false,
    open: true
};

gulp.task('typescript', () => {
    gulp.src(paths.ts)
        .pipe(typescript())
        .pipe(gulp.dest(conf.dirSrc));
});

gulp.task('package', () => {
    gulp.src(paths.package).pipe(gulp.dest(conf.dirDist));
});

gulp.task('build', () => {
    gulp.start(['typescript', 'package']);

    if (conf.watch) {
        gulp.watch(paths.ts, ['typescript']);
        gulp.watch(paths.package, ['package']);

        if (conf.sync) {
            browserSync.init(browserSyncConfig);
            gulp.watch(conf.dir, browserSync.reload);
        }
    }
});
gulp.task('b', ['build']);

gulp.task('default', function() {
    console.log(conf);
});
