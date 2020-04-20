import * as types from "actions/ActionTypes";
import host from "config";

/*------- ADMIN ---------*/
export function CheckAdminTokenRequest(token) {
  console.log("check admin token")
  return (dispatch) => {
    dispatch(CkeckAdminToken())
    return fetch(`${host}/admins/check`, {
      headers: { 
        'x-access-token': token, 
        'Content-Type': 'application/json' },
      method: "POST"
       })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          return dispatch(CkeckAdminTokenSuccess(res.info, token))
        } else {
          return dispatch(CkeckAdminTokenFailure())
        }
      })
      .catch(err => {
        dispatch(CkeckAdminTokenFailure());
      })
  }
}

export function CkeckAdminToken() {
  return {
    type: types.AUTH_CHECK_ADMIN_TOKEN
  }
}

export function CkeckAdminTokenSuccess(info, token) {
  return {
    type: types.AUTH_CHECK_ADMIN_TOKEN_SUCCESS, 
    info, token
  }
}

export function CkeckAdminTokenFailure() {
  return {
    type: types.AUTH_CHECK_ADMIN_TOKEN_FAILURE
  }
}
