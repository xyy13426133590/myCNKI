JSX 详解与实战
一切皆js  all in  js
什么是JSX
    推荐使用
    javascript and xml
    可拓展的标记性语言
    说明：jsx是react的一项技术， 不是全新的语言  ，js扩展
    在jsx中尖括号<>被当作html解析
    ()表示被当作js解析，并且将元素内容换行显示 
    并且只能有一个div根元素
JSX原理
    React.createElement
    只能有一个根元素
JSX基本语法
    标签类型：dom标签 div ps首字母小写
    自定义标签--组件  首字母必须大写
    内联样式
    支持表达式,不能写语句
    使用驼峰式命名
    标签注释: {/*... */}
    拓展运算符  属性展开 ...


虚拟dom以及非dom属性

    什么是虚拟dom
        批处理 diff
        dom操作成本高，大量的计算
        尽可能少的操作dom，提高渲染效率

非dom属性以及如何使用
    dangerouslySetInnerHTML === innerHTML
    //使用方式
    {_html: '<p>我是插入的元素</p>'}

    ref  
        如何创建?
        const userRef = React.createRef();
        相当于id
        不能在函数组件上使用
        函数内部使用
    key 
        提高渲染性能，唯一标志
         



    state是私有的，只能受控于当前组件，通常用在class组件当中
    props通常用于函数组件，并且不能去修改的

    state的更新可能是异步的，出于性能考虑 ，React可能将多个setState调用合并成一个调用
    那么  setState应该传入一个函数，而不是对象
    如：
    this.setState((state,props) =>({
        counter: state.count + props.increment
    }))

    在 React 中，将多个组件中需要共享的 state 向上移动到它们的最近共同父组件中，便可实现共享 state。这就是所谓的“状态提升”


    在react中，如何避免我的函数每次组件渲染时都会被调用?

    render() {
        return <button onClick={this.handleClick}>Click Me</button>  //正确做法就是不要在handleClick后面加()，只传递函数本身就行
    }

    如何阻止函数被调用太多次或者太快？

    节流：基于时间频率来进行抽样更改(throttle)
    import throttle from 'lodash.throttle';

    class LoadMoreButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleClickThrottled = throttle(this.handleClick, 1000);
    }

    componentWillUnmount() {
        this.handleClickThrottled.cancel();
    }

    render() {
        return <button onClick={this.handleClickThrottled}>Load More</button>;
    }

    handleClick() {
        this.props.loadMore();
    }
    }

    防抖：一段时间不活动之后发布更改(debounce)

    import debounce from 'lodash.debounce';

    class Searchbox extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.emitChangeDebounced = debounce(this.emitChange, 250);
    }

    componentWillUnmount() {
        this.emitChangeDebounced.cancel();
    }

    render() {
        return (
        <input
            type="text"
            onChange={this.handleChange}
            placeholder="Search..."
            defaultValue={this.props.value}
        />
        );
    }

    handleChange(e) {
        // React pools events, so we read the value before debounce.
        // Alternately we could call `event.persist()` and pass the entire event.
        // For more info see reactjs.org/docs/events.html#event-pooling
        this.emitChangeDebounced(e.target.value);
    }

    emitChange(value) {
        this.props.onChange(value);
    }
    }


    props与state的区别
    props是传递给组件的
    state是在组件内被自己管理的
    调用 setState 其实是异步的 ，所以它不会立即映射为新的值，如果需要基于当前的state计算新的值，应该传递一个函数，而不是对象

    什么是 “React Fiber”？
    Fiber 是 React 16 中新的协调引擎。它的主要目的是使 Virtual DOM 可以进行增量式渲染。

    Hook  （16.8新增）
      在不编写class的情况下，使用state，还有其他特性
     Hook是一些可以让你在函数组件里“钩入”React state及生命周期等特性的函数，不能在class组件中使用
      State Hook   useState      state操作

      Effect Hook   useEffect    数据获取，订阅或者手动修改dom操作    副作用函数，简称作用
      它跟class组件的componentDidMount、componentDidUpdate、componentWillUnmount类似，只不过是它们的合成版
    
     useContext 不使用组件嵌套就可以订阅React的context
     useReducer  通过reducer来管理组件本地复杂的state

     Hook只在最顶层使用，不要在循环，条件或者嵌套函数中调用


    //  Hook 

    useState 
        每次渲染，函数都会重新执行，函数执行完毕，所有的内存都会释放掉
        在函数内部创建一个当前函数组件的状态 ，提供了一个修改状态的方法

    useEffect（第二个参数传[] ,表示只会触发一次，很有用）
        总会执行一些副作用操作，函数组件，纯函数，props，固定的输入总会得到固定的输出

        什么是副作用？
            只想渲染一个dom ->dom渲染完了，还想执行一段逻辑(副作用)
            没有发生在数据向视图转换过程中的逻辑
            ajax  访问原生dom对象  定时器
            需要清除的  不需要清除的
            hook之前副作用都是不被允许的
        useEffect(fn) 组件渲染到屏幕之后才会执行
        一般是不需要同步    需要同步 使用useLayoutEffect
        如何清除副作用？
            componentWillUnmount
                返回   一个清除副作用的函数
    
    useContext
        16更新了context api
            context 爷孙组件传值
        useContext  使用context的能力
        context和useContext  组件之间的状态共享 问题   配合使用进行组件传值

        顶层的组件
        通过createContext创建context对象，然后在模板中return

        <context.Provider  value = {需要传的值}>{需要包裹的子组件}</context.Provider>

        子组件中
        import {context, 顶层的组件}
        const {需要解构获取的值} = useContext(context)


    useReducer
        redux
        useState内部就是使用useReducer实现的
        useState的替代方案  （state， action）=>  newState  和redux完全相同
        接收三个参数  state，配套的dispatch

    useRef  类似于id
        16  Object.createRef  创建ref方法
        {current: ''}
        使用场景：
        访问dom节点，useEffect去操作dom
    
    useMemo& useCallback   实现数据的缓存   计算的缓存     记忆函数
        useMemo 把创建函数和依赖项数组作为参数传入useMemo
        useCallback  接收一个内联回调函数和一个依赖项数组

        const memorized = useCallback(() =>{，当num依赖项变化的时候，重新创建函数体
            return count
        },[num]) //num为依赖的项，必须要传，否则不会实现数据的缓存

        const memorized2 = useMemo(() =>{
            return count
        },[num]) 
        console.log("记忆", memorized())  // useCallback返回的是一个函数体
        console.log("记忆2", memorized2)  //useMemo返回的是一个值

    自定义hook
        逻辑功能相同的片段 => 封装成单独的函数来使用
        自定义hook中可以调用官方提供的hook
        use开头，表示只能在函数组件中使用
        重用状态逻辑的方式，而不是复用state本身
        事实上每次调用都有一个独立的state
        抽离公共代码

        比如我们自定义一个  useNumber hook



    React Router 
        v4/v5 用法和理念基本一致，v2，v3 差异较大
        版本差异
            v4和v4之前版本比较
                v4：稳定版本，大多数项目，v4属于动态路由
                    react-router：路由基础库
                    react-router-dom：适用于浏览器的再次封装
                    react-router-native：适用于react-native环境的再次封装
                    react-router-config：静态路由配置助手
                之前：静态路由
            v5  vs  v4
                v5：完全兼容v4
                        支持react16，兼容react
                        消除了严格模式的警告
                        适用create-react-context  实现context api
            
            稳定性与兼容性
            改进与新特性
                >=15  引入了预优化build process.env.NODE_ENV
            
            目前的React Router版本中，已经不需要路由配置，一切皆组件

        前端路由
            原理：检测浏览器url的变化，截获url地址，然后进行url路由匹配
            hash： 锚点 #   hashChange      刷新页面，浏览器不会向服务器发送请求

            <button id="btn">点击</button>
            <script>
                var btn = document.getElementById("btn");
                btn.addEventListener('click', () => {
                    location.href = "#" + Math.floor(Math.random() * 10)
                })

                window.addEventListener("hashchange", e=>{
                    const {oldURL, newURL} = e
                    console.log(oldURL,newURL, location.hash) //location.hash #数字
                })
            </script>

            html5：history
                pushState()
                replaceState()
                onpopstate事件
                注意：页面刷新，浏览器会向服务器发送请求

        安装
            react web router   react-router-dom
            react native router  react-router-native
        第一个基础路由配置
            HashRouter
            BrowerRouter(位于最外层)    Route   （BrowerRouter相当于文具盒，route相当于文具盒中的一个工具）
        React Router 常见概念
            Router组件
                每个router都会创建一个history对象，用来保持当前位置的追踪
                web
                    HashRouter   只处理静态的url
                    BrowerRouter  非静态的站点，要处理不同的url
                react native
                    MemoryHistory
            Route组件
                只是一个具有渲染方法的普通react组件，路由匹配成功渲染该组件
                常用属性
                    path：''  路由匹配规则  可以省略，字符串类型
                    exact：boolean  true
                    component：渲染的组件
                    render：函数形式  逻辑操作，path匹配的时候执行
                    children：函数形式  逻辑操作，任何时候都会执行  match{}   null
                    渲染顺序：children > component > render
            Switch
                最多只能取出一个文具
                最多匹配一个组件
                作用：可以将Route组件分组
                404渲染页面
            Link与NavLink组件
                声明式导航
                to: string类型 （pathname,search, hash, state）
                replace:boolean  true   替换当前历史记录
                NavLink
                    特殊版的link， 当匹配的时候可以添加样式
                    activeClassName   activeStyle
                    exact
            Redirect组件
                场景：Redirect配合Route的render可以做登录判断
                重定向组件  to是必须
                to：字符串，对象
                push：boolean true   history.push
                from： 将要进入的url
                exact：true
            
            History对象
                每个router都会创建一个history对象，用来保持当前位置的追踪
                编程式导航
                    push
            withRouter组件

    动态路由
        路由规则不是预先确定的，在渲染的过程中确定的
        info/1  info/2
        ：id 
        props.match.params.id
    嵌套路由
        二级路由


    Redux
    
    1. 什么是Redux？
            props  一级一级传递
            state组件内部状态管理
            react 单项数据流
            数据状态非常复杂->很难让两个组件通信->解决：将所有的state集中在组件的的顶部->redux
            集中管理组件的状态，数据仓库
            redux：js状态容器，提供可预测化的状态管理
            react和redux是没有任何关系，redux就是一个独立的状态管理的库(mobx状态管理库)
            store ->state  tree->改变state的唯一方法store.dispatch触发一个action->reducer完成state更新
            组件可以派发dispatch action 行为   派发给store
            其他组件可以订阅store中的状态state来刷新自己的视图

            要点：应用中所有的state都以一个对象树的形式存储在单一的store中，唯一改变state的方式是派发action
            action：一个描述发生了什么的对象，动作，行为
            reducer：为了描述action如何改变state树

    2. Redux的好处
            props 单项数据流   一级一级
            Redux解决的问题
                多级传递数据的痛苦
                相邻组件的数据传递->parent顶层组件，connect函数  react和redux的链接
            redux可以将数据连接到任何组件
                connect函数 
    3. Redux的使用场景
        公共组件，业务组件非常多，用户使用方式比较复杂，项目庞大
        不同用户角色权限管理
        需要与服务器大量的交互，聊天，直播等应用
        view需要从多个来源获取数据
        react解决不了的，多交互，多数据源，使用redux
        注意：不要盲目引入redux，只会增加复杂度，评估
    4. Redux是如何工作的
        三大核心
            action：描述发生了什么的一个对象，动作，指令，type  {type: 'add'}  单独的模块，文件来存放action(项目规模变大)
            reducer：数据控制器，数据的修改者，action.type， 具体做什么，返回一个newState
            指定了应用状态(state)变化如何响应到action并发送到store
            注意：保持reducer纯净，纯函数，固定的输入一定有固定的输出
            副作用： ajax

            store：数据仓库
                getState()
                dispatch(action) 更新state
                redux 只有一个单一的store
                进行拆分数据处理逻辑->不应该拆分store，应该拆分reducer， ->combineReducers
    5. 使用的一般过程
        创建reducer
        创建action
        创建store
    6. Redux的三大原则
        1. 单一数据源
            store ->全局变量对象
        2. state是只读的
            唯一改变方法是触发action
            确保视图和api请求都不能直接修改state，只能表达想要修改的意图，action，在reducer中进行集中化的处理
        3. reducer使用纯函数进行修改
            为了描述action如何修改state


    react-redux 
        将组件分成两大类
        UI组件和容器组件
        ui组件：负责ui的呈现，无状态  
        容器组件：管理数据和逻辑
        容器在外，ui在内

        connect 用于从UI组件生成容器组件，将两种组件连接起来
        mapStateToProps： 输入逻辑，即将state映射到 UI 组件的参数（props）      建立一个state对象到props对象的映射关系
        mapDispatchToProps： 负责输出逻辑，即将用户对 UI 组件的操作映射成 Action。   用来建立Ui组件的参数到store.dispatch的映射

        Provider