import * as types from "actions/ActionTypes";
import { SetSession } from "modules/Sessions";
import host from "config";

export function SignUpRequest(data) {
  return (dispatch) => {
    dispatch(SignUp());

    return fetch(`${host}/users/signUp`, { headers: { "Content-Type": "application/json" }, method: "POST", body: JSON.stringify(data) })
      .then(function (res) {
        return res.json();
      })
      .then(function (res) {
        if(res.success){
          SetSession("opendesign_token", res.token);
        }
        return dispatch(SignUpSuccess());
      }).catch((error) => {
        return dispatch(SignUpFailure());
      })
  }
};

export function SignUp() {
  return {
    type: types.AUTH_SIGNUP
  }
};

export function SignUpSuccess() {
  return {
    type: types.AUTH_SIGNUP_SUCCESS
  }
};

export function SignUpFailure() {
  return {
    type: types.AUTH_SIGNUP_FAILURE
  }
};

export function FBSignUpRequest(data) {
  return (dispatch) => {
    dispatch(FBSignUp());

    return fetch(`${host}/users/FBSignUp`, { headers: { "Content-Type": "application/json" }, method: "POST", body: JSON.stringify(data) })
      .then(function (res) {
        return res.json();
      })
      .then(function (res) {
        if (res.success) {
          SetSession("opendesign_token", res.token);
          return dispatch(FBSignUpSuccess());
        } else {
          return dispatch(FBSignUpOverlapMember())
        }
      }).catch((error) => {
        return dispatch(FBSignUpFailure());
      })
  }
};

export function FBSignUp() {
  return {
    type: types.AUTH_FBSIGNUP
  }
};

export function FBSignUpOverlapMember(err) {
  return {
    type: types.AUTH_FBSIGNUP_OVERLAP_MEMBER,
    success: false,
    message: err
  }
};

export function FBSignUpSuccess(token) {
  return {
    type: types.AUTH_FBSIGNUP_SUCCESS,
    token: token
  }
};

export function FBSignUpFailure() {
  return {
    type: types.AUTH_FBSIGNUP_FAILURE
  }
};
