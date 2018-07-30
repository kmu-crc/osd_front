import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  category: {
    status: "INIT"
  },
  status: {
    level2: [],
    level2List: []
  }
};

export function CategoryAll(state, action) {
  if (typeof state === "undefined")
    state = initialState;

  switch (action.type) {
    case types.GET_CATEGORY_LEVEL2_ALL:
      return update(state, {
        category: {
          status: { $set: "WAITING" }
        }
      });
    case types.GET_CATEGORY_LEVEL2_ALL_SUCCESS:
      return update(state, {
        category: {
          status: { $set: "SUCCESS" }
        },
        status: {
          level2: { $set: action.level2 },
          level2List: { $push: [action.level2] }
        }
      });
    case types.GET_CATEGORY_LEVEL2_ALL_FAILURE:
      return update(state, {
        category: {
          status: { $set: "FAILURE" }
        }
      });
    default:
      return state;
  }
}
