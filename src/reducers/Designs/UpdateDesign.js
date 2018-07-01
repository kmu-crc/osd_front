import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  UpdateDesignInfo: {
    status: "INIT"
  },
  UpdateDesignFile: {
    status: "INIT"
  }
};

export function UpdateDesign(state, action) {
  if (typeof state === "undefined")
    state = initialState;

  switch (action.type) {
    case types.UPDATE_DESIGN_INFO:
      return update(state, {
        UpdateDesignInfo: {
          status: { $set: "WATTING" }
        }
      });
    case types.UPDATE_DESIGN_INFO_SUCCESS:
      return update(state, {
        UpdateDesignInfo: {
          status: { $set: "SUCCESS"}
        }
      });
    case types.UPDATE_DESIGN_INFO_FAILURE:
      return update(state, {
        UpdateDesignInfo: {
          status: { $set: "FAILURE"}
        }
      });
    case types.UPDATE_DESIGN_FILE:
      return update(state, {
        UpdateDesignFile: {
          status: { $set: "WATTING" }
        }
      });
    case types.UPDATE_DESIGN_FILE_SUCCESS:
      return update(state, {
        UpdateDesignFile: {
          status: { $set: "SUCCESS"}
        }
      });
    case types.UPDATE_DESIGN_FILE_FAILURE:
      return update(state, {
        UpdateDesignFile: {
          status: { $set: "FAILURE"}
        }
      });
    default:
      return state;
  }
};
