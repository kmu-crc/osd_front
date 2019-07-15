import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  CreateIssueComment: {
    status: "INIT"
  },
  DeleteIssueComment: {
    status: "INIT"
  }
};

export function DesignIssueComment(state, action) {
  if (typeof state === "undefined")
    state = initialState;

  switch (action.type) {
    case types.CREATE_ISSUE_COMMENT:
      return update(state, {
        CreateIssueComment: {
          status: { $set: "WATTING" }
        }
      });
    case types.CREATE_ISSUE_COMMENT_SUCCESS:
      return update(state, {
        CreateIssueComment: {
          status: { $set: "SUCCESS"}
        }
      });
    case types.CREATE_ISSUE_COMMENT_FAILURE:
      return update(state, {
        CreateIssueComment: {
          status: { $set: "FAILURE"}
        }
      });
    case types.DELETE_ISSUE_COMMENT:
      return update(state, {
        DeleteIssueComment: {
          status: { $set: "WATTING" }
        }
      });
    case types.DELETE_ISSUE_COMMENT_SUCCESS:
      return update(state, {
        DeleteIssueComment: {
          status: { $set: "SUCCESS"}
        }
      });
    case types.DELETE_ISSUE_COMMENT_FAILURE:
      return update(state, {
        DeleteIssueComment: {
          status: { $set: "FAILURE"}
        }
      });
    default:
      return state;
  }
};
