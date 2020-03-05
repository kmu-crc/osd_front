import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    Payment: { status: "INIT" },
    MyPayment: { status: "INIT" },
    MyRequestItem: { status: "INIT" },

    status: {
        isPurchased: false,

        Payment: [],
        Total: 0,

        MyPayment: [],
        MyPaymentAdded: [],
        MyTotal: 0,

        MyRequestItem: [],
        MyRequestItemAdded: [],
        MyRequestItemTotal: 0,
    }
};

export function Payment(state, action) {
    if (typeof state === "undefined") {
        state = initialState;
    }
    switch (action.type) {
        case types.GET_ITEM_PAYMENT:
            return update(state, {
                Payment: {
                    status: { $set: "WATTING" }
                }
            });
        case types.GET_ITEM_PAYMENT_SUCCESS:
            console.log(action.payload);
            return update(state, {
                Payment: {
                    status: { $set: "SUCCESS" }
                },
                status: {
                    Payment: { $set: action.payload.data.payments },
                    Total: { $set: action.payload.data.total }
                }
            });
        case types.GET_ITEM_PAYMENT_FAILURE:
            return update(state, {
                Payment: {
                    status: { $set: "FAILURE" }
                }
            });

        case types.GET_MY_PAYMENT:
            console.log(action);
            return update(state, {
                status: {
                    MyPayment: { $set: action.MyPayment },
                    MyPaymentAdded: { $push: action.MyPayment },
                    MyTotal: { $set: action.MyTotal }
                }
            });
        case types.GET_MY_PAYMENT_CLEAR:
            return update(state, {
                status: {
                    MyPayment: { $set: action.MyPayment },
                    MyPaymentAdded: { $set: action.MyPayment },
                    MyTotal: { $set: action.MyTotal }
                }
            });
        case types.GET_MY_PAYMENT_FAILURE:
            return update(state, {
                status: {
                    MyPayment: { $set: action.MyPayment },
                    MyPaymentAdded: { $set: action.MyPayment }
                }
            });


        case types.GET_MY_REQUST_ITEM:
            console.log(action);
            return update(state, {
                status: {
                    MyRequestItem: { $set: action.MyRequestItem },
                    MyRequestItemAdded: { $push: action.MyRequestItem },
                    MyTotal: { $set: action.MyTotal }
                }
            });
        case types.GET_MY_REQUEST_ITEM_CLEAR:
            return update(state, {
                status: {
                    MyRequestItem: { $set: action.MyRequestItem },
                    MyRequestItemAdded: { $set: action.MyRequestItem },
                    MyTotal: { $set: action.MyTotal }
                }
            });
        case types.GET_MY_REQUEST_ITEM_FAILURE:
            return update(state, {
                status: {
                    MyRequestItem: { $set: action.MyRequestItem },
                    MyRequestItemAdded: { $set: action.MyRequestItem }
                }
            });

        case types.GET_THIS_ITEM_PURCHAED:
            return update(state, {
                status: {
                    isPurchased: { $set: action.isPurchased },
                }
            });
        case types.GET_THIS_ITEM_PURCHAED_FAILED:
            return update(state, {
                status: {
                    isPurchased: { $set: action.isPurchased },
                }
            });
        default:
            return state;
    }
};
