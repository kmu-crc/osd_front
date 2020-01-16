import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  GetProductComment: {
    status: "INIT"
  },
  CreateProductComment: {
    status: "INIT"
  },
  DeleteProductComment: {
    status: "INIT"
  },
  status: {
    Comment: []
  }
};

export function ProductDetailComment(state, action) {
  if (typeof state === "undefined")
    state = initialState;

  switch (action.type) {
    case types.GET_PRODUCT_COMMENT:
      return update(state, {
        CreateProductComment: {
          status: { $set: "WATTING" }
        }
      });
    case types.GET_PRODUCT_COMMENT_SUCCESS:
      return update(state, {
        CreateProductComment: {
          status: { $set: "SUCCESS"}
        },
        status: {
          Comment: { $set: action.Comment }
        }
      });
    case types.GET_PRODUCT_COMMENT_FAILURE:
      return update(state, {
        CreateProductComment: {
          status: { $set: "FAILURE"}
        }
      });
    case types.CREATE_PRODUCT_COMMENT:
      return update(state, {
        CreateProductComment: {
          status: { $set: "WATTING" }
        }
      });
    case types.CREATE_PRODUCT_COMMENT_SUCCESS:
      return update(state, {
        CreateProductComment: {
          status: { $set: "SUCCESS"}
        }
      });
    case types.CREATE_PRODUCT_COMMENT_FAILURE:
      return update(state, {
        CreateProductComment: {
          status: { $set: "FAILURE"}
        }
      });
    case types.DELETE_PRODUCT_COMMENT:
      return update(state, {
        DeleteProductComment: {
          status: { $set: "WATTING" }
        }
      });
    case types.DELETE_CARD_COMMENT_SUCCESS:
      return update(state, {
        DeleteProductComment: {
          status: { $set: "SUCCESS"}
        }
      });
    case types.DELETE_PRODUCT_COMMENT_FAILURE:
      return update(state, {
        DeleteProductComment: {
          status: { $set: "FAILURE"}
        }
      });
    default:
      return state;
  }
};
