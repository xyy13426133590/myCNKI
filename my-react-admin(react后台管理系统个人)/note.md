<p>2020/12/08   第一天</p>
<text>完成登录页面的背景图以及使用粒子插件效果实现</text>
npm install  react   react-dom   react-router-dom

使用utils/BGPaticle粒子插件实现背景效果
npm install gsap   js库，用于构建可在每种主流浏览器中使用的高性能动画


<p>2020/12/09  第二天</p>
<text>完成登录页面和注册页面</text>
还未完成
yarn add antd

<p>2020/12/11  第三天</p>
<text>完成首页内容的布局和页面内容展示</text>

yarn add babel-plugin-import  按需引入对应的样式

yarn add @ant-design/charts

<p>2020/12/14  第四天</p>
<text>添加左侧菜单栏的静态展示项，并将静态菜单树改为动态递归实现菜单树(初步完成)</text>

<p>2020/12/15  第五天</p>
<text>实现左侧菜单栏的单个组件内容</text>

npm install screenfull   实现全局缩放(存在问题）
修改左侧菜单栏样式问题

细节优化：美化webkit内核滚动条

<p>2020/12/16  第六天</p>
<text>实现左侧菜单栏的业务逻辑以及组件路由导航</text>

yarn add react-loadable    用于加载具有动态导入的组件的高阶组件

yarn add nprogress   美化页面加载条

<p>2020/12/17  第七天</p>
<text>进一步实现左侧菜单栏的业务逻辑以及组件路由导航</text>
已完成左侧菜单栏数据列表渲染

<p>2020/12/18  第八天</p>
<text>左侧菜单栏组件有右侧内容实现路由联动以及面包屑导航组件title切换</text>

bug : 解决左侧菜单栏组件路由切换点击两次切换样式，面包屑导航已同步切换

yarn add react-typewriting-effect     打字机效果

<p>2020/12/22  第九天</p>
<text>解决左侧菜单栏以及整体的页面布局样式问题</text>

npm install   shufflejs        画廊效果



<p>2020/12/23  第10天</p>
<text>解决登录页面</text>


<p>2020/01/14  第.....</p>
<text>在react中使用FormRender ---是一个通过 JSON Schema 生成标准 Form 的渲染引擎，常用于自定义搭建配置表单界面生成</text>

yarn add form-render   form-render依赖antd/fusion组件库

<p>2020/01/15  第...天</p>
<text>在react中使用recoil状态管理</text>
yarn add recoil

atom 组件可以订阅的状态单位
# Atom是状态的单位。它们是可更新和可订阅的：当一个Atom被更新时，每个被订阅的组件都会用新的值来重新渲染。它们也可以在运行时创建。Atom可以用来代替 React 本地组件状态。如果从多个组件中使用同一个Atom，所有这些组件都会共享它们的状态。

selector 可以同步或者异步转换这个状态
# Selectors是一个纯函数，它接受Atom或其他Selectors作为输入。当这些上游的Atom或Selectors被更新时，Selectors函数将被重新评估。组件可以像Atom一样订阅Selectors，当Selectors发生变化时，组件就会被重新渲染。

<p>2020/01/21  第...天</p>
<text>路由跳转以及动画处理</text>
已正确处理好路由跳转

yarn add react-transition-group     路由跳转动画

<p>2020/01/26  第...天</p>
<text>丰富页面内容</text>

yarn add screenfull   全屏缩放

npm install react-bmapgl --save   添加 百度地图，先申请百度AK