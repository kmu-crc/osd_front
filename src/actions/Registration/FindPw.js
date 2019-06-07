import * as types from "actions/ActionTypes";
import host from "config";

export function FindPwRequest(data) {
  return (dispatch) => {
    dispatch(FindPw());

    return fetch(`${host}/users/findPw`, { headers: { "Content-Type": "application/json" }, method: "POST", body: JSON.stringify(data) })
      .then(function (res) {
        return res.json();
      })
      .then(function (res) {
        dispatch(FindPwSuccess(res));
      }).catch((error) => {
        dispatch(FindPwFailure(error));
      })
  }
};

export function FindPw() {
  return {
    type: types.FIND_PW
  }
};

export function FindPwSuccess(res) {
  return {
    type: types.FIND_PW_SUCCESS,
    message: res.message
  }
};

export function FindPwFailure(err) {
  return {
    type: types.FIND_PW_FAILURE,
    message: err.message
  }
};
