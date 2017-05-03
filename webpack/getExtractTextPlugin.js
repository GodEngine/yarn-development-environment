/**
 * 将 CSS 文件单独打包提取出来
 *
 * Created by 刘谦 <qianliu> 112486391@qq.com
 * on 2017-02-27 16:05
 */

import ExtractTextPlugin from 'extract-text-webpack-plugin'

export default ({ project, isProd } = {}) => new ExtractTextPlugin({
  filename: `${project}/css/[name]-[contenthash:8].css`,
  disable: false, // 禁止使用插件
  allChunks: true // 是否将所有额外的 chunk 都压缩成一个文件
})
