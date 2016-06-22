module.exports = function (config) {
    config.set({
        browsers: ['Chrome'],
        frameworks: ['jasmine'],
        files: [
            'src/**/*.js',
            'src/**/*.spec.js'
        ],
        //  Custom launcher for Travis-CI
        customLaunchers: {
            chromeTravisCI: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        },
    });

    // Custom configuration for Travis-CI
    if (process.env.TRAVIS) {
        config.browsers = ['chromeTravisCI'];
    }
}