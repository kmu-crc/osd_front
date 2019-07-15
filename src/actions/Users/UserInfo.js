import * as types from "../ActionTypes";
import host from "config";

export function InsertUserDetailRequest(data, token) {
  return (dispatch) => {
    dispatch(InsertUserDetail());

    return fetch(`${host}/users/insertDetail`, { headers: { "x-access-token": token, "Content-Type": "application/json" }, method: "POST", body: JSON.stringify(data) })
      .then(function (res) {
        return res.json();
      })
      .then(function (res) {
        console.log("insert detail", res);
        return dispatch(InsertUserDetailSuccess(res));
      }).catch((error) => {
        console.log("insert detail err", error);
        return dispatch(InsertUserDetailFailure());
      })
  }
};

export function InsertUserDetail() {
    return {
      type: types.INSERT_USER_DETAIL
    }
  };

  export function InsertUserDetailSuccess(res) {
    return {
      type: types.INSERT_USER_DETAIL_SUCCESS,
      res
    }
  };

  export function InsertUserDetailFailure() {
    return {
      type: types.INSERT_USER_DETAIL_FAILURE
    }
  };

  export function UpdateUserDetailRequest(data, token) {
    return (dispatch) => {
      dispatch(UpdateUserDetail());
      return fetch(`${host}/users/modifyDetail`, { headers: { "x-access-token": token, "Content-Type": "application/json" }, method: "POST", body: JSON.stringify(data) }).then(function (res) {
          return res.json();
        }).then(function (res) {
          console.log("update detail", res);
          if (res.success === true) {
            return dispatch(UpdateUserDetailSuccess());
          }
          return dispatch(UpdateUserDetailFailure());
        }).catch((error) => {
          console.log("update detail err", error);
          return dispatch(UpdateUserDetailFailure());
        })
    }
  };

  export function UpdateUserDetail() {
      return {
        type: types.UPDATE_USER_DETAIL
      }
    };

    export function UpdateUserDetailSuccess() {
      return {
        type: types.UPDATE_USER_DETAIL_SUCCESS,
        success: true
      }
    };

    export function UpdateUserDetailFailure() {
      return {
        type: types.UPDATE_USER_DETAIL_FAILURE,
        success: false
      }
    };
