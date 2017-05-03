/**
 * Webpack.resolve
 *
 * Created by 刘谦 <qianliu> 112486391@qq.com
 * on 2017-02-27 16:09
 */

import path from 'path'

export default ({ isProd }) => ({
  extensions: ['.js', '.jsx', '.json', '.scss'],
  modules: [
    // 减少构建搜索或编译路径，可以获得显著的性能提升
    path.resolve(__dirname, '../src/'),
    'node_modules'
  ],
  // http://webpack.github.io/docs/configuration.html#resolve-alias
  alias: {
    'babel-polyfill': path.resolve(__dirname, '../node_modules/babel-polyfill/dist/polyfill.min.js'),
    'whatwg-fetch': path.resolve(__dirname, '../node_modules/whatwg-fetch/fetch.js'),
    'fastclick': path.resolve(__dirname, '../node_modules/fastclick/lib/fastclick.js'),
    'react': isProd
      ? path.resolve(__dirname, '../node_modules/preact-compat/dist/preact-compat.min.js')
      : path.resolve(__dirname, '../node_modules/preact-compat/dist/preact-compat.js'),
    'react-dom': isProd
      ? path.resolve(__dirname, '../node_modules/preact-compat/dist/preact-compat.min.js')
      : path.resolve(__dirname, '../node_modules/preact-compat/dist/preact-compat.js'),
    // 'react': isProd
    //   ? path.resolve(__dirname, '../node_modules/react/dist/react.min.js')
    //   : path.resolve(__dirname, '../node_modules/react/dist/react.js'),
    // 'react-dom': isProd
    //   ? path.resolve(__dirname, '../node_modules/react-dom/dist/react-dom.min.js')
    //   : path.resolve(__dirname, '../node_modules/react-dom/dist/react-dom.js'),
    'react-router': isProd
      ? path.resolve(__dirname, '../node_modules/react-router/umd/react-router.min.js')
      : path.resolve(__dirname, '../node_modules/react-router/umd/react-router.js'),
    'react-router-dom': isProd
      ? path.resolve(__dirname, '../node_modules/react-router-dom/umd/react-router-dom.min.js')
      : path.resolve(__dirname, '../node_modules/react-router-dom/umd/react-router-dom.js'),
    'react-lazyload': path.resolve(__dirname, '../node_modules/react-lazyload/'),
    'classnames': path.resolve(__dirname, '../node_modules/classnames/index.js'),
    'lodash.debounce': path.resolve(__dirname, '../node_modules/lodash.debounce/index.js')
  }
})
