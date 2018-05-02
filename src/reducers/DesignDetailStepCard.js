import * as types from "../actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  DesignDetailStepCard: {
    status: "INIT"
  },
  status: {
    DesignDetailStepCard: [],
  }
};

export default function DesignDetailStepCard(state, action) {
  if (typeof state === "undefined")
    state = initialState;

  switch (action.type) {
    case types.GET_DESIGN_DETAIL_STEP_CARD:
      return update(state, {
        status: {
          DesignDetailStepCard: { $set: action.DesignDetailStepCard }
        }
      });
    default:
      return state;
  }
};
