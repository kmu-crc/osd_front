import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  GroupList: {
    status: "INIT"
  },
  status: {
    GroupList: [],
  }
};

export function GroupList(state, action) {
  if (typeof state === "undefined")
    state = initialState;

  switch (action.type) {
    case types.GET_GROUP_LIST:
      return update(state, {
        status: {
          GroupList: { $set: action.GroupList }
        }
      });
    default:
      return state;
  }
};
