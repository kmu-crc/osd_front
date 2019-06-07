import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  category: {
    status: "INIT"
  },
  status: {
    category1: [],
    category2: []
  }
};

export function CategoryAll(state, action) {
  if (typeof state === "undefined")
    state = initialState;

  switch (action.type) {
    case types.GET_CATEGORY_ALL:
      return update(state, {
        category: {
          status: { $set: "WAITING" }
        }
      });
    case types.GET_CATEGORY_ALL_SUCCESS:
      return update(state, {
        category: {
          status: { $set: "SUCCESS" }
        },
        status: {
          category1: { $set: action.category1 },
          category2: { $set: action.category2 }
        }
      });
    case types.GET_CATEGORY_ALL_FAILURE:
      return update(state, {
        category: {
          status: { $set: "FAILURE" }
        }
      });
    default:
      return state;
  }
}
