import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
    List: { status: "INIT" },
    status: {
        Total: 0,
        List: [],
        ListAdded: [],
        success: null
    }
};
export const ReviewList = (state, action) => {
    if (typeof state === "undefined") {
        state = initialState;
    }
    switch (action.type) {
        case types.GET_DESIGNER_REVIEW:
            return update(state, {
                status: {
                    List: { $set: action.List },
                    ListAdded: { $push: action.List }
                }
            });
        case types.GET_DESIGNER_REVIEW_CLEAR:
            return update(state, {
                status: {
                    List: { $set: action.List },
                    ListAdded: { $set: action.List }
                }
            });
        case types.GET_DESIGNER_REVIEW_FAIL:
            return update(state, {
                status: {
                    List: { $set: action.List },
                    ListAdded: { $set: action.ListAdded }
                }
            });
        case types.GET_TOTAL_COUNT_DESIGNER_REVIEW:
            return update(state, {
                status: {
                    Total: { $set: action.Total },
                }
            });
        case types.GET_TOTAL_COUNT_DESIGNER_REVIEW_FAIL:
            return update(state, {
                status: {
                    Total: { $set: action.Total },
                    success: { $set: action.error }
                }
            });

        default:
            return state;
    }
};
