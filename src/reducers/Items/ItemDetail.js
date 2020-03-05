import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  ItemDetail: { status: "INIT" },
  status: { ItemDetail: [], 
    LikeInItem: [],
    LikeInItemAdded: [],
    AllHaveInItem: [],
    HaveInItem: [],
    HaveInItemAdded: []
  }
};

export function ItemDetail(state, action) {
  if (typeof state === "undefined") {
    state = initialState;
  }

  switch (action.type) {
    case types.GET_ITEM_DETAIL:
      return update(state, {
        status: {
          ItemDetail: { $set: action.ItemDetail }
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

        case types.GET_ALL_HAVE_IN_ITEM:
          console.log(action.AllHaveInItem)
          return update(state, {
            status: {
              AllHaveInItem: { $set: action.AllHaveInItem },
            }
          });

          case types.ALL_HAVE_IN_ITEM_FAIL:
            return update(state, {
              status: {
                AllHaveInItem: { $set: action.AllHaveInItem },
              }
            });

    default:
      return state;
  }
};
