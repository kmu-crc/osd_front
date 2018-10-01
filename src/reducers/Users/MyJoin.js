import * as types from "../../actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  MyJoin: {
    status: "INIT"
  },
  status: {
    InvitedList: [],
    InvitingList: []
  }
};

export function MyJoin(state, action) {
  if (typeof state === "undefined")
    state = initialState;

  switch (action.type) {
    case types.GET_MY_INVITED_LIST:
      return update(state, {
        MyJoin: {
          status: { $set: "INIT" }
        }
      });
    case types.GET_MY_INVITED_LIST_SUCCESS:
      return update(state, {
        status: {
          InvitedList: { $set: action.list }
        },
        MyJoin: {
          status: { $set: "SUCCESS" }
        }
      });
    case types.GET_MY_INVITED_LIST_FAILURE:
      return update(state, {
        status: {
          InvitedList: { $set: action.list }
        },
        MyJoin: {
          status: { $set: "FAILURE" }
        }
      });
    case types.GET_MY_INVITING_LIST:
      return update(state, {
        MyJoin: {
          status: { $set: "INIT" }
        }
      });
    case types.GET_MY_INVITING_LIST_SUCCESS:
      return update(state, {
        status: {
          InvitingList: { $set: action.list }
        },
        MyJoin: {
          status: { $set: "SUCCESS" }
        }
      });
    case types.GET_MY_INVITING_LIST_FAILURE:
      return update(state, {
        status: {
          InvitingList: { $set: action.list }
        },
        MyJoin: {
          status: { $set: "FAILURE" }
        }
      });
    default:
      return state;
  }
};
