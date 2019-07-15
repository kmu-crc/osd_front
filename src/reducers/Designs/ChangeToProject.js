import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  ChangeToProject: {
    status: "INIT"
  }
};

export function ChangeToProject(state, action) {
  if (typeof state === "undefined")
    state = initialState;

  switch (action.type) {
    case types.CHANGE_TO_PROJECT:
      return update(state, {
        ChangeToProject: {
          status: { $set: "WATING"}
        }
      });
    case types.CHANGE_TO_PROJECT_SUCCESS:
      return update(state, {
        ChangeToProject: {
          status: { $set: "SUCCESS"}
        }
      });
    case types.CHANGE_TO_PROJECT_FAILURE:
      return update(state, {
        ChangeToProject: {
          status: { $set: "FAILURE"}
        }
      });
    default:
      return state;
  }
};
