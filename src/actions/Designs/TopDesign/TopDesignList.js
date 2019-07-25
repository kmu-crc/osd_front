import * as types from "actions/ActionTypes"
import host from "config"

export function GetTopDesignListRequest(page) {
    console.log("GetTopDesignListRequest(" + page + ")")
    return (dispatch) => {
        return fetch(`${host}/design/TopDesignList/${page}`, {
            headers: { "Content-Type": "application/json" }, method: "get"
        }).then((response) => {
            return response.json()
        }).then((data) => {
            if (!data) {
                data = []
            }
            if (page === 0) {
                // console.log("data", data)
                dispatch(GetTopDesignListClear(data))
                return
            }
            dispatch(GetTopDesignListSuccess(data))
        }).catch((error) => {
            dispatch(GetTopDesignListFailure())
            console.log("err", error)
        })
    }
}

export function GetTopDesignListSuccess(data) {
    return {
        type: types.GET_TOP_DESIGN_LIST_SUCCESS,
        TopDesignList: data
    }
}

export function GetTopDesignListFailure() {
    return {
        type: types.GET_TOP_DESIGN_LIST_FAILURE,
        TopDesignList: [],
        TopDesignListAdded: []
    }
}

export function GetTopDesignListClear(data) {
    return {
        type: types.GET_TOP_DESIGN_LIST_CLEAR,
        TopDesignList: data,
        TopDesignListAdded: []
    }
}

