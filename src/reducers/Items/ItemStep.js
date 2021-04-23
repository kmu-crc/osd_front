import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
    ItemStep: { status: "INIT" },
    status: { ItemStep: [], }
};

export function ItemStep(state, action) {
    if (typeof state === "undefined") {
        state = initialState;
    }

    switch (action.type) {
        case types.GET_ITEM_STEP:
            return update(state, {
                status: {
                    ItemStep: { $set: action.step }
                }
            });
        default:
            return state;
    }
};
