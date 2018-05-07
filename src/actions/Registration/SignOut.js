import * as types from "../ActionTypes";

export function SignOutRequest() {
  return (dispatch) => {
    return dispatch(SignOut());
  };
};

export function SignOut() {
  return {
    type: types.AUTH_SIGNOUT
  }
};
