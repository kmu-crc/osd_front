import * as types from "../ActionTypes";

export function InsertUserDetailRequest(data, token) {
  return (dispatch) => {
    dispatch(InsertUserDetail());

    return fetch("http://localhost:8080/users/insertDetail", { headers: { "x-access-token": token }, method: "POST", body: data })
      .then(function (res) {
        return res.json();
      })
      .then(function (res) {
        console.log("insert detail", res);
        return dispatch(InsertUserDetailSuccess());
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

  export function InsertUserDetailSuccess() {
    return {
      type: types.INSERT_USER_DETAIL_SUCCESS
    }
  };

  export function InsertUserDetailFailure() {
    return {
      type: types.INSERT_USER_DETAIL_FAILURE
    }
  };
