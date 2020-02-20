import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
    GetItemQuestion: {
        status: "INIT"
    },
    CreateItemQuestion: {
        status: "INIT"
    },
    DeleteItemQuestion: {
        status: "INIT"
    },
    status: {
        Question: [], Total: 0
    }
};

export function ItemQuestion(state, action) {
    if (typeof state === "undefined") {
        state = initialState;
    }
    switch (action.type) {
        case types.GET_ITEM_QUESTION:
            return update(state, {
                CreateItemQuestion: {
                    status: { $set: "WATTING" }
                }
            });
        case types.GET_ITEM_QUESTION_SUCCESS:
            // console.log(action.payload);
            return update(state, {
                CreateItemQuestion: {
                    status: { $set: "SUCCESS" }
                },
                status: {
                    Question: { $set: action.payload.data.questions },
                    Total: { $set: action.payload.data.total }
                }
            });
        case types.GET_ITEM_QUESTION_FAILURE:
            return update(state, {
                CreateItemQuestion: {
                    status: { $set: "FAILURE" }
                }
            });
        case types.CREATE_ITEM_QUESTION:
            return update(state, {
                CreateItemQuestion: {
                    status: { $set: "WATTING" }
                }
            });
        case types.CREATE_ITEM_QUESTION_SUCCESS:
            return update(state, {
                CreateItemQuestion: {
                    status: { $set: "SUCCESS" }
                }
            });
        case types.CREATE_ITEM_QUESTION_FAILURE:
            return update(state, {
                CreateItemQuestion: {
                    status: { $set: "FAILURE" }
                }
            });
        case types.DELETE_ITEM_QUESTION:
            return update(state, {
                DeleteItemQuestion: {
                    status: { $set: "WATTING" }
                }
            });
        case types.DELETE_CARD_COMMENT_SUCCESS:
            return update(state, {
                DeleteItemQuestion: {
                    status: { $set: "SUCCESS" }
                }
            });
        case types.DELETE_ITEM_QUESTION_FAILURE:
            return update(state, {
                DeleteItemQuestion: {
                    status: { $set: "FAILURE" }
                }
            });
        default:
            return state;
    }
};