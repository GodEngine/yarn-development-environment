/**
 * Created by 刘谦 <qianliu> 112486391@qq.com
 * on 2017-02-03 14:36
 */

const path = require('path')

module.exports = config => {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'es6-shim'],
    files: [
      'test/**/*.js'
    ],

    preprocessors: {
      // Add webpack as preprocessor
      'src/**/*.js': [
        'webpack',
        // 'sourcemap',
        // 'coverage'
      ],
      'test/**/*.js': [
        'webpack',
        // 'sourcemap',
        // 'coverage'
      ]
    },

    webpack: {
      devtool: 'eval',
      module: {
        rules: [
          // 编译 ES6
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  presets: ['env', 'react', 'stage-0']
                }
              }
            ]
          },
          // 编译 scss
          {
            test: /\.s?css$/,
            exclude: /node_modules/,
            loader: `css-loader?sourceMap!sass-loader?sourceMap!sass-resources-loader?resources=${path.resolve(__dirname, './node_modules/bemify/sass/_bemify.scss')}`
          },
          // 抽取图片
          {
            test: /\.(gif|png|jpe?g|svg)$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'file-loader'
              }
            ]
          }
        ]
      },
      externals: {
        'cheerio': 'window',
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      }
    },

    webpackServer: {
      // Don't spam the console when running in karma
      noInfo: true
    },

    plugins: [
      'karma-es6-shim',
      'karma-webpack',
      'karma-jasmine',
      'karma-sourcemap-loader',
      // 'karma-chrome-launcher',
      'karma-phantomjs-launcher',
      'karma-coverage',
    ],

    babelPreprocessor: {
      options: {
        presets: ['env', 'react']
      }
    },

    reporters: ['progress', 'coverage'],
    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    // browser: ['Chrome'],
    singleRun: false,
    autoWatchBatchDelay: 200 // 监听频率 ms
  })
}
