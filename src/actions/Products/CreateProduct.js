import * as types from "actions/ActionTypes";
import host from "config";

export const CreateDesignRequest = (data, token) => {
  return (dispatch) => {
    dispatch(CreateProduct());
    return fetch(`${host}/item/create`, {
      headers: { "x-access-token": token, "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => dispatch(CreateDesignSuccess(res)) && res)
      .catch(error => dispatch(CreateDesignFailure(error)))
  }
}

export const CreateProduct = () => {
  return {
    type: types.CREATE_PRODUCT
  }
}

export const CreateDesignSuccess = (res) => {
  return {
    type: types.CREATE_PRODUCT_SUCCESS,
    success: res.success,
    design_id: res.design_id
  }
}

export const CreateDesignFailure = (error) => {
  return {
    type: types.CREATE_PRODUCT_FAILURE,
    success: error.success,
  }
}
