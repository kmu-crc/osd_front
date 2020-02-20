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
        // case types.PRODUCT_DETAIL_RESET:
        //   return update(state, {
        //     status: {
        //       ProductDetail: { $set: action.ProductDetail }
        //     }
        //   });
        // case types.GET_PRODUCT_COUNT:
        //   return update(state, {
        //     status: {
        //       Count: { $set: action.Count }
        //     }
        //   });
        default:
            return state;
    }
};
