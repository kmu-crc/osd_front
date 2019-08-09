import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  DeleteGroup: {
    status: "INIT"
  }
};

export function DeleteGroup(state, action) {
  if (typeof state === "undefined")
    state = initialState;

  switch (action.type) {
    case types.DELETE_GROUP:
      return update(state, {
        DeleteGroup: {
          status: { $set: "WATTING" }
        }
      });
    case types.DELETE_GROUP_SUCCESS:
      return update(state, {
        DeleteGroup: {
          status: { $set: "SUCCESS"}
        }
      });
    case types.DELETE_GROUP_FAILURE:
      return update(state, {
        DeleteGroup: {
          status: { $set: "FAILURE"}
        }
      });
    default:
      return state;
  }
};
