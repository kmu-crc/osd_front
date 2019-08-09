import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  GetMsgDetail: {
    status: "INIT"
  },
  status: {
    MsgDetail: []
  }
};

export function MessageDetail(state, action) {
  if (typeof state === "undefined")
    state = initialState;

  switch (action.type) {
    case types.GET_MY_MSG_DETAIL:
      return update(state, {
        GetMsgDetail: {
          status: { $set: "WATTING" }
        }
      });
    case types.GET_MY_MSG_DETAIL_SUCCESS:
      return update(state, {
        GetMsgDetail: {
          status: { $set: "SUCCESS" }
        },
        status: {
          MsgDetail: { $set: action.MsgDetail }
        }
      });
    case types.GET_MY_MSG_DETAIL_FAILURE:
      return update(state, {
        GetMsgDetail: {
          status: { $set: "FAILURE" }
        }
      });
    case types.GET_MY_MSG_DETAIL_CLEAR:
      return update(state, {
        status: {
          MsgDetail: { $set: action.MsgDetail }
        }
      });
    default:
      return state;
  }
};
