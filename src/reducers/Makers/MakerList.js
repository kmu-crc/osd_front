import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  MakerList: {
    status: "INIT"
  },
  status: {
    List: [],
    ListAdded: [],
    Count: 0,
    searchCount:0

  }
};

export const MakerList = (state, action) => {
  if (typeof state === "undefined") {
    state = initialState;
  }
  switch (action.type) {
    case types.GET_MAKER_LIST:
      return update(state, { status: { List: { $set: action.List }, ListAdded: { $push: action.List } } });
    case types.MAKER_LIST_CLEAR:
      return update(state, { status: { List: { $set: action.List }, ListAdded: { $set: action.List } } });
    case types.MAKER_LIST_FAIL:
      return update(state, { status: { List: { $set: action.List }, ListAdded: { $set: action.ListAdded } } });
    case types.GET_MAKER_TOTAL_COUNT:
      return update(state, { status: { Count: { $set: action.Count } } });
    case types.GET_MAKER_TOTAL_COUNT_FAIL:
      return update(state, { status: { Count: { $set: action.Count } } });
    case types.GET_MAKER_SEARCH_COUNT:
        return update(state, { status: { searchCount: { $set: action.Count } } });
    case types.GET_MAKER_SEARCH_COUNT_FAIL:
        return update(state, { status: { searchCount: { $set: action.Count } } });
    default:
      return state;
  }
};
