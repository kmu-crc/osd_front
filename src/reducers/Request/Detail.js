import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  Detail: { status: "INIT" },
  status: { Detail: [], }
};

export const RequestDetail = (state, action) => {
  if (typeof state === "undefined") {
    state = initialState;
  }
  switch (action.type) {
    case types.GET_REQUEST_DETAIL:
      return update(state, { status: { Detail: { $set: action.Detail } } });
    default:
      return state;
  }
};
