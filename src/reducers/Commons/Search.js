import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  Search: {
    status: "INIT"
  },
  status: {
    members: []
  }
};

export function Search(state, action) {
  if (typeof state === "undefined")
    state = initialState;

  switch (action.type) {
    case types.GET_SEARCH_MEMVER:
      return update(state, {
        Search: {
          $set: "WAITING"
        }
      });
    case types.GET_SEARCH_MEMBER_SUCCESS:
      return update(state, {
        Search: {
          $set: "SUCCESS"
        },
        status: {
          members: { $set: action.members }
        }
      });
    case types.GET_SEARCH_MEMBER_FAILURE:
      return update(state, {
        Search: {
          $set: "FAILURE"
        },
        status: {
          members: { $set: [] }
        }
      });
    default:
      return state;
  }
};
