var gulp = require('gulp'),
    gutil = require('gulp-util'),
    path = require('path'),
    karma = require('karma'),
    karmaParseConfig = require('karma/lib/config').parseConfig;

function runKarma(configFilePath, options, callback) {
	configFilePath = path.resolve(configFilePath);

	var server = karma.Server,
        log = gutil.log, 
        colors = gutil.colors,
        config = karmaParseConfig(configFilePath, {});

    Object.keys(options).forEach(function(key) {
      config[key] = options[key];
    });

	server.start(config, function(exitCode) {
		log('Karma has exited with ' + colors.red(exitCode));
		callback();
		process.exit(exitCode);
	});
}

/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
    runKarma('karma.conf.js', {
		autoWatch: false,
		singleRun: true
	}, done);

//   new Server({
//     configFile: __dirname + '/karma.conf.js',
//     singleRun: true
//   }, done).start();
});

/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('tdd', function (done) {
    runKarma('karma.conf.js', {
		autoWatch: true,
		singleRun: false
	}, done);
//   new Server({
//     configFile: __dirname + '/karma.conf.js'
//   }, done).start();
});

gulp.task('default', ['tdd']);

gulp.task('travis-ci', ['test']);