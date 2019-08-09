import host from "config"
import update from "react-addons-update"

// actions
export const LIST_SUCCESS = "opendesign/topdesign/LIST_SUCCESS"
export const LIST_FAILURE = "opendesign/topdesign/LIST_FAILURE"
export const LIST_CLEAR = "opendesign/topdesign/LIST_CLEAR"

// action creators
export const GetTopDesignListSuccess = (data) => ({ type: LIST_SUCCESS, TopDesignList: data })
export const GetTopDesignListFailure = () => ({ type: LIST_FAILURE, TopDesignList: [], TopDesignListAdded: [] })
export const GetTopDesignListClear = (data) => ({ type: LIST_CLEAR, TopDesignList: data, TopDesignListAdded: [] })

// initial state
const initialState = {
    TopDesignList: {
        status: "INIT"
    },
    status: {
        TopDesignList: [],
        TopDesignListAdded: [],
    }
}

// reducer
export default function topdesign(state, action) {
    if (typeof state === "undefined")
        state = initialState

    switch (action.type) {
        case LIST_SUCCESS:
            return update(state, {
                TopDesignList: {
                    status: { $set: "SUCCESS" }
                },
                status: {
                    TopDesignList: { $set: action.TopDesignList },
                    TopDesignListAdded: { $push: action.TopDesignList }
                }
            })
        case LIST_FAILURE:
            return update(state, {
                TopDesignList: {
                    status: { $set: "FAILURE" }
                },
                status: {
                    TopDesignList: { $set: action.TopDesignList },
                    TopDesignListAdded: { $set: action.TopDesignList }
                }
            })
        case LIST_CLEAR:
            return update(state, {
                TopDesignList: {
                    status: { $set: "SUCCESS" }
                },
                status: {
                    TopDesignList: { $set: action.TopDesignList },
                    TopDesignListAdded: { $set: action.TopDesignList }
                }
            })
        default:
            return state
    }
}

// api actions
export function GetTopDesignListRequest(page) {
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
