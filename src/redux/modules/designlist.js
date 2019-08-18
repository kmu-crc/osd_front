import host from "config"
import update from 'react-addons-update'

// actions
const LIST_SUCCESS = "opendesign/designlist/LIST_SUCCESS"
const LIST_FAILURE = "opendesign/designlist/LIST_FAILURE"
const LIST_CLEAR = "opendesign/designlist/LIST_CLEAR"
const LIST_COUNT_SUCCESS = "opendesign/designlist/LIST_COUNT_SUCCESS"
const LIST_COUNT_FAILURE = "opendesign/designlist/LIST_COUNT_FAILTURE"

// action creators
export const GetDesignListSuccess = (data) => ({ type: LIST_SUCCESS, DesignList: data })
export const GetDesignListFailure = () => ({ type: LIST_FAILURE, DesignList: [], DesignListAdded: [] })
export const GetDesignListClear = (data) => ({ type: LIST_CLEAR, DesignList: data, DesignListAdded: [] })
export const GetDesignListCountSuccess = (data) => ({ type: LIST_COUNT_SUCCESS, Count: data })
export const GetDesignListCountFailture = () => ({ type: LIST_COUNT_FAILURE, Count: 0 })

// initial state
const initialState = {
    DesignList: { status: 'INIT' },
    status: { DesignList: [], DesignListAdded: [], Count: 0 }
}

// reducer
export default function designlist(state, action) {
    if (typeof state === "undefined")
        state = initialState;

    switch (action.type) {
        case LIST_SUCCESS:
            return update(state, {
                status: {
                    DesignList: { $set: action.DesignList },
                    DesignListAdded: { $push: action.DesignList }
                }
            })
        case LIST_FAILURE:
            return update(state, {
                status: {
                    DesignList: { $set: action.DesignList },
                    DesignListAdded: { $set: action.DesignList }
                }
            })
        case LIST_CLEAR:
            return update(state, {
                status: {
                    DesignList: { $set: action.DesignList },
                    DesignListAdded: { $set: action.DesignListAdded }
                }
            })
        case LIST_COUNT_SUCCESS:
            return update(state, {
                status: {
                    Count: { $set: action.Count }
                }
            })
        case LIST_COUNT_FAILURE:
            return update(state, {
                status: {
                    Count: { $set: action.Count }
                }
            })
        default:
            return state
    }
}

// api actions
export function GetDesignListRequest(page = 0, sort = null, cate1, cate2, keyword = null) {
    // console.log(`${host}, ${page}, ${sort}, ${cate1}, ${cate2}, ${keyword}`)
    return (dispatch) => {
        return fetch(`${host}/design/designList/${page}/${sort}/${cate1}/${cate2}/${keyword}`, {
            headers: { "Content-Type": "application/json" }, method: "get"
        }).then((response) => {
            return response.json()
        }).then((data) => {
            // console.log("design data >>", data)
            if (!data) {
                // console.log("no data")
                data = []
            }
            if (page === 0) {
                dispatch(GetDesignListClear(data))
                // return
            }
            dispatch(GetDesignListSuccess(data))
        }).catch((error) => {
            dispatch(GetDesignListFailure())
            console.log("err", error)
        })
    }
}
export function GetDesignListCountRequest(cate1 = null, cate2 = null) {
    return (dispatch) => {
        return fetch(`${host}/design/designCount/${cate1}/${cate2}`, {
            headers: { "Content-Type": "application/json" }, method: "get"
        }).then((response) => {
            return response.json()
        }).then((data) => {
            if (!data) {
                // console.log("no data")
                data = 0
            } else {
                // console.log(data)
                data = data["count(*)"]
            }
            dispatch(GetDesignListCountSuccess(data))
        }).catch((error) => {
            dispatch(GetDesignListCountFailture())
            console.log("err", error);
        })
    }
}
