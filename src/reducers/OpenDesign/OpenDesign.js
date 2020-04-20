import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  isActive: "INIT"
};

export default function OpenDesign(state, action) {
  if (typeof state === "undefined")
    state = initialState;

  switch (action.type) {
    case types.SET_ACTIVE:
      return update(state, {
        isActive: { $set: action.active }
      });
    default:
      return state;
  }
};
