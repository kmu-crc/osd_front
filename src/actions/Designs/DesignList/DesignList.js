import * as types from "actions/ActionTypes"
import host from "config"

export function GetDesignListRequest(page = 0, sort = null, cate1, cate2, keyword = null) {
    console.log(`${host}, ${page}, ${sort}, ${cate1}, ${cate2}, ${keyword}`)
    console.log(`${host}/design/designList/${page}/${sort}/${cate1}/${cate2}/${keyword}`)
    return (dispatch) => {
        return fetch(`${host}/design/designList/${page}/${sort}/${cate1}/${cate2}/${keyword}`, {
            headers: { "Content-Type": "application/json" }, method: "get"
        }).then((response) => {
            return response.json()
        }).then((data) => {
            if (!data) {
                data = []
            }
            if (page === 0) {
                dispatch(GetDesignListClear(data))
            }
            dispatch(GetDesignListSuccess(data))
        }).catch((error) => {
            dispatch(GetDesignListFailure())
            console.log("err", error)
        })
    }
}

export function GetDesignListSuccess(data) {
    return {
        type: types.GET_DESIGN_LIST_SUCCESS,
        DesignList: data
    }
}

export function GetDesignListFailure() {
    return {
        type: types.GET_DESIGN_LIST_FAILURE,
        DesignList: [],
        DesignListAdded: []
    }
}

export function GetDesignListClear(data) {
    return {
        type: types.GET_DESIGN_LIST_CLEAR,
        DesignList: data,
        DesignListAdded: []
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
                console.log("no data")
                data = 0
            } else {
                console.log(data)
                data = data["count(*)"]
            }
            dispatch(GetDesignListCountSuccess(data))
        }).catch((error) => {
            dispatch(GetDesignListCountFailture())
            console.log("err", error);
        })
    }
}

export function GetDesignListCountSuccess(data) {
    return {
        type: types.GET_DESIGN_LIST_COUNT_SUCCESS, Count: data
    }
}

export function GetDesignListCountFailture() {
    return {
        type: types.GET_DESIGN_LIST_COUNT_FAILURE, Count: 0
    }
}