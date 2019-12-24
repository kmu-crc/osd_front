import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  UpdateProductInfo: { status: "INIT" },
  UpdateProductFile: { status: "INIT" }
};

export function UpdateProduct(state, action) {
  if (typeof state === "undefined") {
    state = initialState;
  }

  switch (action.type) {
    case types.UPDATE_PRODUCT_INFO:
      return update(state, { UpdateProductInfo: { status: { $set: "WATTING" } } });
    case types.UPDATE_PRODUCT_INFO_SUCCESS:
      return update(state, { UpdateProductInfo: { status: { $set: "SUCCESS" } } });
    case types.UPDATE_PRODUCT_INFO_FAILURE:
      return update(state, { UpdateProductInfo: { status: { $set: "FAILURE" } } });
    case types.UPDATE_PRODUCT_FILE:
      return update(state, { UpdateProductFile: { status: { $set: "WATTING" } } });
    case types.UPDATE_PRODUCT_FILE_SUCCESS:
      return update(state, { UpdateProductFile: { status: { $set: "SUCCESS" } } });
    case types.UPDATE_PRODUCT_FILE_FAILURE:
      return update(state, { UpdateProductFile: { status: { $set: "FAILURE" } } });
    default:
      return state;
  }
};
