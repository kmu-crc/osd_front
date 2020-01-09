import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  DesignerList: {
    status: "INIT"
  },
  status: {
    DesignerList: [],
    DesignerListAdded: [],
    Count: 0
  }
};

export function DesignerList(state, action) {
  if (typeof state === "undefined")
    state = initialState;

  switch (action.type) {
    case types.GET_DESIGNER_LIST:
      return update(state, {
        status: {
          DesignerList: { $set: action.DesignerList },
          DesignerListAdded: { $push: action.DesignerList }
        }
      });
    case types.DESIGNER_LIST_CLEAR:
      return update(state, {
        status: {
          DesignerList: { $set: action.DesignerList },
          DesignerListAdded: { $set: action.DesignerList }
        }
      });
    case types.DESIGNER_LIST_FAIL:
      return update(state, {
        status: {
          DesignerList: { $set: action.DesignerList },
          DesignerListAdded: { $set: action.DesignerListAdded }
        }
      });
    case types.GET_DESIGNER_TOTAL_COUNT:
      return update(state, {
        status: {
          Count: { $set: action.Count }
        }
      });
    case types.GET_DESIGNER_TOTAL_COUNT_FAIL:
      return update(state, {
        status: {
          Count: { $set: action.Count }
        }
      });
    default:
      return state;
  }
};
