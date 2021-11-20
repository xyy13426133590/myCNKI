export const FETCH_DATA_BEGIN = "FETCH_DATA_BEGIN";
export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_FAIL = "FETCH_DATA_FAIL";

//普通的action  用来处理请求加载过程中的loading方式
export const fetDataBegin = () =>({
    type: 'FETCH_DATA_BEGIN'
})

export const fetDataSuccess = (data) =>({
    type: 'FETCH_DATA_SUCCESS',
    payLoad: {data}
})
export const fetDataFail = (error) =>({
    type: 'FETCH_DATA_FAIL',
    payLoad: {error}
})


//fetch请求数据
//thunk   action
export const fetchData = () =>{
    return (dispatch,getState) =>{
        //请求前  loading : true
        dispatch(fetDataBegin())
        fetch('https://mock.yonyoucloud.com/mock/2320/api/userInfo')
        .then(res =>res.json())
        .then(res =>{
            //请求成功 loading false
            dispatch(fetDataSuccess())
            console.log("获取到的接口数据", res)
            return res
        }).catch(error =>{
            //请求失败  loading  false
            //捕获异常
            dispatch(fetDataFail())
            console.log(error)
        })
    }
}