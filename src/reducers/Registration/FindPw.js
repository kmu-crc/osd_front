import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  FindPw: {
    status: "INIT"
  },
  status: {
    message: ""
  }
};

export function FindPw(state, action) {
  if (typeof state === "undefined")
    state = initialState;

  switch (action.type) {
    case types.FIND_PW:
      return update(state, {
        FindPw: {
          status: { $set: "WAITING" }
        },
        status: {
          message: { $set: "" }
        }
      });
    case types.FIND_PW_SUCCESS:
      return update(state, {
        FindPw: {
          status: { $set: "SUCCESS" }
        },
        status: {
          message: { $set: action.message }
        }
      });
    case types.FIND_PW_FAILURE:
      return update(state, {
        signFindPwIn: {
          status: { $set: "FAILURE" }
        },
        status: {
          message: { $set: action.message }
        }
      });
    default:
      return state;
  }
}
