import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  DeleteDesign: {
    status: "INIT"
  }
};

export function DeleteDesign(state, action) {
  if (typeof state === "undefined")
    state = initialState;

  switch (action.type) {
    case types.DELETE_DESIGN:
      return update(state, {
        DeleteDesign: {
          status: { $set: "WATTING" }
        }
      });
    case types.DELETE_DESIGN_SUCCESS:
      return update(state, {
        DeleteDesign: {
          status: { $set: "SUCCESS"}
        }
      });
    case types.DELETE_DESIGN_FAILURE:
      return update(state, {
        DeleteDesign: {
          status: { $set: "FAILURE"}
        }
      });
    default:
      return state;
  }
};
