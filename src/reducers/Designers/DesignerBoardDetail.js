import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  DesignerBoardDetail: {
    status: "INIT"
  },
  status: {
    DesignerBoardDetail: [],
    Count: { like: 0, view: 0 },
  }
};

export function DesignerBoardDetail(state, action) {
  if (typeof state === "undefined") {
    state = initialState;
  }

  switch (action.type) {
    case types.GET_DESIGNER_BOARD_DETAIL:
      return update(state, { status: { DesignerBoardDetail: { $set: action.DesignerBoardDetail } } });

    case types.GET_DESIGNER_BOARD_COUNT:
      return update(state, { status: { Count: { $set: action.Count } } });

    default:
      return state;
  }
};
