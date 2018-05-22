import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  DesignerList: {
    status: "INIT"
  },
  status: {
    DesignerList: []
  }
};

export function DesignerList(state, action) {
  if (typeof state === "undefined")
    state = initialState;

  switch (action.type) {
    case types.GET_DESIGNER_LIST:
      return update(state, {
        status: {
          DesignerList: { $set: action.DesignerList }
        }
      });
    default:
      return state;
  }
};
