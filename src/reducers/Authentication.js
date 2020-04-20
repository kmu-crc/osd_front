import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  login: {
    status: "INIT"
  },
  status: {
    isLoggedIn: false,
    admin_valid: false,
    admin_token: null
  },
  check: {
    status: "INIT"
  }
}

export default function Authentication(state, action) {
  if (typeof state === "undefined")
    state = initialState;

  switch (action.type) {
    case types.AUTH_CHECK_ADMIN_TOKEN:
      return update(state, {
        status: {
          isLoggedIn: { $set: true }
        }
      });
    case types.AUTH_CHECK_ADMIN_TOKEN_SUCCESS:
      return update(state, {
        status: {
          admin_valid: { $set: true },
          admin_token: { $set: action.token }
        }
      });
    case types.AUTH_CHECK_ADMIN_TOKEN_FAILURE:
      return update(state, {
        status: {
          isLoggedIn: { $set: false },
          admin_valid: { $set: false },
          admin_token: { $set: null }
        }
      });
    case types.AUTH_ADMIN_SIGNOUT:
      return update(state, {
        status: {
          isLoggedIn: { $set: false },
          admin_valid: { $set: false },
          admin_token: { $set: null }
        }
      });
    default:
      return state;
  }
}
