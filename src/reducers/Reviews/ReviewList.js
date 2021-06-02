import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
    List: { status: "INIT" },
    status: {
        Total: 0,
        List: [],
        ListAdded: [],
        success: null,
        MakerTotal: 0,
        MakerList: [],
        MakerListAdded: [],
        ItemReviewTotal:0,
        ItemReviewList:[],
        ItemReviewListAdded:[],
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
        case types.GET_MAKER_REVIEW:
            return update(state, {
                status: {
                    MakerList: { $set: action.List },
                    MakerListAdded: { $push: action.List }
                }
            });
        case types.GET_MAKER_REVIEW_CLEAR:
            return update(state, {
                status: {
                    MakerList: { $set: action.List },
                    MakerListAdded: { $set: action.List }
                }
            });
        case types.GET_MAKER_REVIEW_FAIL:
            return update(state, {
                status: {
                    MakerList: { $set: action.List },
                    MakerListAdded: { $set: action.ListAdded }
                }
            });
        case types.GET_TOTAL_COUNT_MAKER_REVIEW:
            return update(state, {
                status: {
                    MakerTotal: { $set: action.Total },
                }
            });
        case types.GET_TOTAL_COUNT_MAKER_REVIEW_FAIL:
            return update(state, {
                status: {
                    MakerTotal: { $set: action.Total },
                    success: { $set: action.error }
                }
            });

        case types.GET_ITEM_REVIEWLIST:
            return update(state, {
                status: {
                    ItemReviewList: { $set: action.List },
                    ItemReviewListAdded: { $push: action.List }
                }
            });
        case types.GET_ITEM_REVIEWLIST_CLEAR:
            return update(state, {
                status: {
                    ItemReviewList: { $set: action.List },
                    ItemReviewListAdded: { $set: action.List }
                }
            });
        case types.GET_ITEM_REVIEWLIST_FAIL:
            return update(state, {
                status: {
                    ItemReviewList: { $set: action.List },
                    ItemReviewListAdded: { $set: action.ListAdded }
                }
            });
        case types.GET_TOTAL_ITEM_REVIEW:
            return update(state, {
                status: {
                    ItemReviewTotal: { $set: action.Total },
                }
            });
        case types.GET_TOTAL_ITEM_REVIEW_FAIL:
            return update(state, {
                status: {
                    ItemReviewTotal: { $set: action.Total },
                    success: { $set: action.error }
                    }
            });
        default:
            return state;
    }
};
