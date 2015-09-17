import gulp from 'gulp';
import del from 'del';
import mocha from 'gulp-mocha';
import babel from 'gulp-babel';
import gutil from 'gulp-util';
import sourcemaps from 'gulp-sourcemaps';
import glob from 'globby';

/* import {
    lintFiles,
    getPrinter
} from 'canonical'; */

gulp.task('lint', () => {
    return;
    return glob(['./src/**/*.js', './test/**/*.js'])
        .then((paths) => {
            let printer,
                report;

            printer = getPrinter();
            report = lintFiles(paths);

            if (report.errorCount || report.warningCount) {
                console.log(printer(report));
            }
        });
});

gulp.task('clean', ['lint'], () => {
    return del([
            './dist/*',
        ]);
});

gulp.task('build-es5', ['clean'], () => {
    return gulp
        .src('./src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('test', ['build-es5'], (done) => {
    return gulp
        .src('./test/**/*.js', {
            read: false
        })
        .pipe(mocha());
});

gulp.task('build', ['test']);

gulp.task('default', ['build']);

gulp.task('watch', () => {
    gulp.watch(['./src/**/*', './test/**/*'], ['default']);
});
