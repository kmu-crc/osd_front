import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  ProductDetail: {
    status: "INIT"
  },
  status: {
    ProductDetail: [],
    Count: {
      like_count: 0,
      member_count: 0,
      card_count: 0,
      view_count: 0
    }
  }
};

export function ProductDetail(state, action) {
  if (typeof state === "undefined") {
    state = initialState;
  }
  switch (action.type) {
    case types.GET_PRODUCT_DETAIL:
      return update(state, {
        status: {
          ProductDetail: { $set: action.ProductDetail }
        }
      });
    case types.PRODUCT_DETAIL_RESET:
      return update(state, {
        status: {
          ProductDetail: { $set: action.ProductDetail }
        }
      });
    case types.GET_PRODUCT_COUNT:
      return update(state, {
        status: {
          Count: { $set: action.Count }
        }
      });
    default:
      return state;
  }
};
