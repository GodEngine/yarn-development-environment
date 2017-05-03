# 更新日志

严格遵循 [Semantic Versioning 2.0.0](http://semver.org/lang/zh-CN/) 语义化版本规范。

## 0.10.2
- `fix` Header@1.0.1
  - can render Children Node in .header__content without introBtnComponent props
  - change `introBtnComponent` to `introComponent`
  - add unit-testing

## 0.10.1
- Components
  - `Fix` App@1.2.0 - remove `touch-action: none;` from scss and browser of android can scroll normally

## 0.10.0
- 基础
  - `优化` 使用 preact-compat 代替 react & react-dom，减小 vendor.js 体积，加速首屏渲染

## 0.9.1
- 组件
  - `修复` Header@1.0.0 移除 header__banner 和下方元素的空白间隙

## 0.9.0
- 基础
  - 添加了 <a href="http://bourbon.io/">bourbon@v4</a> A simple and lightweight mixin library for Sass. 已默认全局引入，项目里可直接使用。
  - 移除了 happypack（提速并没有很理想，而且有时会缓存导致 webpack 编译不能及时生效）

## 0.8.0
- 组件
  - `App@1.2.0` 改用了新版的 react-router-dom@4
  - `Header@1.0.0` 改用了新版的 react-router-dom@4，移除了对 taskBtn 相关的支持
- 基础
  - 安装了 `react-router-dom@4`，后续请使用该插件进行 hash router
  - 安装了 `babel-plugin-transform-react-remove-prop-types`，当 NODE_ENV = production 时会删除 propTypes 相关代码以减小文件体积

## 0.7.18
- 组件
  - `修复` Carousel@0.3.1 修复了一个 bug，需要过滤掉 falsy child

## 0.7.17
- 组件
  - `修复` App@1.1.1 现在 footerImgSrc 变为可选参数了
  - `升级` Header@0.6.0 `bannerImgSrc` 改为 `bannerComponent` 可以传入任何 React Node 作为 Banner 了

## 0.7.16
- 工具
  - `修复` 移除了 _set-sprite.scss 向下取整的功能（因为 iOS 和 Android 适配问题）

## 0.7.15
- 工具
  - `修复` _set-sprite.scss 支持小数向下取整（解决安卓对 css 中浮点数取整不统一导致雪碧图定位错乱的问题）

## 0.7.14
- 库
  - `修复` getUser@0.2.1 修复了是否为主播的判断（现在改为通过 chatroom:auth 判断）

## 0.7.13
- 组件
  - `升级` Carousel@0.3.0 支持动画效果

## 0.7.12
- 组件
  - `升级` Carousel@0.2.0 添加了两个钩子函数 onSlideChangeStart(swiper) 和 onSlideChangeEnd(swiper)

## 0.7.11
- 组件
  - `升级` App@1.1.0 修复了返回顶部在 320px 下定位的问题

## 0.7.10
- 组件
  - `修复` Header@0.5.0 intro 图标不能紧贴顶部的问题
- 工具
  - `修复` getUser@0.2.0 支持定制返回额外的参数了 extraKeys

## 0.7.9
- 组件
  - `升级` Header@0.5.0 新增 introOnClick 点击 intro 时的回调函数

## 0.7.8
- 组件
  - `升级` Carousel@0.1.1 修复了不能全屏的问题

## 0.7.7
- 工具函数
  - `修复` req@0.2.0 不会强制添加问号了

## 0.7.6
- 构建
  - `禁用` 禁用了 happypack cache，因为修改 scss 后不会重新生成 css

## 0.7.5
- 工具函数
  - `升级` getUser@0.2.0 改用 international 判断当前 app version

## 0.7.4
- 工具函数
  - `修复` getUser 中 lid 需要根据 env 判断是否加密

## 0.7.3
- 构建
  - `升级` babel stage 升级到 0
- 组件
  - `修改` Tabs 修改了模块导入方式

## 0.7.2
- 组件
  - `升级` Spin@0.1.1
      - 修改了默认颜色为 #666
  - `新增` Tabs@0.1.0 标签页
  - `升级` Upload@0.1.1
      - 添加了 accept 判断，仅当 accept = image/* 时才返回缩略图 thumbnail (React Node)
  - `文档` 修改了部分组件的 README

## 0.7.1
- 组件
  - `升级` App@1.0.1
      - 修改了返回顶部 window 绑定 scroll 事件的方式，采用了 addEventListener 避免被后面的 window.onscroll 覆盖导致无效

## 0.7.0
- 组件
  - `新增` Carousel@0.1.0 走马灯

## 0.6.0
- 组件
  - `升级` App@1.0.0
      - 支持定制 body max width
      - 支持是否使用 Rem Layout
      - introBgColor 改为 introBgStyle 样式更灵活
      - returnTop 支持定制 speed

## 0.5.0
- Webpack
  - 拆分了 webpack.config 方便阅读
  - 优化了编译速度，提升一倍
- 组件
  - `升级` App@0.4.0
      - 修改 homeBgColor 为 homeBgStyle 支持自定义样式

## 0.4.2
- 组件
  - `升级` Header@0.4.0
    - 移除了 introImgSrc 改为 introImgComponent 可以灵活定制样式
    - 修改了部分属性名

## 0.4.1
- 基础
  - 现在若需生成支持 Retina 雪碧图只需要 --env.r 一个附加参数即可

## 0.4.0
- 基础
  - 添加了 Yarn 命令 `yarn run sprite` 支持对通用组件生成雪碧图

## 0.3.0
- 组件
  - `升级` App@0.3.0
      - 移除了前端路由到 Header@0.3.0~ 中
      - 移除了 Home 子组件和 introImgSrc 属性
  - `升级` Header@0.3.0
      - 接管了前端路由
      - 添加了活动详情图配置 introImgSrc
      - 添加了 我的任务-返回 组件

## 0.2.0
- 移除了 Gulp
- 完善了文档
- 组件
	- 按照 semver 划分
	- `升级` App@0.2.0
		  - **剥离出 Header 组件，解耦**
      - 移除了默认的 _loading.scss 样式，后续可使用 Spin 组件
		  - 部分参数调整
  - `升级` Header@0.2.0
      - 支持渲染子元素
  - `升级` Tab@0.2.0
      - 移除了部分注释代码
      - 默认的 loading 标签改用 Spin 组件代替
  - `新增` Modal@0.1.0 对话框
  - `新增` Upload@0.1.0 上传
  - `新增` Spin@0.1.0 加载中
- 通用方法
  - `新增` upload 上传文件至 CDN
- 工具函数
    - `新增` checkType 检查参数类型
    - `新增` pickChoice 根据一定比率随机抽取
    - `升级` req@0.2.0
      -支持根据 data 判断 Post form / Post JSON
- Webpack
  - `新增` 添加了 postcss-loader 来支持 autoprefixer

## 0.1.0
- **App** 新增布局容器组件
- **Tab** 新增标签页组件
