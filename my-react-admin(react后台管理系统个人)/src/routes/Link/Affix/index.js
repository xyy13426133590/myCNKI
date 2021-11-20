import React from 'react'
import { connect } from 'react-redux'
import { add, reduce } from '../../../store/actions/counterAction'
import { fetchData } from '../../../store/actions/dataAction'
import Nav from '../../../components/CustomBreadcrumb/index'


//用来映射state值到props值
function mapStateToProps(state) {
    console.log(state)
    return {
        count: state.counter.count,
        data: state.data.data,
        loading: false,
        error: null
    }
}

//将dispatch映射到props上
const mapDispatchToProps = {
    add,
    reduce,
    fetchData
}

class AffixDemo extends React.Component {

    //此处用来接收Space/index父组件传过来的store
    handleAdd = () => {
        //此处优化，直接this.props.add()
        this.props.add()
    }

    handleReduce = () => {
        this.props.reduce()
    }

    componentDidMount(){
        this.props.fetchData();
        // this.props.fetchData().then(res=>{
        //     console.log("componentDidMount生命周期", res)
        // })
    }

    render() {
        let {data,loading, error} = this.props;
        if(error){
            return <div>请求出错 {error}</div>
        }
        if(loading){
            return <div>正在加载中...</div>
        }
        return (
            <div>
                <Nav />
                <h1>我是Affix组件</h1>
                <br />

                <h2>我是reduceCounter子组件</h2>
                <ul>
                    {data.map(item=>(<li key={item}>{item}</li>))}
                </ul>
                <button onClick={this.handleAdd}>加一</button>
                <span>{this.props.count}</span>
                <button onClick={this.handleReduce}>减一</button>
            </div>
        )
    }

}

//mapStateToProps 用来映射state值到props值
//connect 高阶组件 用来连接store的state到组件
//将mapDispatchToProps作为第二个参数传入
export default connect(mapStateToProps, mapDispatchToProps)(AffixDemo);