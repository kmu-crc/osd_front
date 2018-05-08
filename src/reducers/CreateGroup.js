import * as types from "../actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  CreateGroup: {
    status: "INIT"
  }
};

export default function CreateGroup(state, action) {
  if (typeof state === "undefined")
    state = initialState;

  switch (action.type) {
    case types.CREATE_NEW_GROUP:
      return update(state, {
        CreateGroup: {
          status: { $set: "Success" }
        }
      });
    case types.CREATE_GROUP_FAILURE:
      return update(state, {
        CreateGroup: {
          status: { $set: "Failure" }
        }
      });
    default:
      return state;
  }
};