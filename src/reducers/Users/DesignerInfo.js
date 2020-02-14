import * as types from "../../actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
    designerInfo: {
    status: "INIT"
  }
};

export function DesignerInfo(state, action) {
  if (typeof state === "undefined")
    state = initialState;

  switch (action.type) {
    /////////////////////////
    // insert designer Detail
    /////////////////////////
    case types.INSERT_DESIGNER_DETAIL:
      return update(state, {
        designerInfo: {
          status: { $set: "WAITING" }
        }
      });
    case types.INSERT_DESIGNER_DETAIL_SUCCESS:
      return update(state, {
        designerInfo: {
          status: { $set: "SUCCESS" }
        }
      });
    case types.INSERT_DESIGNER_DETAIL_FAILURE:
      return update(state, {
        designerInfo: {
          status: { $set: "FAILURE" }
        }
      });
    default:
      return state;
  }
}
