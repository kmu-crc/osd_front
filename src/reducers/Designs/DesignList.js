import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  DesignList: {
    status: 'INIT'
  },
  status: {
    DesignList: [],
    DesignListAdded: [],
    Count: 0,
    searchCount:0
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
          DesignListAdded: { $push: action.DesignList }
        }
      });
    case types.DESIGN_LIST_CLEAR:
      return update(state, {
        status: {
          DesignList: { $set: action.DesignList },
          DesignListAdded: { $set: action.DesignList }
        }
       });
    case types.DESIGN_LIST_FAIL:
       return update(state, {
        status: {
          DesignList: { $set: action.DesignList },
          DesignListAdded: { $set: action.DesignListAdded }
        }
       });
    case types.GET_DESIGN_TOTAL_COUNT:
       return update(state, {
         status: {
           Count: { $set: action.Count }
         }
       });
    case types.GET_DESIGN_TOTAL_COUNT_FAIL:
      return update(state, {
        status: {
          Count: { $set: action.Count }
        }
      });
      case types.GET_DESIGN_SEARCH_COUNT:
        return update(state, {
          status: {
            searchCount: { $set: action.Count }
          }
        });
     case types.GET_DESIGN_SEARCH_COUNT_FAIL:
       return update(state, {
         status: {
          searchCount: { $set: action.Count }
         }
       });
    default:
      return state;
  }
};
