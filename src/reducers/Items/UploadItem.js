import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    MyUploadItem: {
        status: "INIT"
    },
    status: {
        MyUploadItem: [],
        MyUploadItemAdded: [],
    }
};

export function UploadItem(state, action) {
    if (typeof state === "undefined") {
        state = initialState;
    }
    switch (action.type) {
        case types.GET_MY_UPLOAD_ITEM:
            return update(state, {
                status: {
                    MyUploadItem: { $set: action.MyUploadItem },
                    MyUploadItemAdded: { $push: action.MyUploadItem },
                }
            });
        case types.GET_MY_UPLOAD_ITEM_CLEAR:
            return update(state, {
                status: {
                    MyUploadItem: { $set: action.MyUploadItem },
                    MyUploadItemAdded: { $set: action.MyUploadItem },
                }
            });
        case types.GET_MY_UPLOAD_ITEM_FAILURE:
            return update(state, {
                status: {
                    // MyUploadItem: { $set: action.MyUploadItem },
                    // MyUploadItemAdded: { $set: action.MyUploadItem },
                }
            });
        default:
            return state;
    }
};
