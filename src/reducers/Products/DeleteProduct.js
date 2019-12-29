import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  DeleteProduct: {
    status: "INIT"
  }
};

export function DeleteProduct(state, action) {
  if (typeof state === "undefined")
    state = initialState;

  switch (action.type) {
    case types.DELETE_PRODUCT:
      return update(state, {
        DeleteProduct: {
          status: { $set: "WATTING" }
        }
      });
    case types.DELETE_PRODUCT_SUCCESS:
      return update(state, {
        DeleteProduct: {
          status: { $set: "SUCCESS"}
        }
      });
    case types.DELETE_PRODUCT_FAILURE:
      return update(state, {
        DeleteProduct: {
          status: { $set: "FAILURE"}
        }
      });
    default:
      return state;
  }
};
