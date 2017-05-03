/**
 * Created by 刘谦 <qianliu> 112486391@qq.com
 * on 2017-02-27 16:16
 */
import path from 'path'
import vendor from './webpack/vendor'
import getExtractTextPlugin from './webpack/getExtractTextPlugin'
import getModule from './webpack/getModule'
import getPlugins from './webpack/getPlugins'
import getResolve from './webpack/getResolve'

export default ({
  p: project,
  s: needSprite = false,    // 是否需要生成雪碧图
  r: needRetina = false,    // 是否支持 Retina 雪碧图
  m: needCSSModule = false  // 是否支持 CSS Module
} = {}) => {
  if (!project) {
    // 参数校验 --env.p
    throw new Error('--env.p(project) must be spcified.')
  }
  const nodeEnv = process.env.NODE_ENV || 'development'
  const isProd = nodeEnv === 'production'
  const QNCDN = 'https://dn-web-blued-cn.qbox.me'
  const sourcePath = path.join(__dirname, `./src/${project}`)
  const distPath = path.join(__dirname, `./public`) // 打包到 ./public/ 下
  const publicPath = isProd ? `${QNCDN}/webapp/hd/` : ''
  const extractTextPlugin = getExtractTextPlugin({ project, isProd })
  return {
    devtool: isProd ? false : 'eval',
    context: __dirname,
    watch: !isProd,
    entry: {
      vendor,
      index: `./src/${project}/index.js`
    },
    output: {
      path: distPath,
      pathinfo: false, // remove comments
      publicPath,
      filename: `${project}/js/[name]-[chunkhash:8].js`,
      chunkFilename: `${project}/js/[name]-[chunkhash:8].js`
    },
    module: getModule({ isProd, project, extractTextPlugin, needCSSModule }),
    resolve: getResolve({ isProd }),
    plugins: getPlugins({
      needSprite,
      needRetina,
      project,
      nodeEnv,
      isProd,
      publicPath,
      sourcePath,
      distPath,
      extractTextPlugin
    })
  }
}
