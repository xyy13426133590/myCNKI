import React, { useState, useEffect, useReducer, useRef, useMemo, useCallback } from 'react'
//import SubCount from './SubCount'
import Nav from '../../../components/CustomBreadcrumb/index'

//使用useReducer

//创建第一个参数  reducer
const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return {
                ...state,
                count: state.count + 1
            }
        case "REDUCE":
            return {
                ...state,
                count: state.count - 1
            }
    }
}

//创建第二个参数      createStore  默认值
const initialState = { count: 10, name: 'reducer' }

//创建第三个参数    ，将第二哥函数作为参数传入第三个参数中
const init = (initialState) => {
    return {
        count: initialState.count + 2
    }
}


const Space = () => {
    let number = 10;
    let [count, setCount] = useState(() => {
        return number * 2
    })

    //创建ref
    const inputRef = useRef(null)

    //使用useMemo, useCallback  实现缓存   两个都必须要传入第二个参数作为依赖项才会实现缓存
    //useMemo  返回值      useCallback返回函数
    const memory = useMemo(() => {
        return count;
    }, [number])
    const memory2 = useCallback(() => {
        return count;
    }, [number])

    console.log("记忆函数", memory, memory2())
    console.log("原始值", count)


    function changeNum() {
        setCount(() => {
            return ++number
        })
    }

    let [refresh, setRefresh] = useState(100)
    //可以写多个useEffect
    useEffect(() => {
        console.log("inputRef", inputRef)
        inputRef.current.focus()  //获取焦点
    }, [])
    useEffect(() => {
        //清除副作用函数

        //定时器
        setTimeout(() => {
            //注意：如果useEffect不传入第二个参数，则会无限循环
            //解决方法：传入第二个参数为空数组s
            count++;
            setCount(count)
        }, 1500)
        //第二个参数不参与props，state

        //清除定时器
        function clear() {
            //清除定时器操作
            console.log("我是清除函数")
        }
        return clear


    }, [refresh])
    function handleAdd() {
        count++;
        setCount(count)
    }

    //useReducer  接收三个参数
    const [state, disptch] = useReducer(reducer, initialState, init)
    return (
        <div>
            <Nav />
            我是Space组件
            <h2>state值---{count}</h2>
            <button onClick={handleAdd}>点击加1</button>
            <button onClick={() => { setRefresh(!refresh) }}>刷新</button>
            {/* <SubCount /> */}
            <p>---------------------useReducer--------------------</p>
            <p>{state.count}</p>
            <button onClick={() => disptch({ type: 'ADD' })}>点击加1</button>
            <p>---------------------useRef--------------------</p>
            <label htmlFor='name'></label>
            <input type='text' name='value' ref={inputRef} />
            <button onClick={changeNum}>缓存</button>
            <p>------------------------redux------------------------</p>


        </div>
    )
}

export default Space;