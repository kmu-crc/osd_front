import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    Payment: {
        status: "INIT"
    },
    status: {
        Payment: [],
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
        default:
            return state;
    }
};
