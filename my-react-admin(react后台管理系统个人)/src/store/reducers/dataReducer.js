import { FETCH_DATA_BEGIN, FETCH_DATA_SUCCESS, FETCH_DATA_FAIL } from '../actions/dataAction'
//创建初始值
const initialState = {
    data: [],
    loading: false,
    error: null
}

//创建reducer
export default function dataReducer(state = initialState, action) {
    console.log("reducer", state, action)
    switch (action.type) {
        case FETCH_DATA_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            }
        case FETCH_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payLoad.data.list
            }
        case FETCH_DATA_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payLoad.error
            }

        default:
            return state
    }
}