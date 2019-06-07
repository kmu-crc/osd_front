import * as types from "../../actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  userInfo: {
    status: "INIT"
  }
};

export function UserInfo(state, action) {
  if (typeof state === "undefined")
    state = initialState;

  switch (action.type) {
    /////////////////////////
    // insert userDetail
    /////////////////////////
    case types.INSERT_USER_DETAIL:
      return update(state, {
        userInfo: {
          status: { $set: "WAITING" }
        }
      });
    case types.INSERT_USER_DETAIL_SUCCESS:
      return update(state, {
        userInfo: {
          status: { $set: "SUCCESS" }
        }
      });
    case types.INSERT_USER_DETAIL_FAILURE:
      return update(state, {
        userInfo: {
          status: { $set: "FAILURE" }
        }
      });
    default:
      return state;
  }
}
