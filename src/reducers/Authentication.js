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
  check: {
    status: "INIT"
  },
  checkStatus: {
    checkEmail: false,
    checkNickNAme: false
  }
};

export default function Authentication(state, action) {
  if (typeof state === "undefined")
    state = initialState;

  switch (action.type) {
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
      case types.AUTH_CHECK_NICKNAME:
      return update(state, {
        check: {
          status: { $set: "WAITING" }
        }
      });
    case types.AUTH_CHECK_NICKNAME_SUCCESS:
      return update(state, {
        check: {
          status: { $set: "SUCCESS" }
        },
        checkStatus: {
          checkNickNAme: { $set: action.checkNickNAme }
        }
      });
    case types.AUTH_CHECK_NICKNAME_FAILURE:
      return update(state, {
        check: {
          status: { $set: "FAILURE" }
        },
        checkStatus: {
          checkNickNAme: { $set: action.checkNickNAme }
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
