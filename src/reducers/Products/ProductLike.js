import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  LikeProduct: { status: "INIT" },
  status: { like: false }
};

export function ProductLike(state, action) {
  if (typeof state === "undefined") {
    state = initialState;
  }

  switch (action.type) {
    case types.GET_LIKE_PRODUCT:
      return update(state, { LikeProduct: { status: { $set: "WATTING" } } });
    case types.GET_LIKE_PRODUCT_SUCCESS:
      return update(state, { LikeProduct: { status: { $set: "SUCCESS" } }, status: { like: { $set: action.like } } });
    case types.GET_LIKE_PRODUCT_FAILURE:
      return update(state, { LikeProduct: { status: { $set: "FAILURE" } }, status: { like: { $set: action.like } } });
    case types.LIKE_PRODUCT:
      return update(state, { LikeProduct: { status: { $set: "WATING" } } });
    case types.LIKE_PRODUCT_SUCCESS:
      return update(state, { LikeProduct: { status: { $set: "SUCCESS" } } });
    case types.LIKE_PRODUCT_FAILURE:
      return update(state, { LikeProduct: { status: { $set: "FAILURE" } } });
    case types.UNLIKE_PRODUCT:
      return update(state, { LikeProduct: { status: { $set: "WATING" } } });
    case types.UNLIKE_PRODUCT_SUCCESS:
      return update(state, { LikeProduct: { status: { $set: "SUCCESS" } } });
    case types.UNLIKE_PRODUCT_FAILURE:
      return update(state, { LikeProduct: { status: { $set: "FAILURE" } } });
    default:
      return state;
  }
};
