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

export function DesignIssueComment(state, action) {
  if (typeof state === "undefined")
    state = initialState;

  switch (action.type) {
    case types.CREATE_ISSUE_COMMENT:
      return update(state, {
        CreateIssue: {
          status: { $set: "WATTING" }
        }
      });
    case types.CREATE_ISSUE_COMMENT_SUCCESS:
      return update(state, {
        CreateIssue: {
          status: { $set: "SUCCESS"}
        }
      });
    case types.CREATE_ISSUE_COMMENT_FAILURE:
      return update(state, {
        CreateIssue: {
          status: { $set: "FAILURE"}
        }
      });
    case types.DELETE_ISSUE_COMMENT:
      return update(state, {
        DeleteIssue: {
          status: { $set: "WATTING" }
        }
      });
    case types.DELETE_ISSUE_COMMENT_SUCCESS:
      return update(state, {
        DeleteIssue: {
          status: { $set: "SUCCESS"}
        }
      });
    case types.DELETE_ISSUE_COMMENT_FAILURE:
      return update(state, {
        DeleteIssue: {
          status: { $set: "FAILURE"}
        }
      });
    default:
      return state;
  }
};
