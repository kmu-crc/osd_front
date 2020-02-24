import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    Payment: {
        status: "INIT"
    },
    MyPayment: {
        status: "INIT"
    },
    status: {
        Payment: [],
        MyPayment: [],
        MyPaymentAdded: [],
        MyTotal: 0,
        Total: 0,
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
            return update(state, {
                status: {
                    MyPayment: { $set: action.MyPayment },
                    MyPaymentAdded: { $push: action.MyPayment },
                    MyTotal: { $set: action.MyTotal }
                }
            });
        case types.GET_MY_PAYMENT_CLEAR:
            console.log(action);
            return update(state, {
                status: {
                    MyPayment: { $set: action.MyPayment },
                    MyPaymentAdded: { $set: action.MyPayment },
                    MyTotal: { $set: action.MyTotal }
                }
            });
        case types.GET_MY_PAYMENT_FAILURE:
            return update(state, {
                MyPayment: {
                    status: { $set: "FAILURE" }
                }
            });
        default:
            return state;
    }
};
