import * as types from "actions/ActionTypes";
import host from "config";

export const DeleteProductRequest = (id, token) => {
  return (dispatch) => {
    dispatch(DeleteProduct());
    const sql = `${host}/product/delete/${id}`;
    return fetch(sql, { headers: { "x-access-token": token }, method: "DELETE" })
      .then(res => res.json())
      .then(res => dispatch(DeleteProductSuccess(res)))
      .catch(error => dispatch(DeleteProductFailure(error)));
  };
};
const DeleteProduct = () => { return { type: types.DELETE_PRODUCT } };
const DeleteProductSuccess = res => { return { type: types.DELETE_PRODUCT_SUCCESS, success: res.success } };
const DeleteProductFailure = (error) => { return { type: types.DELETE_PRODUCT_FAILURE, success: error.success, } };
