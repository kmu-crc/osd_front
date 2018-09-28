import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  WaitingList: {
    status: 'INIT'
  },
  status: {
    WaitingList: []
  }
};

export function DesignWaitingList(state, action) {
  if (typeof state === "undefined")
    state = initialState;

  switch (action.type) {
    case types.GET_WAITING_LIST:
      return update(state, {
        WaitingList: {
          status : { $set: "WAITING" }
        }
      });
    case types.GET_WAITING_LIST_SUCCESS:
      return update(state, {
        status: {
          WaitingList: { $set: action.list }
        },
        WaitingList: {
          status : { $set: "SUCCESS" }
        }
       });
    case types.GET_WAITING_LIST_FAILURE:
       return update(state, {
        status: {
          WaitingList: { $set: action.list }
        },
        WaitingList: {
          status : { $set: "FAILURE" }
        }
       });
    default:
      return state;
  }
};
