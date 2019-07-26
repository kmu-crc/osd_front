import * as types from "actions/ActionTypes"
import update from "react-addons-update"

const initialState = {
    GroupList: { status: "INIT" },
    status: { GroupList: [], GroupListAdded: [], Count: 0 }
}

export function GroupList(state, action) {
    if (typeof state === "undefined")
        state = initialState;

    switch (action.type) {
        case types.GET_GROUP_LIST_SUCCESS:
            return update(state, {
                status: {
                    GroupList: { $set: action.GroupList },
                    GroupListAdded: { $push: action.GroupList }
                }
            })
        case types.GET_GROUP_LIST_FAILURE:
            return update(state, {
                status: {
                    GroupList: { $set: action.GroupList },
                    GroupListAdded: { $set: action.GroupList }
                }
            })
        case types.GET_GROUP_LIST_CLEAR:
            return update(state, {
                status: {
                    GroupList: { $set: action.GroupList },
                    GroupListAdded: { $set: action.GroupListAdded }
                }
            })
        case types.GET_GROUP_LIST_COUNT_SUCCESS:
            return update(state, {
                status: {
                    Count: { $set: action.Count }
                }
            })
        case types.GET_GROUP_LIST_COUNT_FAILURE:
            return update(state, {
                status: {
                    Count: { $set: action.Count }
                }
            })
        default:
            return state
    }
}