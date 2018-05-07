import * as types from "../../actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  signUp: {
    status: "INIT"
  },
  status: {
    success: false,
    massege: null
  }
};

export function SignUp(state, action) {
  if (typeof state === "undefined")
    state = initialState;
  /////////////////////////
  // sign up
  /////////////////////////
  switch (action.type) {
    case types.AUTH_SIGNUP:
      return update(state, {
        signUp: {
          status: { $set: "WAITING" }
        }
      });
    case types.AUTH_SIGNUP_SUCCESS:
      return update(state, {
        signUp: {
          status: { $set: "SUCCESS" }
        }
      });
    case types.AUTH_SIGNUP_FAILURE:
      return update(state, {
        signUp: {
          status: { $set: "FAILURE" }
        }
      });
    /////////////////////////
    // FBSign up
    /////////////////////////
    case types.AUTH_FBSIGNUP:
      return update(state, {
        signUp: {
          status: { $set: "WAITING" }
        }
      });
    case types.AUTH_FBSIGNUP_SUCCESS:
      return update(state, {
        signUp: {
          status: { $set: "SUCCESS" }
        }
      });
    case types.AUTH_FBSIGNUP_FAILURE:
      return update(state, {
        signUp: {
          status: { $set: "FAILURE" }
        }
      });
    case types.AUTH_FBSIGNUP_OVERLAP_MEMBER:
      return update(state, {
        signUp: {
          status: { $set: "OVERLAP_MEMBER" }
        }
      });
    default:
      return state;
  }
}
