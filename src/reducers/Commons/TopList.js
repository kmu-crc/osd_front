import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  TopList: {
    status: "INIT"
  },
  TopDesignerList: {
    status: "INIT"
  },
  status: {
    DesignList: [],
    DesignListAdded: [],
    DesignerList: []
  }
};

export function TopList(state, action) {
  if (typeof state === "undefined")
    state = initialState;

  switch (action.type) {
    case types.GET_TOP_DESIGN_LIST_SUCCESS:
      return update(state, {
        TopList: {
          $set: "SUCCESS"
        },
        status: {
          DesignList: { $set: action.TopList },
          DesignListAdded: { $push: action.TopList }
        }
      });
    case types.GET_TOP_DESIGN_LIST_FAILURE:
      return update(state, {
        TopList: {
          $set: "FAILURE"
        },
        status: {
          DesignList: { $set: action.TopList },
          DesignListAdded: { $set: action.TopList }
        }
      });
    case types.GET_TOP_DESIGNER_LIST_SUCCESS:
      return update(state, {
        TopDesignerList: {
          $set: "SUCCESS"
        },
        status: {
          DesignerList: { $set: action.TopDesignerList }
        }
      });
    case types.GET_TOP_DESIGNER_LIST_FAILURE:
      return update(state, {
        TopDesignerList: {
          $set: "FAILURE"
        },
        status: {
          DesignerList: { $set: action.TopDesignerList }
        }
      });
    default:
      return state;
  }
};
