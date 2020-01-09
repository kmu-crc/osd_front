import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  DesignerBoardList: { status: "INIT" },
  status: { DesignerBoardList: [], Count: 0 }
};

export function DesignerBoardList(state, action) {
  if (typeof state === "undefined") {
    state = initialState;
  }

  switch (action.type) {
    case types.GET_DESIGNER_BOARD_LIST:
      return update(state, {status: {DesignerBoardList: { $set: action.DesignerBoardList },}});

    case types.DESIGNER_BOARD_LIST_CLEAR:
      return update(state, {status: {DesignerBoardList: { $set: action.DesignerBoardList },}});

    case types.DESIGNER_BOARD_LIST_FAIL:
      return update(state, {status: {DesignerBoardList: { $set: action.DesignerBoardList },}});

    case types.GET_DESIGNER_BOARD_TOTAL_COUNT:
      return update(state, {status: {Count: { $set: action.Count }}});

    case types.GET_DESIGNER_BOARD_TOTAL_COUNT_FAIL:
      return update(state, {status: {Count: { $set: action.Count }}});

    default:
      return state;
  }
};
