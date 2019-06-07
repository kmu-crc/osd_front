import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  DesignIssueList: {
    status: "INIT"
  },
  status: {
    DesignIssueList: [],
    IssueDetail: []
  }
};

export function DesignIssueList(state, action) {
  if (typeof state === "undefined")
    state = initialState;

  switch (action.type) {
    case types.GET_DESIGN_ISSUE_LIST:
      return update(state, {
        status: {
          DesignIssueList: { $set: action.DesignIssueList }
        }
      });
    case types.GET_DESIGN_ISSUE_DETAIL:
      return update(state, {
        status: {
          IssueDetail: { $set: action.IssueDetail }
        }
      });
    default:
      return state;
  }
};
