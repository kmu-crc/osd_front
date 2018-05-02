import * as types from "../actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  DesignDetailStep: {
    status: "INIT"
  },
  status: {
    DesignDetailStep: [],
  }
};

export default function DesignDetailStep(state, action) {
  if (typeof state === "undefined")
    state = initialState;

  switch (action.type) {
    case types.GET_DESIGN_DETAIL_STEP:
      return update(state, {
        status: {
          DesignDetailStep: { $set: action.DesignDetailStep }
        }
      });
    default:
      return state;
  }
};
