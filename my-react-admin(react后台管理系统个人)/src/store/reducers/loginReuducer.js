import {USERNAME, PASSWORD} from '../actions/loginAction'

//创建初始值
const initialState = {
    username: '',
    password: ''
}

//创建reducer
export default function  loginReducer(state = initialState, action) {
    switch(action.type){
        case  USERNAME:
            return {
                username: state.username,
                ...state
            }
        case PASSWORD:
            return {
                password: state.password,
                ...state
            }
        default :
        return {
            ...state
        }
    }
}