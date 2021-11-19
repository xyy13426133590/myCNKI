import React from 'react'
import Nav from '../../../components/CustomBreadcrumb/index'

class MenuDemo extends React.Component{
    constructor(){
        super()
        this.state = { //定义组件初始化状态
            list:['11','22','33','44','55'],
            arr:[],     //放入匹配后的内容
        }
    }

    //键盘回车添加数据
    add = (e)=>{
        if(e.keyCode === 13){
            this.setState({
                list: [...this.state.list,e.target.value]
            })
            e.target.value = ""
        }
    }
    //实现删除
    delete = (index)=>{
        this.setState({
            list:this.state.list.filter((item,i)=>{
                if(i === index) return false;
                return true
            })
        })
    }
    //修改
    update = index=>{
        let newValue = prompt("请输入修改的值：")
        console.log(newValue)
        if(newValue){
            //将需要修改的值赋值为newValue
            this.state.list[index] = newValue
            this.setState({
                list:this.state.list
            })
        }
    }
    //模糊查询
    blurFind = ()=>{
        let keyword = prompt("请输入查询关键字！")
        let result = this.state.list.filter((item,i)=>{
            if(item.includes(keyword)){
                return true
            }
            return false
        })
        //实现关键词高亮
        result.forEach((item,i,arr)=>{
            arr[i] = arr[i].replace(new RegExp(keyword,"g"),"<span style='color:red'>"+keyword+"</span>")
        })
        this.setState({
            arr:result,
            flag:false  //更改状态
        })
    }
    render(){
        let { list,arr,flag } = this.state
        return (
            <div>
                  <Nav />
                <input type="text" onKeyUp={this.add}/>
                <button onClick={this.blurFind}>模糊查询</button>
                <button onClick={this.backList}>返回列表</button>
                <ul style={{display:flag?'block':'none'}}>
                    {
                        list.map((item,index)=>{
                            return <li key={index}>
                                {item}
                                <button onClick={this.delete.bind(this,index)}>删除</button>
                                <button onClick={this.update.bind(this,index)}>修改</button>
                            </li>
                        })
                    }
                </ul>
                <ul>
                    {
                        arr.map((item,index)=>{  //一旦item是个字符串<span>我是span</span>
                            return <li key={index} dangerouslySetInnerHTML={{__html:item}}></li>
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default MenuDemo;