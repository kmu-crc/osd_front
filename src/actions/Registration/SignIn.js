import * as types from "actions/ActionTypes";
import { SetSession } from "modules/Sessions";

export function SignInRequest(data) {
  return (dispatch) => {
    dispatch(SignIn());

    return fetch("http://localhost:8080/users/signIn", { headers: { "Content-Type": "application/json" }, method: "POST", body: JSON.stringify(data) })
      .then(function (res) {
        console.log("res", res);
        return res.json();
      })
      .then(function (res) {
        if (res.isMember && res.isPassword) {
          SetSession("opendesign_token", res.token);
          return dispatch(SignInSuccess());
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

    return fetch("http://localhost:8080/users/FBSignIn", { headers: { "Content-Type": "application/json" }, method: "POST", body: JSON.stringify(data) })
      .then(function (res) {
        return res.json();
      })
      .then(function (res) {
        if (res.isMember) {
          SetSession("opendesign_token", res.token);
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
