import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
    GetItemReview: {
        status: "INIT"
    },
    CreateItemReview: {
        status: "INIT"
    },
    DeleteItemReview: {
        status: "INIT"
    },
    status: {
        Review: [], 
        Total: 0, 
        TotalScore: 0
    }
};

export function ItemReview(state, action) {
    if (typeof state === "undefined") {
        state = initialState;
    }

    switch (action.type) {
        case types.GET_ITEM_REVIEW:
            return update(state, {
                CreateItemReview: {
                    status: { $set: "WATTING" }
                }
            });
        case types.GET_ITEM_REVIEW_SUCCESS:
            // console.log(action.payload);
            return update(state, {
                CreateItemReview: {
                    status: { $set: "SUCCESS" }
                },
                status: {
                    Review: { $set: action.payload.data.reviews },
                    Total: { $set: action.payload.data.total },
                    TotalScore: { $set: action.payload.data.score }
                }
            });
        case types.GET_ITEM_REVIEW_FAILURE:
            return update(state, {
                CreateItemReview: {
                    status: { $set: "FAILURE" }
                }
            });
        case types.CREATE_ITEM_REVIEW:
            return update(state, {
                CreateItemReview: {
                    status: { $set: "WATTING" }
                }
            });
        case types.CREATE_ITEM_REVIEW_SUCCESS:
            return update(state, {
                CreateItemReview: {
                    status: { $set: "SUCCESS" }
                }
            });
        case types.CREATE_ITEM_REVIEW_FAILURE:
            return update(state, {
                CreateItemReview: {
                    status: { $set: "FAILURE" }
                }
            });
        case types.DELETE_ITEM_REVIEW:
            return update(state, {
                DeleteItemReview: {
                    status: { $set: "WATTING" }
                }
            });
        case types.DELETE_CARD_COMMENT_SUCCESS:
            return update(state, {
                DeleteItemReview: {
                    status: { $set: "SUCCESS" }
                }
            });
        case types.DELETE_ITEM_REVIEW_FAILURE:
            return update(state, {
                DeleteItemReview: {
                    status: { $set: "FAILURE" }
                }
            });
        default:
            return state;
    }
};