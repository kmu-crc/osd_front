import * as types from "../actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  GroupDetail: {
    status: "INIT"
  },
  status: {
    GroupDetail: [],
  }
};

export default function GroupDetail(state, action) {
  if (typeof state === "undefined")
    state = initialState;

  switch (action.type) {
    case types.GET_GROUP_DETAIL:
      return update(state, {
        status: {
          GroupDetail: { $set: action.GroupDetail }
        }
      });
    default:
      return state;
  }
};