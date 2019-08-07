import host from "config"
import update from 'react-addons-update'

// actions
const LIST_SUCCESS = "opendesign/grouplist/LIST_SUCCESS"
const LIST_FAILURE = "opendesign/grouplist/LIST_FAILURE"
const LIST_CLEAR = "opendesign/grouplist/LIST_CLEAR"
const LIST_COUNT_SUCCESS = "opendesign/grouplist/LIST_COUNT_SUCCESS"
const LIST_COUNT_FAILURE = "opendesign/grouplist/LIST_COUNT_FAILTURE"

// action creators
export const GetGroupListSuccess = (data) => ({ type: LIST_SUCCESS, GroupList: data })
export const GetGroupListFailure = () => ({ type: LIST_FAILURE, GroupList: [], GroupListAdded: [] })
export const GetGroupListClear = (data) => ({ type: LIST_CLEAR, GroupList: data, GroupListAdded: [] })
export const GetGroupListCountSuccess = (data) => ({ type: LIST_COUNT_SUCCESS, Count: data })
export const GetGroupListCountFailture = () => ({ type: LIST_COUNT_FAILURE, Count: 0 })

// initial state
const initialState = {
    GroupList: { status: 'INIT' },
    status: { GroupList: [], GroupListAdded: [], Count: 0 }
}

// reducer
export default function grouplist(state, action) {
    if (typeof state === "undefined")
        state = initialState;

    switch (action.type) {
        case LIST_SUCCESS:
            return update(state, {
                status: {
                    GroupList: { $set: action.GroupList },
                    GroupListAdded: { $push: action.GroupList }
                }
            })
        case LIST_FAILURE:
            return update(state, {
                status: {
                    GroupList: { $set: action.GroupList },
                    GroupListAdded: { $set: action.GroupList }
                }
            })
        case LIST_CLEAR:
            return update(state, {
                status: {
                    GroupList: { $set: action.GroupList },
                    GroupListAdded: { $set: action.GroupListAdded }
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
export function GetGroupListRequest(page = 0, sort = null, keyword = null) {
    return (dispatch) => {
        const url = `${host}/group/topGroupList/${page}/${sort}/${keyword}`
        console.log(url)
        return fetch(url, {
            headers: { "Content-Type": "application/json" }, method: "get"
        }).then((response) => {
            return response.json()
        }).then((data) => {
            console.log("group data >>", data)
            if (!data) {
                // console.log("no data")
                data = []
            }
            if (page === 0) {
                dispatch(GetGroupListClear(data))
                // return
            }
            dispatch(GetGroupListSuccess(data))
        }).catch((error) => {
            dispatch(GetGroupListFailure())
            console.log("err", error)
        })
    }
}
export function GetGroupListCountRequest(cate1 = null, cate2 = null) {
    return (dispatch) => {
        return fetch(`${host}/group/groupCount`, {
            headers: { "Content-Type": "application/json" }, method: "get"
        }).then((response) => {
            return response.json()
        }).then((data) => {
            if (!data) {
                data = 0
            } else {
                data = data["count(*)"]
            }
            dispatch(GetGroupListCountSuccess(data))
        }).catch((error) => {
            dispatch(GetGroupListCountFailture())
            console.log("err", error);
        })
    }
}
