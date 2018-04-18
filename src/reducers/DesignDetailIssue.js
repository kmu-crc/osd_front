import * as types from "../actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  DesignDetailIssue: {
    status: "INIT"
  },
  status: {
    DesignDetailIssue: [],
  }
};

export default function DesignDetailIssue(state, action) {
  if (typeof state === "undefined")
    state = initialState;

  switch (action.type) {
    case types.GET_DESIGN_DETAIL_ISSUE:
      return update(state, {
        status: {
          DesignDetailIssue: { $set: action.DesignDetailIssue }
        }
      });
    default:
      return state;
  }
};
