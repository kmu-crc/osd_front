import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  Comment: { status: "INIT" },
  status: { Comment: [], }
};

export const RequestComment = (state, action) => {
  if (typeof state === "undefined") {
    state = initialState;
  }
  switch (action.type) {
    case types.GET_REQUEST_COMMENT:
      return update(state, { Comment: { $set: types.GET_REQUEST_COMMENT } });
    case types.GET_REQUEST_COMMENT_SUCCESS:
      return update(state, { Comment: { $set: types.GET_REQUEST_COMMENT_SUCCESS }, status: { Comment: { $set: action.Comment } } });
    case types.GET_REQUEST_COMMENT_FAILURE:
      return update(state, { Comment: { $set: types.GET_REQUEST_COMMENT_FAILURE }, status: { Comment: { $set: [] } } });
    default:
      return state;
  }
};
