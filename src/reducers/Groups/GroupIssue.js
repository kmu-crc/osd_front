import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  CreateIssue: {
    status: "INIT"
  },
  DeleteIssue: {
    status: "INIT"
  }
};

export function GroupIssue(state, action) {
  if (typeof state === "undefined")
    state = initialState;

  switch (action.type) {
    case types.CREATE_GROUP_ISSUE:
      return update(state, {
        CreateIssue: {
          status: { $set: "WATTING" }
        }
      });
    case types.CREATE_GROUP_ISSUE_SUCCESS:
      return update(state, {
        CreateIssue: {
          status: { $set: "SUCCESS" }
        }
      });
    case types.CREATE_GROUP_ISSUE_FAILURE:
      return update(state, {
        CreateIssue: {
          status: { $set: "FAILURE" }
        }
      });
    case types.DELETE_GROUP_ISSUE:
      return update(state, {
        DeleteIssue: {
          status: { $set: "WATING"}
        }
      });
    case types.DELETE_GROUP_ISSUE_SUCCESS:
      return update(state, {
        DeleteIssue: {
          status: { $set: "SUCCESS"}
        }
      });
    case types.DELETE_GROUP_ISSUE_FAILURE:
      return update(state, {
        DeleteIssue: {
          status: { $set: "FAILURE"}
        }
      });
    default:
      return state;
  }
};
