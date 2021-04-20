import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
    ItemSteps: []
};

export function ItemSteps(state, action) {
    if (typeof state === "undefined") {
        state = initialState;
    }

    switch (action.type) {
        case types.CLEAR_ITEM_STEPS:
            return update(state, {
                ItemSteps: {
                    $set: []
                }
            });
        case types.GET_ITEM_STEP:
            return update(state, {
                ItemSteps: {
                    [action.index]:
                        { $set: action.step }
                }
            });
        default:
            return state;
    }
};
