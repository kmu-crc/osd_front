import host from "config"
import update from 'react-addons-update'
import { SetSession } from "modules/Sessions"

const AUTH_SIGNIN = "opendesign/authentication/AUTH_SIGNIN"
const AUTH_SIGNIN_SUCCESS = "opendesign/authentication/AUTH_SIGNIN_SUCCESS"
const AUTH_SIGNIN_FAILURE = "opendesign/authentication/AUTH_SIGNIN_FAILURE"
const AUTH_SIGNIN_IS_NOT_MEMBER = "opendesign/authentication/AUTH_SIGNIN_IS_NOT_MEMBER"
const AUTH_SIGNIN_IS_NOT_PASSWORD = "opendesign/authentication/AUTH_SIGNIN_IS_NOT_PASSWORD"
const AUTH_SIGNOUT = "opendesign/authentication/AUTH_SIGNOUT"
const AUTH_CHECK_TOKEN = "opendesign/authentication/AUTH_CHECK_TOKEN"
const AUTH_CHECK_TOKEN_SUCCESS = "opendesign/authentication/AUTH_CHECK_TOKEN_SUCCESS"
const AUTH_CHECK_TOKEN_FAILURE = "opendesign/authentication/AUTH_CHECK_TOKEN_FAILURE"
const AUTH_CHECK_EMAIL = "opendesign/authentication/AUTH_CHECK_EMAIL"
const AUTH_CHECK_EMAIL_SUCCESS = "opendesign/authentication/AUTH_CHECK_EMAIL_SUCCESS"
const AUTH_CHECK_EMAIL_FAILURE = "opendesign/authentication/AUTH_CHECK_EMAIL_FAILURE"
const AUTH_CHECK_NICKNAME = "opendesign/authentication/AUTH_CHECK_NICKNAME"
const AUTH_CHECK_NICKNAME_SUCCESS = "opendesign/authentication/AUTH_CHECK_NICKNAME_SUCCESS"
const AUTH_CHECK_NICKNAME_FAILURE = "opendesign/authentication/AUTH_CHECK_NICKNAME_FAILURE"

export function SignIn() {
  return { type: AUTH_SIGNIN }
}
export function SignInSuccess(token) {
  return {
    type: AUTH_SIGNIN_SUCCESS, token: token
  }
}
export function SignInFailure() {
  return {
    type: AUTH_SIGNIN_FAILURE, success: false
  }
}
export function SignInIsNotMember() {
  return {
    type: AUTH_SIGNIN_IS_NOT_MEMBER, success: false,
  }
}
export function SignInIsNotPassword() {
  return {
    type: AUTH_SIGNIN_IS_NOT_PASSWORD, success: false,
  }
}
export function CkeckToken() {
  return {
    type: AUTH_CHECK_TOKEN
  }
}
export function CkeckTokenSuccess(info, token) {
  return {
    type: AUTH_CHECK_TOKEN_SUCCESS,
    info,
    token
  }
}
export function CkeckTokenFailure() {
  return {
    type: AUTH_CHECK_TOKEN_FAILURE
  }
}
export function CheckEmail() {
  return {
    type: AUTH_CHECK_EMAIL
  }
}
export function CheckEmailSuccess() {
  return {
    type: AUTH_CHECK_EMAIL_SUCCESS,
    checkEmail: true
  }
}
export function CheckEmailFailure(err) {
  return {
    type: AUTH_CHECK_EMAIL_FAILURE,
    checkEmail: false,
    error: err
  }
}
export function CheckNickName() {
  return {
    type: AUTH_CHECK_NICKNAME
  }
}
export function CheckNickNameSuccess() {
  return {
    type: AUTH_CHECK_NICKNAME_SUCCESS,
    checkNickName: true
  }
}
export function CheckNickNameFailure(err) {
  return {
    type: AUTH_CHECK_NICKNAME_FAILURE,
    checkNickName: false,
    error: err
  }
}


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
}

