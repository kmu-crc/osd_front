import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  DesignDetail: {
    status: "INIT"
  },
  status: {
    DesignDetail: [],
    Count: { 
      like_count: 0, 
      member_count: 0, 
      card_count: 0, 
      view_count: 0 
    }
  }
};

export function DesignDetail(state, action) {
  if (typeof state === "undefined")
    state = initialState;

  switch (action.type) {
    case types.GET_DESIGN_DETAIL:
      return update(state, {
        status: {
          DesignDetail: { $set: action.DesignDetail }
        }
      });
    case types.DESIGN_DETAIL_RESET:
      return update(state, {
        status: {
          DesignDetail: { $set: action.DesignDetail }
        }
      });
    case types.GET_DESIGN_COUNT:
      return update(state, {
        status: {
          Count: { $set: action.Count }
        }
      });
    default:
      return state;
  }
};
