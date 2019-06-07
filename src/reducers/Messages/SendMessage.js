import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  SendMessage: {
    status: "INIT"
  }
};

export function SendMessage(state, action) {
  if (typeof state === "undefined")
    state = initialState;

  switch (action.type) {
    case types.SEND_MESSAGE:
      return update(state, {
        SendMessage: {
          status: { $set: "WATTING" }
        }
      });
    case types.SEND_MESSAGE_SUCCESS:
      return update(state, {
        SendMessage: {
          status: { $set: "SUCCESS" }
        }
      });
    case types.SEND_MESSAGE_FAILURE:
      return update(state, {
        SendMessage: {
          status: { $set: "FAILURE" }
        }
      });
    default:
      return state;
  }
};
