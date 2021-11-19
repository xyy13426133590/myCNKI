import React, { useState, useEffect, useReducer } from 'react'
//import axios from 'axios'
import Nav from '../../../components/CustomBreadcrumb/index'
import { Fragment } from 'react'
const PaginationDemo = () => {
    const [data, setData] = useState({ hit: [] })
    const [query, setQuery] = useState('redux')
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios('https://hn.algolia.com/api/v1/search?query=redux',)
            setData(result.data)
        }
        fetchData()
        //这儿需要注意，不添加空数组，每次都会执行一遍，造成死循环
    }, [])

    return (
        <div>
            <Nav />
            <input
                type='text'
                value={query}
                onChange={event => setQuery(event.target.value)}
            />
            <ul>
                {
                    data.hit.map(item => (
                        <li key={objectID}>
                            <a href={item.url}>{item.title}</a>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default PaginationDemo;