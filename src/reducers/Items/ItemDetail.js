import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  ItemDetail: { status: "INIT" },
  status: { ItemDetail: [], 
    LikeInItem: [],
    LikeInItemAdded: [],
    HaveInItem: [],
    HaveInItemAdded: []
  }
};

export function ItemDetail(state, action) {
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

      case types.GET_LIKE_IN_ITEM:
        return update(state, {
          status: {
            LikeInItem: { $set: action.LikeInItem },
            LikeInItemAdded: { $push: action.LikeInItem }
          }
        });
      case types.GET_LIKE_IN_ITEM_CLEAR:
        return update(state, {
          status: {
            LikeInItem: { $set: action.LikeInItem },
            LikeInItemAdded: { $set: action.LikeInItem }
          }
        });
      case types.LIKE_IN_ITEM_FAIL:
        return update(state, {
          status: {
            LikeInItem: { $set: action.LikeInItem },
            LikeInItemAdded: { $set: action.LikeInItemAdded }
          }
        });

        case types.GET_HAVE_IN_ITEM:
          return update(state, {
            status: {
              HaveInItem: { $set: action.HaveInItem },
              HaveInItemAdded: { $push: action.HaveInItem }
            }
          });
        case types.GET_HAVE_IN_ITEM_CLEAR:
          return update(state, {
            status: {
              HaveInItem: { $set: action.HaveInItem },
              HaveInItemAdded: { $set: action.HaveInItem }
            }
          });
        case types.HAVE_IN_ITEM_FAIL:
          return update(state, {
            status: {
              HaveInItem: { $set: action.HaveInItem },
              HaveInItemAdded: { $set: action.HaveInItemAdded }
            }
          });
    default:
      return state;
  }
};
