import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  WaitingList: {
    status: "INIT"
  },
  status: {
    waitingDesign: [],
    waitingGroup: []
  }
};

export function GroupWaitingList(state, action) {
  if (typeof state === "undefined")
    state = initialState;

  switch (action.type) {
    case types.GET_WAITING_DESIGN:
      return update(state, {
        status: {
          waitingDesign: { $set: action.waitingDesign }
        }
      });
    case types.GET_WAITING_GROUP:
      return update(state, {
        status: {
          waitingGroup: { $set: action.waitingGroup }
        }
      });
    case types.GET_WAITING_DATA_FAIL:
      return update(state, {
        status: {
          waitingDesign: { $set: action.waitingDesign },
          waitingGroup: { $set: action.waitingGroup }
        }
      });
    default:
      return state;
  }
};
