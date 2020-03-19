import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    MyProjectItem: {
        status: "INIT"
    },
    status: {
        MyProjectItem: [],
        MyProjectItemAdded: [],
    }
};

export function MyProjectItem(state, action) {
    if (typeof state === "undefined") {
        state = initialState;
    }
    switch (action.type) {
        case types.GET_MY_PROJECT_ITEM:
            return update(state, {
                status: {
                    MyProjectItem: { $set: action.MyProjectItem },
                    MyProjectItemAdded: { $push: action.MyProjectItem },
                }
            });
        case types.GET_MY_PROJECT_ITEM_CLEAR:
            return update(state, {
                status: {
                    MyProjectItem: { $set: action.MyProjectItem },
                    MyProjectItemAdded: { $set: action.MyProjectItem },
                }
            });
        case types.GET_MY_PROJECT_ITEM_FAILURE:
            return update(state, {
                status: {
                    // MyProjectItem: { $set: action.MyProjectItem },
                    // MyProjectItemAdded: { $set: action.MyProjectItem },
                }
            });
        default:
            return state;
    }
};
