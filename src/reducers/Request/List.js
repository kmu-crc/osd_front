import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  List: { status: "INIT" },
  status: {
    List: [], Total: 0, success: null
  }
};

export const RequestList = (state, action) => {
  if (typeof state === "undefined") {
    state = initialState;
  }

  switch (action.type) {
    case types.GET_REQUEST_LIST:
      console.log(action);
      return update(state, { status: { List: { $set: action.payload.data.requests }, Total: { $set: action.payload.data.total } } });
    case types.GET_DESIGNER_REQUEST_LIST:
      console.log(action);
      return update(state, { status: { List: { $set: action.payload.data.requests }, Total: { $set: action.payload.data.total } } });
    case types.DESIGNER_REQUEST_LIST_FAIL:
      return update(state, { status: { List: { $set: action.List }, } });
    // case types.REQUEST_LIST_CLEAR:
    //   return update(state, { status: { List: { $set: action.List }, } });
    case types.REQUEST_LIST_FAIL:
      return update(state, { status: { List: { $set: action.List }, } });
    case types.GET_REQUEST_TOTAL_COUNT:
      return update(state, { status: { Count: { $set: action.Count } } });
    case types.GET_REQUEST_TOTAL_COUNT_FAIL:
      return update(state, { status: { Count: { $set: action.Count } } });

    default:
      return state;
  }
};
