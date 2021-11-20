import React, { Children } from 'react'
import Nav from '../../../components/CustomBreadcrumb/index'
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil'
const fontSizeState = atom({
    key: 'fontSizeState',
    default: 14
})

const fontSizeLableState = selector({
    key: 'fontSizeLableState',
    get: (({ get }) => {
        const fontSize = get(fontSizeState)
        const unit = 'px';
        return `${fontSize}${unit}`
    })
})

//父组件
function BreadcrumbDemo() {
    //创建ref   相当于id   不能在函数组件上使用，只能在函数组件内部使用
    const inputRef = React.createRef();

    const handleClick = () => {
        console.log("点击触发", inputRef.current)
        inputRef.current.focus();
    }

    function getChildData(data) {
        console.log("子组件传给父组件的值",data)

    }

    return (
        <RecoilRoot>
            <Nav />
            <p>我是Breadcrumb组件</p>
            <button onClick={handleClick}>点击</button>
            <input  type='text' ref={inputRef} />
            <p>------------------Recoil实现数据共享-----------------</p>
            <FontButton />
            <p>--------------------------------虚拟dom与非dom属性使用----------------------------</p>
            {/* 通过函数方式向父组件传值 */}
            <Footer   getChildData = {getChildData} />
            {/* dangerouslySetInnerHTML 相当于innerHTML */}
            <p dangerouslySetInnerHTML={{ __html: '<span>我是非dom属性使用</span>' }}></p>

        </RecoilRoot>
    )
}

//子组件
class Footer extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            count: 0
        }
        this.handleChange = this.handleChange.bind(this);
        console.log("1. constructor初始化")
    }

     handleChange() {
        this.setState({
            count: ++this.state.count
        })
        this.props.getChildData(this.state.count)
    }

    // componentWillMount(){
    //     console.log("2. componentWillMount生命周期执行")
    // }

    componentDidMount(){
        console.log("4. componentDidMount生命周期执行")
    }


    render() {
        console.log("3. render函数执行")
        return (
            <div>
                <p>我是footer组件</p>
                <button onClick={this.handleChange}>点击加1</button>
            </div>
        )
    }
}

function FontButton() {
    //从组件中读取和写入atom，使用useRecoilState钩子，类似于useState
    const [fontSize, setFontSize] = useRecoilState(fontSizeState)
    const fontSizeLabel = useRecoilValue(fontSizeLableState) //使用useRecoilValue钩子读读取selector中的值
    return (
        <>
            <p>current Value: {fontSizeLabel}</p>
            <ChildrenButton data={fontSizeLabel} />
            <button onClick={() => setFontSize((size) => size + 1)} style={{ fontSize }}>
                click me enLarge
        </button>
        </>
    )
}

function ChildrenButton(props) {
    console.log(props)
    return (
        <>
            <p>我是children组件的值：{props.data}</p>
        </>
    )
}


export default BreadcrumbDemo;