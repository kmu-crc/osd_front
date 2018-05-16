import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  signIn: {
    status: "INIT"
  },
  status: {
    success: false,
    massege: null
  }
};

export function SignIn(state, action) {
  if (typeof state === "undefined")
    state = initialState;

  switch (action.type) {
    /////////////////////////
    // sign in
    /////////////////////////
    case types.AUTH_SIGNIN:
      return update(state, {
        signIn: {
          status: { $set: "WAITING" }
        }
      });
    case types.AUTH_SIGNIN_SUCCESS:
      return update(state, {
        signIn: {
          status: { $set: "SUCCESS" }
        }
      });
    case types.AUTH_SIGNIN_FAILURE:
      return update(state, {
        signIn: {
          status: { $set: "FAILURE" }
        }
      });
    case types.AUTH_SIGNIN_IS_NOT_MEMBER:
      return update(state, {
        signIn: {
          status: { $set: "NOTMEMBER" }
        }
      });
    case types.AUTH_SIGNIN_IS_NOT_PASSWORD:
      return update(state, {
        signIn: {
          status: { $set: "NOTMATCHINGPASSWORD" }
        }
      });
    /////////////////////////
    // facebook sign in
    /////////////////////////
    case types.AUTH_FBSIGNIN:
      return update(state, {
        signIn: {
          status: { $set: "WAITING" }
        }
      });
    case types.AUTH_FBSIGNIN_SUCCESS:
      return update(state, {
        signIn: {
          status: { $set: "SUCCESS" }
        }
      });
    case types.AUTH_FBSIGNIN_FAILURE:
      return update(state, {
        signIn: {
          status: { $set: "FAILURE" }
        }
      });
    case types.AUTH_FBSIGNIN_IS_NOT_MEMBER:
      return update(state, {
        signIn: {
          status: { $set: "NOTMEMBER" }
        }
      });
    default:
      return state;
  }
}
