import host from "config"
import update from 'react-addons-update'


const GET_DESIGN_LIST = "GET_DESIGN_LIST"
const DESIGN_LIST_FAIL = "DESIGN_LIST_FAIL"
const DESIGN_LIST_CLEAR = "DESIGN_LIST_CLEAR"
const GET_DESIGN_TOTAL_COUNT = "GET_DESIGN_TOTAL_COUNT"
const GET_DESIGN_TOTAL_COUNT_FAIL = "GET_DESIGN_TOTAL_COUNT_FAIL"
const GET_TOP_DESIGN_LIST_SUCCESS = "GET_TOP_DESIGN_LIST_SUCCESS"
const GET_TOP_DESIGN_LIST_FAILURE = "GET_TOP_DESIGN_LIST_FAILURE"
const GET_TOP_DESIGN_LIST_CLEAR = "GET_TOP_DESIGN_LIST_CLEAR"

const GetDesignList = (data) => ({ type: GET_DESIGN_LIST, DesignList: data })
const DesignListClear = (data) => ({ type: DESIGN_LIST_CLEAR, DesignList: [], DesignListAdded: data })
const DesignListFail = () => ({ type: DESIGN_LIST_FAIL, DesignList: [], DesignListAdded: [] })
const GetDesignTotalCount = (data) => ({ type: GET_DESIGN_TOTAL_COUNT, Count: data })
const DesignTotalCountFail = () => ({ type: GET_DESIGN_TOTAL_COUNT_FAIL, Count: 0 })
const GetTopDesignListSuccess = (data) => ({ type: GET_TOP_DESIGN_LIST_SUCCESS, TopList: data })
const GetTopDesignListFailure = () => ({ type: GET_TOP_DESIGN_LIST_FAILURE, TopList: [], TopListAdded: [] })
const GetTopDesignListClear = (data) => ({ type: GET_TOP_DESIGN_LIST_CLEAR, TopList: [], TopListAdded: data })


const initialState = {
    TopList: { status: "INIT" },
    DesignList: { status: 'INIT' },
    status: {
        TopList: [], TopListAdded: [],
        DesignList: [], DesignListAdded: [], Count: 0
    }
}


export function DesignList(state, action) {
    if (typeof state === "undefined")
        state = initialState

    switch (action.type) {
        case GET_TOP_DESIGN_LIST_SUCCESS:
            return update(state, {
                TopList: {
                    status: { $set: "SUCCESS" }
                },
                status: {
                    TopList: { $set: action.TopList },
                    TopListAdded: { $push: action.TopList }
                }
            })
        case GET_TOP_DESIGN_LIST_FAILURE:
            return update(state, {
                TopList: {
                    status: { $set: "FAILURE" }
                },
                status: {
                    TopList: { $set: action.TopList },
                    TopListAdded: { $set: action.TopList }
                }
            })
        case GET_TOP_DESIGN_LIST_CLEAR:
            return update(state, {
                TopList: {
                    status: { $set: "SUCCESS" }
                },
                status: {
                    TopList: { $set: action.TopList },
                    TopListAdded: { $set: action.TopList }
                }
            })
        case GET_DESIGN_LIST:
            return update(state, {
                DesignList: { status: { $set: action.type } },
                status: {
                    DesignList: { $set: action.DesignList },
                    DesignListAdded: { $push: action.DesignList }
                }
            })
        case DESIGN_LIST_CLEAR:
            return update(state, {
                DesignList: { status: { $set: action.type } },
                status: {
                    DesignList: { $set: action.DesignList },
                    DesignListAdded: { $set: action.DesignList }
                }
            })
        case DESIGN_LIST_FAIL:
            return update(state, {
                DesignList: { status: { $set: action.type } },
                status: {
                    DesignList: { $set: action.DesignList },
                    DesignListAdded: { $set: action.DesignListAdded }
                }
            })
        case GET_DESIGN_TOTAL_COUNT:
            return update(state, {
                status: {
                    Count: { $set: action.Count }
                }
            })
        case GET_DESIGN_TOTAL_COUNT_FAIL:
            return update(state, {
                status: {
                    Count: { $set: action.Count }
                }
            })
        default:
            return state
    }
}


export function GetTopDesignListRequest(page) {
    return (dispatch) => {
        return fetch(`${host}/design/TopDesignList/${page}`, {
            headers: { "Content-Type": "application/json" },
            method: "get"
        }).then((response) => {
            return response.json()
        }).then((data) => {
            // console.log("design data >>", data)

            if (!data) {
                //console.log("no data")
                data = []
            }
            if (page === 0) {
                dispatch(GetTopDesignListClear(data))
            }
            dispatch(GetTopDesignListSuccess(data))
        }).catch((error) => {
            console.error("err", error)
            dispatch(GetTopDesignListFailure())
        })
    }
}
export function GetDesignListRequest(page = 0, sort = null, cate1 = null, cate2 = null,cate3=null, keyword = null) {
    const url = `${host}/design/designList_newversion/${page}/${sort}/${cate1}/${cate2}/${cate3}/${keyword}`
    // console.log("url:", url);
    return (dispatch) => {
        return fetch(url, {
            headers: { "Content-Type": "application/json" }, method: "get"
        }).then((response) => {
            return response.json()
        }).then((data) => {
            // console.log(data);
            if (!data) data = []
            if (page === 0) {
                dispatch(DesignListClear(data));
            }
            dispatch(GetDesignList(data))
        }).catch((error) => {
            console.error("err", error)
            dispatch(DesignListFail())
        })
    }
}
// export function GetDesignListCountRequest(cate1, cate2) {
//     return (dispatch) => {
//         return fetch(`${host}/design/designCount/${cate1}/${cate2}`, {
//             headers: { "Content-Type": "application/json" },
//             method: "get"
//         }).then((response) => {
//             return response.json()
//         }).then((data) => {
//             if (!data) 
//             {
//                 data = 0

//             }    
//             else 
//             {
//                 data = data["count(*)"]
//             }
//             dispatch(GetDesignTotalCount(data))
//         }).catch((error) => {
//             dispatch(DesignTotalCountFail())
//             console.error("err", error);
//         })
//     }
// }
export function GetDesignListCountRequest(cate1, cate2, cate3) {
    return (dispatch) => {
        return fetch(`${host}/design/designCount_newversion/${cate1}/${cate2}/${cate3}`, {
            headers: { "Content-Type": "application/json" },
            method: "get"
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if (!data) {
                //console.log("no data");
                data = 0;
            } else {
                data = data["count(*)"];
            }
            dispatch(GetDesignTotalCount(data));
        }).catch((error) => {
            dispatch(DesignTotalCountFail());
            console.error("err", error);
        })
    }
};