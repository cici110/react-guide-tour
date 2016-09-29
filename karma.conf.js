var path = require('path');
var webpackConfig = require('./webpack.config');
webpackConfig.devtool = 'inline-source-map';
webpackConfig.module.preLoaders = [
    // transpile all files except testing sources with babel as usual
    // {
    //   test: /\.js$/,
    //   exclude: [
    //     //path.resolve('src/'),
    //     path.resolve('node_modules/')
    //   ],
    //   loader: 'babel'
    // },
    //transpile and instrument only testing sources with babel-istanbul
    {
      test: /\.js$/,
      include: path.resolve('app/'),
      loader: 'babel-istanbul',
      query: {
        cacheDirectory: true
          // see below for possible options
      }
    }
  ];

module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],
    singleRun: true,
    frameworks: ['mocha', 'chai', 'sinon', 'sinon-chai'],
    files: [
      'test.webpack.js'
    ],
    plugins: [
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-chai',
      'karma-mocha',
      'karma-sourcemap-loader',
      'karma-webpack',
      'karma-mocha-reporter',
      'karma-sinon',
      'karma-sinon-chai',
      'karma-coverage'
    ],
    preprocessors: {
      //'app/**/*.js': ['coverage'],
      'test.webpack.js': ['webpack', 'sourcemap']
    },
    reporters: ['mocha', 'coverage'],

    // optionally, configure the reporter
    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    },
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true
    },
    autoWatch: true
  });
};