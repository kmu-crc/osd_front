import * as types from "actions/ActionTypes";
import { SetSession } from "modules/Sessions";
import host from "config";

export function SignInRequest(data) {
  return (dispatch) => {
    dispatch(SignIn());
    return fetch(`${host}/users/signIn`, { headers: { "Content-Type": "application/json" }, method: "POST", body: JSON.stringify(data) })
      .then(function (res) {
        console.log("res", res);
        return res.json();
      })
      .then(function (res) {
        console.log(res);
        if (res.isMember && res.isPassword) {
          console.log(res);
          SetSession("market", res.token);
          return dispatch(SignInSuccess(res.token));
        } else {
          if (!res.isMember) {
            return dispatch(SignInIsNotMember())
          } else if (!res.isPassword) {
            return dispatch(SignInIsNotPassword())
          }
        };
      }).catch((error) => {
        return dispatch(SignInFailure());
      })
  }
};

export function SignIn() {
  return {
    type: types.AUTH_SIGNIN
  }
};

export function SignInIsNotMember() {
  return {
    type: types.AUTH_SIGNIN_IS_NOT_MEMBER,
    success: false,
  }
};

export function SignInIsNotPassword() {
  return {
    type: types.AUTH_SIGNIN_IS_NOT_PASSWORD,
    success: false,
  }
}

export function SignInSuccess(token) {
  return {
    type: types.AUTH_SIGNIN_SUCCESS,
    success: true,
    token: token
  }
};

export function SignInFailure() {
  return {
    type: types.AUTH_SIGNIN_FAILURE,
    success: false
  }
};


export function FBSignInRequest(data) {
  return (dispatch) => {
    dispatch(FBSignIn());

    return fetch(`${host}/users/FBSignIn`, { headers: { "Content-Type": "application/json" }, method: "POST", body: JSON.stringify(data) })
      .then(function (res) {
        return res.json();
      })
      .then(function (res) {
        if (res.isMember) {
          SetSession("market", res.token);
          return dispatch(FBSignInSuccess());
        } else {
          return dispatch(FBSignInIsNotMember())
        }
      }).catch((error) => {
        return dispatch(FBSignInFailure());
      })
  }
};

export function FBSignIn() {
  return {
    type: types.AUTH_FBSIGNIN
  }
};

export function FBSignInIsNotMember() {
  return {
    type: types.AUTH_FBSIGNIN_IS_NOT_MEMBER,
    success: false,
  }
};

export function FBSignInSuccess(token) {
  return {
    type: types.AUTH_FBSIGNIN_SUCCESS,
    token: token
  }
};

export function FBSignInFailure() {
  return {
    type: types.AUTH_FBSIGNIN_FAILURE
  }
};
