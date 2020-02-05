import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
    Point: { status: "INIT" },
    status: { Point: 0, History: [], HistoryCount: 0 }
};

export default function Point(state, action) {
    if (typeof state === "undefined") {
        state = initialState;
    }
    switch (action.type) {
        case types.GET_POINT:
            return update(state, { 
                Point: { status: { $set: types.GET_POINT } } });

        case types.GET_POINT_SUCCESS:
            return update(state, {
                Point: { status: { $set: types.GET_POINT_SUCCESS } },
                status: { Point: { $set: action.Point } }
            });

        case types.GET_POINT_FAILURE:
            return update(state, {
                Point: { status: { $set: types.GET_POINT_FAILURE } },
                status: { Point: { $set: 0 } }
            });

        case types.REQUEST_POINT_UP:
            return update(state, { 
                Point: { status: { $set: types.REQUEST_POINT_UP } } });

        case types.GET_POINT_HISTORY_REQUEST:
            return update(state, { 
                Point: { status: { $set: types.GET_POINT_HISTORY_REQUEST } }, });

        case types.GET_POINT_HISTORY_FAILURE:
            return update(state, {
                Point: { status: { $set: types.GET_POINT_HISTORY_FAILURE } },
                status: { History: { $set: [] }, 
                          HistoryCount: { $set: 0 } }
            });

        case types.GET_POINT_HISTORY_SUCCESS:
            return update(state, {
                Point: { status: { $set: types.GET_POINT_HISTORY_SUCCESS } },
                status: { History: { $set: action.History }, 
                          HistoryCount: { $set: action.HistoryCount } }
            });
            
        default:
            return state;
    }
};
