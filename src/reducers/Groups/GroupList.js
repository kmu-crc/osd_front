import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  GroupList: {
    status: "INIT"
  },
  status: {
    GroupList: [],
    GroupListAdded: [],
    Count: 0
  }
};

export function GroupList(state, action) {
  if (typeof state === "undefined")
    state = initialState;

  switch (action.type) {
    case types.GET_GROUP_LIST:
      return update(state, {
        status: {
          GroupList: { $set: action.GroupList },
          GroupListAdded: { $push: action.GroupList }
        }
      });
      case types.GROUP_LIST_CLEAR:
        return update(state, {
          status: {
            GroupList: { $set: action.GroupList },
            GroupListAdded: { $set: action.GroupList }
          }
        });
      case types.GROUP_LIST_FAIL:
        return update(state, {
          status: {
            GroupList: { $set: action.GroupList },
            GroupListAdded: { $set: action.GroupListAdded }
          }
        });
      case types.GET_GROUP_TOTAL_COUNT:
        return update(state, {
          status: {
            Count: { $set: action.Count }
          }
        });
      case types.GET_GROUP_TOTAL_COUNT_FAIL:
        return update(state, {
          status: {
            Count: { $set: action.Count }
          }
        });
    default:
      return state;
  }
};
