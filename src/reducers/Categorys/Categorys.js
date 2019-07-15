import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  category: {
    status: "INIT"
  },
  status: {
    level1: [],
    level2: []
  }
};

export function Categorys(state, action) {
  if (typeof state === "undefined")
    state = initialState;

  switch (action.type) {
    /////////////////////////
    // get category level1
    /////////////////////////
    case types.GET_CATEGORY_LEVEL1:
      return update(state, {
        category: {
          status: { $set: "WAITING" }
        }
      });
    case types.GET_CATEGORY_LEVEL1_SUCCESS:
      return update(state, {
        category: {
          status: { $set: "SUCCESS" }
        },
        status: {
          level1: { $set: action.category }
        }
      });
    case types.GET_CATEGORY_LEVEL1_FAILURE:
      return update(state, {
        category: {
          status: { $set: "FAILURE" }
        }
      });
    /////////////////////////
    // get category level2
    /////////////////////////
    case types.GET_CATEGORY_LEVEL2:
      return update(state, {
        category: {
          status: { $set: "WAITING" }
        }
      });
    case types.GET_CATEGORY_LEVEL2_SUCCESS:
      return update(state, {
        category: {
          status: { $set: "SUCCESS" }
        },
        status: {
          level2: { $set: action.category }
        }
      });
    case types.GET_CATEGORY_LEVEL2_FAILURE:
      return update(state, {
        category: {
          status: { $set: "FAILURE" }
        }
      });
    default:
      return state;
  }
}
