import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  DesignList: {
    status: 'INIT'
  },
  status: {
    DesignList: [],
  }
};

export default function DesignList(state, action) {
  if (typeof state === "undefined")
    state = initialState;

  switch (action.type) {
    /* LOGIN */
    case types.GET_DESIGN_LIST:
      return update(state, {
        status: {
          DesignList: { $set: action.DesignList }
        }
      });
    default:
      return state;
  }
};
