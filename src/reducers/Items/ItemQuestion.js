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
        Question: [], Total: 0, ReplyCount:0,
        PaymentMessage:[],msgTotal:0,
    },
    GetPaymentMessage: {
        status: "INIT"
    },
    PaymentMessage:{
        status:"INIT"
    },
    DeletePaymentMessage:{
        status:"INIT"
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
                    Total: { $set: action.payload.data.total } ,
                    ReplyCount: { $set: action.payload.data.replyCount }  
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
        case types.CREATE_PAYMENT_MESSAGE:
            return update(state, {
                PaymentMessage: {
                    status: { $set: "WATTING" }
                }
            });
        case types.CREATE_PAYMENT_MESSAGE_SUCCESS:
            return update(state, {
                PaymentMessage: {
                    status: { $set: "SUCCESS" }
                }
            });
        case types.CREATE_PAYMENT_MESSAGE_FAILURE:
            return update(state, {
                PaymentMessage: {
                    status: { $set: "FAILURE" }
                }
            });
        case types.DELETE_PAYMENT_MESSAGE:
            return update(state, {
                DeletePaymentMessage: {
                    status: { $set: "WATTING" }
                }
            });
        case types.DELETE_PAYMENT_MESSAGE_SUCCESS:
            return update(state, {
                DeletePaymentMessage: {
                    status: { $set: "SUCCESS" }
                }
            });
        case types.DELETE_PAYMENT_MESSAGE_FAILURE:
            return update(state, {
                DeletePaymentMessage: {
                    status: { $set: "FAILURE" }
                }
            });
        case types.GET_PAYMENT_MESSAGE:
            return update(state, {
                GetPaymentMessage: {
                    status: { $set: "WATTING" }
                }
            });
        case types.GET_PAYMENT_MESSAGE_SUCCESS:
            // console.log(action.payload);
            return update(state, {
                GetPaymentMessage: {
                    status: { $set: "SUCCESS" }
                },
                status: {
                    PaymentMessage: { $set: action.payload.data.purchaseMessageList },
                    msgTotal: { $set: action.payload.data.total }
                }
            });
        case types.GET_PAYMENT_MESSAGE_FAILURE:
            return update(state, {
                GetPaymentMessage: {
                    status: { $set: "FAILURE" }
                }
            });
        default:
            return state;
    }
};