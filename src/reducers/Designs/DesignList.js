import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  DesignList: {
    status: 'INIT'
  },
  status: {
    DesignList: [],
    DesignListAdded: []
  }
};

export function DesignList(state, action) {
  if (typeof state === "undefined")
    state = initialState;

  switch (action.type) {
    case types.GET_DESIGN_LIST:
      return update(state, {
        status: {
          DesignList: { $set: action.DesignList },
          DesignListAdded: { $push: [action.DesignList] }
        }
      });
    case types.DESIGN_LIST_CLEAR:
      console.log("리듀서에 있는 clear 케이스가 호출되었음");
      return update(state, {
         status: {
           DesignList: { $set: action.DesignList },
           DesignListAdded: { $set: [action.DesignList] }
         }
       });
    default:
      return state;
  }
};