export default function Authentication(state, action) {
  if (typeof state === "undefined")
    state = initialState;

  switch (action.type) {
    case AUTH_CHECK_TOKEN:
      return update(state, {
        status: {
          isLoggedIn: { $set: true }
        }
      });
    case AUTH_CHECK_TOKEN_SUCCESS:
      return update(state, {
        status: {
          userInfo: { $set: action.info },
          token: { $set: action.token },
          valid: { $set: true }
        }
      });
    case AUTH_CHECK_TOKEN_FAILURE:
      return update(state, {
        status: {
          valid: { $set: false },
          isLoggedIn: { $set: false },
          userInfo: { $set: null },
          token: { $set: null }
        }
      });
    case AUTH_CHECK_EMAIL:
      return update(state, {
        check: {
          status: { $set: "WAITING" }
        }
      });
    case AUTH_CHECK_EMAIL_SUCCESS:
      return update(state, {
        check: {
          status: { $set: "SUCCESS" }
        },
        checkStatus: {
          checkEmail: { $set: action.checkEmail }
        }
      });
    case AUTH_CHECK_EMAIL_FAILURE:
      return update(state, {
        check: {
          status: { $set: "FAILURE" }
        },
        checkStatus: {
          checkEmail: { $set: action.checkEmail }
        }
      });
    case AUTH_CHECK_NICKNAME:
      return update(state, {
        check: {
          status: { $set: "WAITING" }
        }
      });
    case AUTH_CHECK_NICKNAME_SUCCESS:
      return update(state, {
        check: {
          status: { $set: "SUCCESS" }
        },
        checkStatus: {
          checkNickNAme: { $set: action.checkNickNAme }
        }
      });
    case AUTH_CHECK_NICKNAME_FAILURE:
      return update(state, {
        check: {
          status: { $set: "FAILURE" }
        },
        checkStatus: {
          checkNickNAme: { $set: action.checkNickNAme }
        }
      });
    case AUTH_SIGNOUT:
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

// api 
export function SignInRequest(data) {
  return (dispatch) => {
    dispatch(SignIn())
    return fetch(`${host}/users/signIn`, { headers: { "Content-Type": "application/json" }, method: "POST", body: JSON.stringify(data) })
      .then(function (res) {
        console.log("res", res)
        return res.json()
      })
      .then(function (res) {
        if (res.isMember && res.isPassword) {
          SetSession("opendesign_token", res.token)
          return dispatch(SignInSuccess())
        } else {
          if (!res.isMember) {
            return dispatch(SignInIsNotMember())
          } else if (!res.isPassword) {
            return dispatch(SignInIsNotPassword())
          }
        }
      }).catch((error) => {
        return dispatch(SignInFailure())
      })
  }
}
export function CheckTokenRequest(token) {
  return (dispatch) => {
    dispatch(CkeckToken());
    return fetch(`${host}/users/check`, { headers: { 'x-access-token': token, 'Content-Type': 'application/json' } })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          return dispatch(CkeckTokenSuccess(res.info, token));
        } else {
          // SetSession("opendesign_token", null);
          return dispatch(CkeckTokenFailure());
        }
      })
      .catch(err => {
        // SetSession("opendesign_token", null);
        dispatch(CkeckTokenFailure());
      });
  };
}
export function CheckEmailRequest(email) {
  return (dispatch) => {
    dispatch(CheckEmail());
    return fetch(`${host}/users/checkEmail`, { headers: { 'Content-Type': 'application/json' }, method: "POST", body: JSON.stringify(email) })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          return dispatch(CheckEmailSuccess());
        } else {
          return dispatch(CheckEmailFailure(res.error));
        }
      })
      .catch(err => dispatch(CheckEmailFailure()));
  };
}
export function CheckNickNameRequest(NickName) {
  return (dispatch) => {
    dispatch(CheckNickName());
    return fetch(`${host}/users/checkNickName`, { headers: { 'Content-Type': 'application/json' }, method: "POST", body: JSON.stringify(NickName) })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          return dispatch(CheckNickNameSuccess());
        } else {
          return dispatch(CheckNickNameFailure(res.error));
        }
      })
      .catch(err => dispatch(CheckNickNameFailure()));
  };
}
