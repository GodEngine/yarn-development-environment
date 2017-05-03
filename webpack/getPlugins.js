/**
 * Webpack.plugins
 *
 * Created by 刘谦 <qianliu> 112486391@qq.com
 * on 2017-02-27 16:16
 */

import fs from 'fs'
import path from 'path'
import webpack from 'webpack'
// import happypack from './happypack.config'

import CleanPlugin from 'clean-webpack-plugin'
import HtmlPlugin from 'html-webpack-plugin'
import ManifestPlugin from 'webpack-manifest-plugin'

// 由于 Webpack 的一个问题，该生成哈希值的方法并不是确定的。
// 保证哈希值是根据文件内容生成的，请使用 webpack-md5-hash 插件
import WebpackMd5Hash from 'webpack-md5-hash'

// 当我们更改了代码的任何一部分，即使剩下的文件内容没有被修改，
// 入口也会被更新以放入新的清单。这样反过来也就导致新的哈希值，影响了长期缓存
// 为了修复这个问题，使用这个插件来把清单导出到单独的 JSON 文件中
import ChunkManifestPlugin from 'chunk-manifest-webpack-plugin'

import SpritesmithPlugin from 'webpack-spritesmith'
// Webpack 提供的 UglifyJS 插件由于采用单线程压缩，速度很慢。
// 该插件可以并行运行 UglifyJS 插件，可有效减少构建时间。
import ParallelUglifyPlugin from 'webpack-parallel-uglify-plugin'
import CompressionPlugin from 'compression-webpack-plugin'

import QiniuPlugin from 'qiniu-webpack-plugin'
import QN from '../../../libs/qn'

export default ({
  publicPath, sourcePath, distPath, project, nodeEnv, extractTextPlugin, needSprite, needRetina,
  isProd
} = {}) => {
  const plugins = [
    // 清除上次打包生成的文件，保证目录干净
    new CleanPlugin(path.resolve(distPath, project), {
      // clean-webpack-plugin: xxx/xxx must be inside the project root. Skipping...
      // https://github.com/johnagan/clean-webpack-plugin/issues/10
      root: process.cwd()
    }),

    // Merge chunks
    new webpack.optimize.AggressiveMergingPlugin(),

    // 分离出第三方库到单独的 js 文件
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    }),

    // TODO
    // new webpack.DllReferencePlugin({
    //   context: path.resolve(process.cwd()),
    //   manifest: require(path.resolve(
    //     process.cwd(), `./public/dll/vendor.${isProd ? 'pro' : 'dev'}.json`
    //   ))
    // }),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(nodeEnv),
      'process.env.DEBUG': JSON.stringify(process.env.DEBUG)
    }),

    new webpack.NamedModulesPlugin(),

    // 生成单独的 css 文件
    extractTextPlugin,

    // 动态注入 css js 到 hbs 中
    new HtmlPlugin({
      // 从 ./public/ 写到 ./views/ 下
      filename: `../views/${project}.hbs`,
      // 参考的模板
      template: `./src/${project}/index.hbs`
    }),

    // js 与 css 共用相同 chunkhash 的解决方案
    // http://www.cnblogs.com/ihardcoder/p/5623411.html
    new WebpackMd5Hash(),

    new ManifestPlugin(),

    new ChunkManifestPlugin({
      filename: 'chunk-manifest.json',
      manifestVariable: 'webpackManifest'
    })
  ]

  // 生成雪碧图
  const spritePath = path.resolve(sourcePath, 'sprite')
  if ((needSprite || needRetina) && fs.existsSync(spritePath)) {
    fs.readdirSync(spritePath)
      .map(dir => {
        const stat = fs.lstatSync(path.resolve(spritePath, dir))
        const isDir = stat.isDirectory()
        // 有可能是文件或目录
        const suffix = isDir ? `_${dir}` : ''
        const spritesmithOpts = {
          src: {
            // 存放需要合成雪碧图的零碎图片文件
            cwd: path.resolve(spritePath, suffix.substr(1)),
            // 选择哪些类型的文件合成雪碧图
            glob: '*.*'
          },
          target: {
            // 生成的雪碧图地址
            image: path.resolve(sourcePath, `img/sprite${suffix}.png`),
            // 生成用来引用的 scss 文件
            css: path.resolve(sourcePath, `scss/_sprite${suffix}.scss`)
          },
          apiOptions: {
            // function
            // Takes full path to source image file and expected to return name by which it will be referenced in API.
            // Return value will be used as sprite.name
            generateSpriteName: p => `${isDir ? dir + '-' : ''}${path.basename(p).split('.')[0]}`,
            // css 文件引用的相对地址
            cssImageRef: `../img/sprite${suffix}.png`
          },
          spritesmithOptions: {
            // 生成从上排到下，一列的雪碧图用来处理一些需要 repeat 的情况
            algorithm: 'top-down',
            // 图片间距 2px
            padding: 2
          }
        }

        if (needRetina) {
          spritesmithOpts.retina = '@2x'
        }

        plugins.push(new SpritesmithPlugin(spritesmithOpts))
      })
  }

  if (!isProd) {
    // plugins.push(...happypack)
  } else {
    plugins.push(
      // Help people move from webpack 1 to webpack 2
      new webpack.LoaderOptionsPlugin({
        // Where loaders can be switched to minimize mode
        minimize: true,
        // Whether loaders should be in debug mode or not
        debug: !isProd
      }),

      // 压缩 js
      new ParallelUglifyPlugin({
        cacheDir: '.cache/',
        uglifyJS: {
          compress: {
            // 隐藏警告信息
            warnings: false
          },
          output: {
            // 移除注释内容
            comments: false
          }
        }
      }),
      // new webpack.optimize.UglifyJsPlugin({
      //   compress: {
      //     // 隐藏警告信息
      //     warnings: false
      //   },
      //   output: {
      //     // 移除注释内容
      //     comments: false
      //   }
      // }),

      // Gzip
      new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
      }),

      // 上传到七牛
      new QiniuPlugin({
        ACCESS_KEY: QN.accessKey,
        SECRET_KEY: QN.secretKey,
        bucket: QN.bucket,
        path: `webapp/hd/`,
        // 支持上传的文件
        include: [
          /\.js$/,
          /\.js.gz$/,
          /\.css$/,
          /\.(gif|png|jpe?g|svg)$/,
          /\.(ttf|eot|woff2?)(\?v=[0-9]\.[0.9]\.[0-9])?$/
        ]
      })
    )
  }

  return plugins
}
