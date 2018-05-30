import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  DesignDetailIssue: {
    status: "INIT"
  },
  status: {
    DesignDetailIssue: [],
    IssueDetail: []
  }
};

export function DesignDetailIssue(state, action) {
  if (typeof state === "undefined")
    state = initialState;

  switch (action.type) {
    case types.GET_DESIGN_DETAIL_ISSUE:
      return update(state, {
        status: {
          DesignDetailIssue: { $set: action.DesignDetailIssue }
        }
      });
    case types.GET_DESIGN_DETAIL_ISSUE_DETAIL:
      return update(state, {
        status: {
          IssueDetail: { $set: action.IssueDetail }
        }
      });
    default:
      return state;
  }
};
