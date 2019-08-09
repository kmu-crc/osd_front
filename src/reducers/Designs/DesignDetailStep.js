import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  DesignDetailStep: {
    status: "INIT"
  },
  status: {
    DesignDetailStep: [],
  }
};

export function DesignDetailStep(state, action) {
  if (typeof state === "undefined")
    state = initialState;

  switch (action.type) {
    case types.GET_BOARD:
      return update(state, {
        DesignDetailStep: {
          $set: "WATING"
        }
      })
    case types.GET_BOARD_SUCCESS:
      return update(state, {
        DesignDetailStep: {
          $set: "SUCCESS"
        },
        status: {
          DesignDetailStep: { $set: action.list }
        }
      })
    case types.GET_BOARD_FAILURE:
      return update(state, {
        DesignDetailStep: {
          $set: "FAILURE"
        },
        status: {
          DesignDetailStep: { $set: [] }
        }
      })
    default:
      return state;
  }
};
