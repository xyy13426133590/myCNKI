
import React, { useState, createContext } from 'react'
//创建顶层组件  实现向下传递值
export const context = createContext({})
export function ContextProvider({ children }) {
    let [count, setCount] = useState(10)
    const countVal = {
        count,
        setCount,
        add: () => setCount + 1,
        reduce: () => setCount - 1
    }

    return (
        //使用context自带的Provider包裹子组件，并且传值   children为子组件
        <context.Provider value={countVal}>{children}</context.Provider>
    )
}
