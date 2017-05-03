/**
 * 让 Loaders 可以多进程去处理文件，同时还可利用缓存来使 rebuild 更快
 *
 * Created by 刘谦 <qianliu> 112486391@qq.com
 * on 2017-02-27 18:35
 */

import os from 'os'
import HappyPack from 'happypack'

const threadPool = HappyPack.ThreadPool({
  size: os.cpus().length
})

const cache = process.env.HAPPY_CACHE === '1'

export default [
  new HappyPack({
    threadPool,
    cache,
    id: 'babel',
    loaders: ['babel-loader']
  }),

  new HappyPack({
    threadPool,
    cache,
    id: 'style',
    loaders: ['style-loader']
  }),

  new HappyPack({
    threadPool,
    cache,
    id: 'css',
    loaders: ['css-loader']
  }),

  // new HappyPack({
  //   threadPool,
  //   cache,
  //   id: 'postcss',
  //   loaders: ['postcss-loader']
  // }),

  new HappyPack({
    threadPool,
    cache,
    id: 'sass',
    loaders: ['sass-loader']
  }),

  new HappyPack({
    threadPool,
    cache,
    id: 'image',
    loaders: ['image-webpack-loader']
  }),

  // file-loader 兼容性有点问题
  // new HappyPack({
  //   threadPool,
  //   cache,
  //   id: 'file',
  //   loaders: ['file-loader']
  // }),

  new HappyPack({
    threadPool,
    cache,
    id: 'json',
    loaders: ['json-loader']
  })
]
