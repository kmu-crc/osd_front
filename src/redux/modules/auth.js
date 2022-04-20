import host from "config"
import update from 'react-addons-update'
import { SetSession } from "modules/Sessions"

// actions
const AUTH_SIGNIN = "opendesign/authentication/AUTH_SIGNIN"
const AUTH_SIGNIN_SUCCESS = "opendesign/authentication/AUTH_SIGNIN_SUCCESS"
const AUTH_SIGNIN_FAILURE = "opendesign/authentication/AUTH_SIGNIN_FAILURE"
const AUTH_SIGNIN_IS_NOT_MEMBER = "opendesign/authentication/AUTH_SIGNIN_IS_NOT_MEMBER"
const AUTH_SIGNIN_IS_NOT_PASSWORD = "opendesign/authentication/AUTH_SIGNIN_IS_NOT_PASSWORD"
const AUTH_SIGNOUT = "opendesign/authentication/AUTH_SIGNOUT"
const AUTH_CHECK_TOKEN = "opendesign/authentication/AUTH_CHECK_TOKEN"
const AUTH_CHECK_TOKEN_SUCCESS = "opendesign/authentication/AUTH_CHECK_TOKEN_SUCCESS"
const AUTH_CHECK_TOKEN_FAILURE = "AUTH_CHECK_TOKEN_FAILURE"
const AUTH_CHECK_EMAIL = "opendesign/authentication/AUTH_CHECK_EMAIL"
const AUTH_CHECK_EMAIL_SUCCESS = "opendesign/authentication/AUTH_CHECK_EMAIL_SUCCESS"
const AUTH_CHECK_EMAIL_FAILURE = "opendesign/authentication/AUTH_CHECK_EMAIL_FAILURE"
const AUTH_CHECK_NICKNAME = "opendesign/authentication/AUTH_CHECK_NICKNAME"
const AUTH_CHECK_NICKNAME_SUCCESS = "opendesign/authentication/AUTH_CHECK_NICKNAME_SUCCESS"
const AUTH_CHECK_NICKNAME_FAILURE = "opendesign/authentication/AUTH_CHECK_NICKNAME_FAILURE"
const SET_ACTIVE = "opendesign/authentication/SET_ACTIVE"

const GET_DEV_NOTICE = "GET_DEV_NOTICE";
const GET_DEV_NOTICE_SUCCESS = "GET_DEV_NOTICE_SUCCESS";
const GET_DEV_NOTICE_FAILURE = "GET_DEV_NOTICE_FAILURE";

// action creators
const SignIn = () => ({ type: AUTH_SIGNIN });
const SignOut = () => ({ type: AUTH_SIGNOUT });
const SignInSuccess = (token) => ({ type: AUTH_SIGNIN_SUCCESS, token: token });
const SignInFailure = () => ({ type: AUTH_SIGNIN_FAILURE, success: false });
const SignInIsNotMember = () => ({ type: AUTH_SIGNIN_IS_NOT_MEMBER, success: false, });
const SignInIsNotPassword = () => ({ type: AUTH_SIGNIN_IS_NOT_PASSWORD, success: false, });
const CkeckToken = () => ({ type: AUTH_CHECK_TOKEN });
const CkeckTokenSuccess = (info, token) => ({ type: AUTH_CHECK_TOKEN_SUCCESS, info, token });
const CkeckTokenFailure = () => ({ type: AUTH_CHECK_TOKEN_FAILURE });
const CheckEmail = () => ({ type: AUTH_CHECK_EMAIL });
const CheckEmailSuccess = () => ({ type: AUTH_CHECK_EMAIL_SUCCESS, checkEmail: true });
const CheckEmailFailure = (err) => ({ type: AUTH_CHECK_EMAIL_FAILURE, checkEmail: false, error: err });
const CheckNickName = () => ({ type: AUTH_CHECK_NICKNAME });
const CheckNickNameSuccess = () => ({ type: AUTH_CHECK_NICKNAME_SUCCESS, checkNickName: true });
const CheckNickNameFailure = (err) => ({ type: AUTH_CHECK_NICKNAME_FAILURE, checkNickName: false, error: err });
const GetDevNotice = () => ({ type: GET_DEV_NOTICE });
const GetDevNoticeSuccess = (data) => ({ type: GET_DEV_NOTICE_SUCCESS, data });
const GetDevNoticeFailure = (error) => ({ type: GET_DEV_NOTICE_FAILURE, error });
export const SetActive = (active) => ({ type: SET_ACTIVE, active })

// initial state
const initialState = {
  isActive: "INIT",
  login: { status: "INIT" },
  check: { status: "INIT" },
  status: { valid: false, isLoggedIn: false, token: null, userInfo: null },
  checkStatus: { checkEmail: false, checkNickNAme: false },
  devNotice: { status: "INIT", notice: [], },
}

// reducer
export default function Authentication(state, action) {
  if (typeof state === "undefined")
    state = initialState;

  switch (action.type) {
    case SET_ACTIVE:
      return update(state, {
        isActive: { $set: action.active }
      });
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
export function SignOutRequest() {
  return (dispatch) => {
    return dispatch(SignOut())
  }
}
export function SignInRequest(data) {
  console.log(`${host}/users/signIn`, data)
  return (dispatch) => {
    dispatch(SignIn())
    return fetch(`${host}/users/signIn`, { headers: { "Content-Type": "application/json" }, method: "POST", body: JSON.stringify(data) })
      .then(function (res) {
        return res.json()
      })
      .then(function (res) {
        //console.log("res", res)
        if (res.isMember && res.isPassword) {
          const { TokenName } = require("constant");
          SetSession(TokenName, res.token)
          //console.log("success", res)
          return dispatch(SignInSuccess(res.token))
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
      .then(res => res.success ? dispatch(CkeckTokenSuccess(res.info, token)) : dispatch(CkeckTokenFailure()))
      .catch(_ => dispatch(CkeckTokenFailure()));
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
export function ReadDevNoticeRequest(id, token) {
  return new Promise((resolve, reject) => {
    const url = `${host}/users/dev-notice/${id}`
    return fetch(url, {
      headers: { 'Content-Type': 'app;ocation/json', 'x-access-token': token },
      method: "PUT"
    }).then(res => res.json())
      .then(data => resolve(data && data.success))
      .catch(err => reject(err))
  });
};
export function GetDevNoticeRequest(token) {
  return (dispatch) => {
    dispatch(GetDevNotice());
    const url = `${host}/users/dev-notice`
    return fetch(url, {
      headers: { 'Content-Type': 'application/json', 'x-access-token': token },
      method: "GET",
    })
      .then(res => res.json())
      .then(res => res && res.success
        ? dispatch(GetDevNoticeSuccess(res.result))
        : dispatch(GetDevNoticeFailure(res.error)))
      .catch(err => dispatch(GetDevNoticeSuccess(err)));
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
