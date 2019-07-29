import * as types from "actions/ActionTypes"
import host from "config"

export function GetGroupListRequest(page = 0, sort = null, keyword = null) {
    const url = `${host}/group/topGroupList/${page}/${sort}/${keyword}`
    // console.log("URL:", url)
    return (dispatch) => {
        return fetch(url, {
            headers: { 'Content-Type': 'application/json' }, method: "get"
        }).then(response => {
            return response.json()
        }).then(data => {
            if (!data) {
                data = []
            }
            if (page === 0) {
                dispatch(GetGroupListClear(data))
            }
            dispatch(GetGroupListSuccess(data))
        }).catch(error => {
            dispatch(GetGroupListFailure())
            console.log("error:", error)
        })
    }
}

export function GetGroupListSuccess(data) {
    return {
        type: types.GET_GROUP_LIST_SUCCESS, GroupList: data
    }
}

export function GetGroupListFailure() {
    return {
        type: types.GET_GROUP_LIST_FAILURE, GroupList: [], GroupListAdded: []
    }
}

export function GetGroupListClear(data) {
    return {
        type: types.GET_GROUP_LIST_CLEAR, GroupList: data, GroupListAdded: []
    }
}

export function GetGroupListCountRequest() {
    return (dispatch) => {
        return fetch(`${host}/group/groupCount`, {
            headers: { "Content-Type": "application/json" }, method: "get"
        }).then(response => {
            return response.json()
        }).then(data => {
            if (!data) {
                data = 0
            } else {
                data = data["count(*)"]
            }
            dispatch(GetGroupListCountSuccess(data))
        }).catch(error => {
            dispatch(GetGroupListCountFailture())
            console.log("error", error);
        })
    }
}

export function GetGroupListCountSuccess(data) {
    return {
        type: types.GET_GROUP_LIST_COUNT_SUCCESS, Count: data
    }
}

export function GetGroupListCountFailture() {
    return {
        type: types.GET_GROUP_LIST_COUNT_FAILURE, Count: 0
    }
}
