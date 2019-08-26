import host from "config"
import update from 'react-addons-update'

// actions
const LIST_SUCCESS = "opendesign/designerlist/LIST_SUCCESS"
const LIST_FAILURE = "opendesign/designerlist/LIST_FAILURE"
const LIST_CLEAR = "opendesign/designerlist/LIST_CLEAR"
const LIST_COUNT_SUCCESS = "opendesign/designerlist/LIST_COUNT_SUCCESS"
const LIST_COUNT_FAILURE = "opendesign/designerlist/LIST_COUNT_FAILTURE"

// action creators
export const GetDesignerListSuccess = (data) => ({ type: LIST_SUCCESS, DesignerList: data })
export const GetDesignerListFailure = () => ({ type: LIST_FAILURE, DesignerList: [], DesignerListAdded: [] })
export const GetDesignerListClear = (data) => ({ type: LIST_CLEAR, DesignerList: data, DesignerListAdded: [] })
export const GetDesignerListCountSuccess = (data) => ({ type: LIST_COUNT_SUCCESS, Count: data })
export const GetDesignerListCountFailture = () => ({ type: LIST_COUNT_FAILURE, Count: 0 })

// initial state
const initialState = {
    DesignerList: { status: 'INIT' },
    status: { DesignerList: [], DesignerListAdded: [], Count: 0 }
}

// reducer
export function DesignerList(state, action) {
    if (typeof state === "undefined")
        state = initialState;

    switch (action.type) {
        case LIST_SUCCESS:
            return update(state, {
                status: {
                    DesignerList: { $set: action.DesignerList },
                    DesignerListAdded: { $push: action.DesignerList }
                }
            })
        case LIST_FAILURE:
            return update(state, {
                status: {
                    DesignerList: { $set: action.DesignerList },
                    DesignerListAdded: { $set: action.DesignerList }
                }
            })
        case LIST_CLEAR:
            return update(state, {
                status: {
                    DesignerList: { $set: action.DesignerList },
                    DesignerListAdded: { $set: action.DesignerListAdded }
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
export function GetDesignerListRequest(page = 0, sort = null, cate1, cate2, keyword = null) {
    // console.log(`${host}, ${page}, ${sort}, ${cate1}, ${cate2}, ${keyword}`)
    return (dispatch) => {
        return fetch(`${host}/Designer/DesignerList/${page}/${sort}/${cate1}/${cate2}/${keyword}`, {
            headers: { "Content-Type": "application/json" }, method: "get"
        }).then((response) => {
            return response.json()
        }).then((data) => {
            // console.log("Designer data >>", data)
            if (!data) {
                // console.log("no data")
                data = []
            }
            if (page === 0) {
                dispatch(GetDesignerListClear(data))
                // return
            }
            dispatch(GetDesignerListSuccess(data))
        }).catch((error) => {
            dispatch(GetDesignerListFailure())
            console.log("err", error)
        })
    }
}
export function GetDesignerListCountRequest(cate1 = null, cate2 = null) {
    return (dispatch) => {
        return fetch(`${host}/Designer/DesignerCount/${cate1}/${cate2}`, {
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
            dispatch(GetDesignerListCountSuccess(data))
        }).catch((error) => {
            dispatch(GetDesignerListCountFailture())
            console.log("err", error);
        })
    }
}
