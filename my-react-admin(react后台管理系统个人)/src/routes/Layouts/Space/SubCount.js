import React, { useContext } from 'react'

import { context, ContextProvider } from './ContextProvider'

//接收父组件的值
const { count, setCount, add, reduce } = useContext(context)

//创建子组件
function SubCount() {
    return (
        <div>
            <p>我是子组件</p>
            <button onClick={add}>加1</button>
            <button onClick={reduce}>减1</button>
        </div>
    )
}

export default (
    <ContextProvider>
        <SubCount />
    </ContextProvider>
)