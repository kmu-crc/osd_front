import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  DesignDetailStepCard: {
    status: "INIT"
  },
  status: {
    DesignDetailStepCard: {},
  }
};

export function DesignDetailStepCard(state, action) {
  if (typeof state === "undefined")
    state = initialState;

  switch (action.type) {
    case types.GET_CARD_DETAIL:
      return update(state, {
        DesignDetailStepCard: {
          $set: "WATING"
        }
      })
    case types.GET_CARD_DETAIL_SUCCESS:
      return update(state, {
        DesignDetailStepCard: {
          $set: "SUCCESS"
        },
        status: {
          DesignDetailStepCard: { $set: action.detail }
        }
      })
    case types.GET_CARD_DETAIL_FAILURE:
      return update(state, {
        DesignDetailStepCard: {
          $set: "FAILURE"
        },
        status: {
          DesignDetailStepCard: { $set: {} }
        }
      })
    default:
      return state;
  }
};
