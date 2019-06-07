import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  GetMsgList: {
    status: "INIT"
  },
  status: {
    MsgList: []
  }
};

export function MessageList(state, action) {
  if (typeof state === "undefined")
    state = initialState;

  switch (action.type) {
    case types.GET_MY_MSG_LIST:
      return update(state, {
        GetMsgList: {
          status: { $set: "WATTING" }
        }
      });
    case types.GET_MY_MSG_LIST_SUCCESS:
      return update(state, {
        GetMsgList: {
          status: { $set: "SUCCESS" }
        },
        status: {
          MsgList: { $set: action.MsgList }
        }
      });
    case types.GET_MY_MSG_LIST_FAILURE:
      return update(state, {
        GetMsgList: {
          status: { $set: "FAILURE" }
        }
      });
    default:
      return state;
  }
};
