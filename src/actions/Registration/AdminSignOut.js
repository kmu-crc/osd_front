import * as types from "actions/ActionTypes";

export function AdminSignOutRequest() {
  return (dispatch) => {
    return dispatch(AdminSignOut());
  };
};

export function AdminSignOut() {
  return {
    type: types.AUTH_ADMIN_SIGNOUT
  }
};
