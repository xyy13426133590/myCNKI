import { combineReducers } from 'redux'
import counter from './counterReducer'
import data from './dataReducer'
import userLogin from './loginReuducer'

export default combineReducers({
    counter,
    data,
    userLogin
})