import * as types from "../actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  login: {
    status: "INIT"
  },
  status: {
    valid: false,
    isLoggedIn: false,
    token: null,
    userInfo: null
  },
  error: {
    message: null
  },
  check: {
    status: "INIT"
  },
  checkStatus: {
    checkEmail: false
  }
};

export default function Authentication(state, action) {
  if (typeof state === "undefined")
    state = initialState;

  switch (action.type) {
    /* LOGIN */
    case types.AUTH_SIGNIN:
      return update(state, {
        login: {
          status: { $set: "WAITING" }
        }
      });
    case types.AUTH_SIGNIN_SUCCESS:
      return update(state, {
        login: {
          status: { $set: "SUCCESS" }
        },
        status: {
          isLoggedIn: { $set: true },
          token: { $set: action.token }
        }
      });
    case types.AUTH_SIGNIN_FAILURE:
      return update(state, {
        login: {
          status: { $set: "FAILURE" }
        }
      });
    case types.AUTH_SIGNIN_IS_NOT_MEMBER:
      return update(state, {
        login: {
          status: { $set: "NOTMEMBER" }
        }
      });
    case types.AUTH_SIGNIN_IS_NOT_PASSWORD:
      return update(state, {
        login: {
          status: { $set: "NOTMATCHINGPASSWORD" }
        }
      });
    case types.AUTH_FBSIGNUP:
      return update(state, {
        login: {
          status: { $set: "WAITING" }
        }
      });
    case types.AUTH_FBSIGNUP_SUCCESS:
      return update(state, {
        login: {
          status: { $set: "SUCCESS" }
        },
        status: {
          isLoggedIn: { $set: true },
          token: { $set: action.token }
        }
      });
    case types.AUTH_FBSIGNUP_FAILURE:
      return update(state, {
        login: {
          status: { $set: "FAILURE" }
        }
      });
    case types.AUTH_FBSIGNUP_OVERLAP_MEMBER:
      return update(state, {
        login: {
          status: { $set: "OVERLAP_MEMBER" }
        }
      });
    case types.AUTH_FBSIGNIN:
      return update(state, {
        login: {
          status: { $set: "WAITING" }
        }
      });
    case types.AUTH_FBSIGNIN_SUCCESS:
      return update(state, {
        login: {
          status: { $set: "SUCCESS" }
        },
        status: {
          isLoggedIn: { $set: true },
          token: { $set: action.token }
        }
      });
    case types.AUTH_FBSIGNIN_FAILURE:
      return update(state, {
        login: {
          status: { $set: "FAILURE" }
        }
      });
    case types.AUTH_FBSIGNIN_IS_NOT_MEMBER:
      return update(state, {
        login: {
          status: { $set: "NOTMEMBER" }
        }
      });
    case types.AUTH_CHECK_TOKEN:
      return update(state, {
        status: {
          isLoggedIn: { $set: true }
        }
      });
    case types.AUTH_CHECK_TOKEN_SUCCESS:
      return update(state, {
        status: {
          userInfo: { $set: action.info },
          token: { $set: action.token },
          valid: { $set: true }
        }
      });
    case types.AUTH_CHECK_TOKEN_FAILURE:
      return update(state, {
        status: {
          valid: { $set: false },
          isLoggedIn: { $set: false },
          userInfo: { $set: null },
          token: { $set: null }
        }
      });
    case types.AUTH_CHECK_EMAIL:
      return update(state, {
        check: {
          status: { $set: "WAITING" }
        }
      });
    case types.AUTH_CHECK_EMAIL_SUCCESS:
      return update(state, {
        check: {
          status: { $set: "SUCCESS" }
        },
        checkStatus: {
          checkEmail: { $set: action.checkEmail }
        }
      });
    case types.AUTH_CHECK_EMAIL_FAILURE:
      return update(state, {
        check: {
          status: { $set: "FAILURE" }
        },
        checkStatus: {
          checkEmail: { $set: action.checkEmail }
        }
      });
    case types.AUTH_SIGNOUT:
      return update(state, {
        status: {
          valid: { $set: false },
          isLoggedIn: { $set: false },
          token: { $set: null },
          userInfo: { $set: null }
        }
      });
    default:
      return state;
  }
}
