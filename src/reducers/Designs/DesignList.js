import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    DesignList: { status: 'INIT' },
    status: { DesignList: [], DesignListAdded: [], Count: 0 }
}

export function DesignList(state, action) {
    if (typeof state === "undefined")
        state = initialState;

    switch (action.type) {
        case types.GET_DESIGN_LIST_SUCCESS:
            return update(state, {
                status: {
                    DesignList: { $set: action.DesignList },
                    DesignListAdded: { $push: action.DesignList }
                }
            })
        case types.GET_DESIGN_LIST_FAILURE:
            return update(state, {
                status: {
                    DesignList: { $set: action.DesignList },
                    DesignListAdded: { $set: action.DesignList }
                }
            })
        case types.GET_DESIGN_LIST_CLEAR:
            return update(state, {
                status: {
                    DesignList: { $set: action.DesignList },
                    DesignListAdded: { $set: action.DesignListAdded }
                }
            })
        case types.GET_DESIGN_LIST_COUNT_SUCCESS:
            return update(state, {
                status: {
                    Count: { $set: action.Count }
                }
            })
        case types.GET_DESIGN_LIST_COUNT_FAILURE:
            return update(state, {
                status: {
                    Count: { $set: action.Count }
                }
            })
        default:
            return state
    }
}
