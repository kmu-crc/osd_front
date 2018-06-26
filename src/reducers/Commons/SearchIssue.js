import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  Search: {
    status: "INIT"
  },
  status: {
    SearchIssue: []
  }
};

export function SearchIssue(state, action) {
  if (typeof state === "undefined")
    state = initialState;

  switch (action.type) {
    case types.GET_SEARCH_ISSUE:
      return update(state, {
        Search: {
          $set: "WAITING"
        }
      });
    case types.GET_SEARCH_ISSUE_SUCCESS:
      return update(state, {
        Search: {
          $set: "SUCCESS"
        },
        status: {
          SearchIssue: { $set: action.issue }
        }
      });
    case types.GET_SEARCH_ISSUE_FAILURE:
      return update(state, {
        Search: {
          $set: "FAILURE"
        },
        status: {
          SearchIssue: { $set: [] }
        }
      });
    default:
      return state;
  }
};
