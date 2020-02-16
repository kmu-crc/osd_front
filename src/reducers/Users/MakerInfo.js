import * as types from "../../actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
    makerInfo: {
    status: "INIT"
  }
};

export function MakerInfo(state, action) {
  if (typeof state === "undefined")
    state = initialState;

  switch (action.type) {
    /////////////////////////
    // insert designer Detail
    /////////////////////////
    case types.INSERT_MAKER_DETAIL:
      return update(state, {
        makerInfo: {
          status: { $set: "WAITING" }
        }
      });
    case types.INSERT_MAKER_DETAIL_SUCCESS:
      return update(state, {
        makerInfo: {
          status: { $set: "SUCCESS" }
        }
      });
    case types.INSERT_MAKER_DETAIL_FAILURE:
      return update(state, {
        makerInfo: {
          status: { $set: "FAILURE" }
        }
      });
    default:
      return state;
  }
}
