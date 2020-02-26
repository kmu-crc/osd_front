import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    UploadItem: {
        status: "INIT"
    },
    MyUploadItem: {
        status: "INIT"
    },
    status: {
        UploadItem: [],
        MyUploadItem: [],
        MyUploadItemAdded: [],
        MyTotal: 0,
        Total: 0,
    }
};

export function UploadItem(state, action) {
    if (typeof state === "undefined") {
        state = initialState;
    }
    switch (action.type) {
        case types.GET_MY_UPLOAD_ITEM_CLEAR:
            return update(state, {
                status: {
                    MyUploadItem: { $set: action.MyUploadItem },
                    MyUploadItemAdded: { $push: action.MyUploadItem },
                    MyTotal: { $set: action.MyTotal }
                }
            });
        case types.GET_MY_UPLOAD_ITEM_CLEAR:
            console.log(action);
            return update(state, {
                status: {
                    MyUploadItem: { $set: action.MyUploadItem },
                    MyUploadItemAdded: { $set: action.MyUploadItem },
                    MyTotal: { $set: action.MyTotal }
                }
            });
        case types.GET_MY_UPLOAD_ITEM_FAILURE:
            return update(state, {
                MyUploadItem: {
                    status: { $set: "FAILURE" }
                }
            });
        default:
            return state;
    }
};
