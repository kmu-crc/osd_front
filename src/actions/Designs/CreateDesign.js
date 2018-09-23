import * as types from "actions/ActionTypes";
import host from "config";

export const CreateDesignRequest = (data, token) => {
  return (dispatch) => {
    dispatch(CreateDesign());

    return fetch(`${host}/design/createDesign`, { headers: { "x-access-token": token, "Content-Type": "application/json" }, method: "POST", body: JSON.stringify(data) })
      .then(function (res) {
        return res.json();
      })
      .then(function (res) {
        console.log("insert detail", res.desing_id);
        return dispatch(CreateDesignSuccess(res));
      }).catch((error) => {
        console.log("insert detail err", error);
        return dispatch(CreateDesignFailure(error));
      })
  }
}

export const CreateDesign = () => {
  return {
    type: types.CREATE_DESIGN
  }
}

export const CreateDesignSuccess = (res) => {
  return {
    type: types.CREATE_DESIGN_SUCCESS,
    success: res.success,
    design_id: res.design_id
  }
}

export const CreateDesignFailure = (error) => {
  return {
    type: types.CREATE_DESIGN_FAILURE,
    success: error.success,
  }
}
