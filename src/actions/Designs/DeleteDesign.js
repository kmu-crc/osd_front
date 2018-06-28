import * as types from "actions/ActionTypes";
import host from "config";

export const DeleteDesignRequest = (id, token) => {
  return (dispatch) => {
    dispatch(DeleteDesign());
    return fetch(`${host}/design/deleteDesign/${id}`, { 
      headers: { "x-access-token": token }, 
      method: "DELETE"
    }).then(res => {
        return res.json();
      }).then(res => {
        console.log("design deleted", res);
        return dispatch(DeleteDesignSuccess(res));
      }).catch((error) => {
        console.log(error);
        return dispatch(DeleteDesignFailure(error));
      });
  };
};

export const DeleteDesign = () => {
  return {
    type: types.DELETE_DESIGN
  };
};

export const DeleteDesignSuccess = (res) => {
  return {
    type: types.DELETE_DESIGN_SUCCESS,
    success: res.success
  };
};

export const DeleteDesignFailure = (error) => {
  return {
    type: types.DELETE_DESIGN_FAILURE,
    success: error.success,
  };
};
