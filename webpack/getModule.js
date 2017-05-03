/**
 * Webpack.module
 *
 * Created by 刘谦 <qianliu> 112486391@qq.com
 * on 2017-02-27 16:02
 */

import path from 'path'

import vendor from './vendor'

export default ({ isProd, project, extractTextPlugin, needCSSModule } = {}) => {
  const imageWebpackLoaderRule = {
    loader: 'image-webpack-loader',
    options: {
      progressive: true,
      optipng: {
        optimizationLevel: 7
      },
      gifsicle: {
        interlaced: false
      },
      pngquant: {
        quality: '65-90',
        speed: 4
      },
      mozjpeg: {
        quality: 65
      },
      svgo: {
        plugins: [
          { removeViewBox: false },
          { removeEmptyAttrs: false }
        ]
      }
    }
  }

  const commonStyleRules = [
    'postcss-loader',
    'sass-loader?sourceMap',
    {
      loader: 'sass-resources-loader',
      options: {
        // 加载通用 scss
        resources: [
          path.resolve(__dirname, '../node_modules/bemify/sass/_bemify.scss'),
          path.resolve(__dirname, '../scss/**/*.scss')
        ]
      }
    }
  ]

  return {
    // 不需要经过 Webpack 处理的模块
    // https://webpack.js.org/configuration/module/#module-noparse
    noParse: vendor.map(v => new RegExp(`${v}$`)),
    rules: [
      // 编译 ES6
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        // babel-loader 可以缓存处理过的模块，对于没有修改过的文件不会再重新编译，
        // cacheDirectory 有着2倍以上的速度提升，这对于 rebuild 有着非常大的性能提升
        use: 'babel-loader?cacheDirectory'
      },
      // 编译 scss
      {
        test: /\.s?css$/,
        exclude: /node_modules/,
        use: needCSSModule
          ? [ /* eslint-disable indent */
              'style-loader',
              `css-loader?sourceMap${isProd ? '&minimize' : ''}&modules&localIdentName=[name]__[local]--[hash:base64:5]`
            ].concat(commonStyleRules)
          : extractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              `css-loader?sourceMap${isProd ? '&minimize' : ''}`
            ].concat(commonStyleRules),
          // 替换 css 中的资源引用路径指向 /public/
          publicPath: '../../'
        })
      },
      // 抽取通用组件中的图片
      {
        test: /\.(gif|png|jpe?g|svg)$/,
        include: path.resolve(__dirname, '../components/'),
        use: (() => {
          const loaders = [
            {
              loader: 'file-loader',
              options: {
                regExp: /components\/(.*)\//,
                name: `[1]/[name]-[hash:8].[ext]`
              }
            }
          ]

          if (isProd) {
            loaders.push(imageWebpackLoaderRule)
          }

          return loaders
        })()
      },
      // 抽取运营活动项目中的图片
      {
        test: /\.(gif|png|jpe?g|svg)$/,
        include: path.resolve(__dirname, '../src/'),
        use: (() => {
          const loaders = [
            {
              loader: 'file-loader',
              options: {
                name: `${project}/img/[name]-[hash:8].[ext]`
              }
            }
          ]

          if (isProd) {
            loaders.push(imageWebpackLoaderRule)
          }

          return loaders
        })()
      },
      // 抽取字体
      // 假设公共组件暂时不需要指定字体，以后需要时再补 conf
      {
        test: /\.(ttf|eot|woff2?)(\?v=[0-9]\.[0.9]\.[0-9])?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: `${project}/font/[name]-[hash:8].[ext]`
            }
          }
        ]
      },
      // 支持读取 json 文件
      {
        test: /\.json$/,
        exclude: /node_modules/,
        use: ['json-loader']
      }
    ]
  }
}
