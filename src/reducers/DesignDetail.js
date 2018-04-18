import * as types from "../actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  DesignDetail: {
    status: "INIT"
  },
  status: {
    DesignDetail: [],
  }
};

export default function DesignDetail(state, action) {
  if (typeof state === "undefined")
    state = initialState;

  switch (action.type) {
    case types.GET_DESIGN_DETAIL:
      return update(state, {
        status: {
          DesignDetail: { $set: action.DesignDetail }
        }
      });
    default:
      return state;
  }
};
