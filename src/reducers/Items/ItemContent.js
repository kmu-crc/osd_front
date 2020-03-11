import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
    ItemContent: { status: "INIT" },
    ItemContentEdit: { stauts: "INIT" },
    status: { content: [], }
};

export function ItemContent(state, action) {
    if (typeof state === "undefined") {
        state = initialState;
    }

    switch (action.type) {
        case types.GET_ITEM_CONTENT:
            return update(state, {
                status: {
                    content: { $set: action.content }
                }
            });

        case types.UPDATE_ITEM_SOURCE:
            return update(state, {
                ItemContentEdit: {
                    status: { $set: "WATTING" }
                }
            });
        case types.UPDATE_ITEM_SOURCE_SUCCESS:
            return update(state, {
                ItemContentEdit: {
                    status: { $set: "SUCCESS" }
                }
            });
        case types.UPDATE_ITEM_SOURCE_FAILURE:
            return update(state, {
                ItemContentEdit: {
                    status: { $set: "FAILURE" }
                }
            });
        default:
            return state;
    }
};