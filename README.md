# 运营活动

## 技术栈
- <a href="https://yarnpkg.com/" target="_blank">Yarn</a>
- <a href="http://es6.ruanyifeng.com/" target="_blank">ES6</a>
- <a href="https://babeljs.io/" target="_blank">Babel@6.x</a>
- React 栈
  - <a href="https://facebook.github.io/react/" target="_blank">react@15.x</a>
  - <a href="https://github.com/facebook/react/tree/master/packages/react-dom" target="_blank">react-dom</a>
  - <a href="https://github.com/facebook/react/tree/master/packages/react-dom" target="_blank">react-router@4.0.0-2</a>
- <a href="https://webpack.js.org/" target="_blank">Webpack@2.x</a>
- <a href="http://sass-lang.com/" target="_blank">Scss</a> (<a href="https://github.com/franzheidl/bemify" target="_blank">Bemify</a>)
- 单元测试 <a href="https://karma-runner.github.io/1.0/index.html" target="_blank">Karma</a> + <a href="https://jasmine.github.io/" target="_blank">Jasmine</a> + <a href="http://airbnb.io/enzyme/" target="_blank">Enzyme</a> + <a href="http://phantomjs.org/" target="_blank">PhantomJS</a>

## Yarn Scripts
- `yarn start -- --env.p=[projectFolderName] --env.s(可选，是否生成雪碧图) --env.r(可选，是否支持 Retina 雪碧图)`     开发模式
- `yarn run build -- --env.p=[projectFolderName]` 编译模式
- `yarn run sprite -- --env.c=[componentName] --env.v=[version] --env.r(可选，是否支持 Retina 雪碧图)`
- `yarn run lint -- --env.p=[projectFolderName]`  风格检查
- `yarn run test`       单元测试 使用 PhantomJS 容器（执行1次单元测试并退出）
- `yarn run test:watch` 单元测试 使用 PhantomJS 容器（挂起，监听修改并重新测试）
- `yarn run coverage`   运行一个基于 http-server 的 webServer 来查看单元测试覆盖率

## 目录结构
- `/components` *通用组件*
- `/constants`  *静态常量*
- `/utils`      *工具函数*
- `/src`        *开发目录*
- `/public`     *Webpack 打包后生成文件的目录*

## 规范
- 样式一律使用 scss
- 布局一律使用 flex

## 开发流程
- 从 master 分支创建你的活动分支
- cd apps/hd/ 安装依赖 yarn install
- coding
- 代码推送到 test 提测
- 代码推送到 master 上线
