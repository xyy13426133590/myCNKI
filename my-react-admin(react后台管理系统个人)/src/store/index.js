import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk' //用来处理副作用，比如ajax
import rootReducer from './reducers/rootReducer'

//创建store   唯一的数据源
//第二个参数thunk，必须要使用applyMiddleware中间件包裹，否则不生效
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;