import { ADD, REDUCE } from '../actions/counterAction'
//创建初始值
const initialState = {
    count: 0,
}
//创建reducer
export default function counterReducer(state = initialState, action) {
    console.log("reducer", state, action)
    switch (action.type) {
        case ADD:
            return {
                count: state.count + 1
            }
        case REDUCE:
            return {
                count: state.count - 1
            }
        default:
            return state
    }
}
