import host from "config";
import { SetSession } from "modules/Sessions";

export function SecessionRequest(token) {
  return (dispatch) => {
    return fetch(`${host}/users/deleteUser`, { headers: { 'x-access-token': token, 'Content-Type': 'application/json' }, method: "POST" })
      .then(function (res) {
        return res.json();
      })
      .then(function (res) {
        SecessionSuccess(res)
      }).catch((error) => {
        SecessionFailure(error)
      })
  }
};

export function SecessionSuccess(res) {
  SetSession("market", null);
  window.location.href = "/";
  return {
    type: "SUCCESS",
    message: res.message
  }
};

export function SecessionFailure(err) {
  return {
    type: "FAILURE",
    message: err.message
  }
};
