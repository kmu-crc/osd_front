import * as types from "actions/ActionTypes";
import { SetSession } from "modules/Sessions";
import host from "config";

export function AdminSignInRequest(data) {
  return (dispatch) => {
    dispatch(AdminSignIn());
    console.log("data",data);
    return fetch(`${host}/admins/adminSignIn`, 
    { 
      headers: { "Content-Type": "application/json" }, 
      method: "POST", body: JSON.stringify(data) 
    })
      .then(function (res) {
        console.log("res", res);
        return res.json();
      })
      .then(function (res) {
        if (res.isMember && res.isPassword) {
          SetSession(res.token);
          return dispatch(AdminSignInSuccess());
        } else {
          if (!res.isMember) {
            return dispatch(AdminSignInIsNotMember())
          } else if (!res.isPassword) {
            return dispatch(AdminSignInIsNotPassword())
          }
        };
      }).catch((error) => {
        return dispatch(AdminSignInFailure());
      })
  }
};

export function AdminSignIn() {
  return {
    type: types.AUTH_ADMIN_SIGNIN
  }
};

export function AdminSignInIsNotMember() {
  return {
    type: types.AUTH_ADMIN_SIGNIN_IS_NOT_MEMBER,
    success: false,
  }
};

export function AdminSignInIsNotPassword() {
  return {
    type: types.AUTH_ADMIN_SIGNIN_IS_NOT_PASSWORD,
    success: false,
  }
}

export function AdminSignInSuccess(token) {
  return {
    type: types.AUTH_ADMIN_SIGNIN_SUCCESS,
    admin_token: token
  }
};

export function AdminSignInFailure() {
  return {
    type: types.AUTH_ADMIN_SIGNIN_FAILURE,
    success: false
  }
};
