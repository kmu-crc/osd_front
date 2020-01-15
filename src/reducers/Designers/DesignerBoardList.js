import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  CreateDesignerBoard: { status: "INIT" },
  DesignerBoardList: { status: "INIT" },
  status: { DesignerBoardList: [], Count: 0, success: null }
};

export function DesignerBoardList(state, action) {
  if (typeof state === "undefined") {
    state = initialState;
  }

  switch (action.type) {
    case types.CREATE_DESIGNER_BOARD_ARTICLE:
      return update(state, { CreateDesignerBoard: { status: { $set: types.CREATE_DESIGNER_BOARD_ARTICLE } } });

    case types.CREATE_DESIGNER_BOARD_ARTICLE_SUCCESS:
      return update(state, { CreateDesignerBoard: { status: { $set: types.CREATE_DESIGNER_BOARD_ARTICLE_SUCCESS } } });

    case types.CREATE_DESIGNER_BOARD_ARTICLE_FAIL:
      return update(state, { CreateDesignerBoard: { status: { $set: types.CREATE_DESIGNER_BOARD_ARTICLE_FAIL } } });

    case types.GET_DESIGNER_BOARD_LIST:
      return update(state, { status: { DesignerBoardList: { $set: action.DesignerBoardList }, } });

    case types.DESIGNER_BOARD_LIST_CLEAR:
      return update(state, { status: { DesignerBoardList: { $set: action.DesignerBoardList }, } });

    case types.DESIGNER_BOARD_LIST_FAIL:
      return update(state, { status: { DesignerBoardList: { $set: action.DesignerBoardList }, } });

    case types.GET_DESIGNER_BOARD_TOTAL_COUNT:
      return update(state, { status: { Count: { $set: action.Count } } });

    case types.GET_DESIGNER_BOARD_TOTAL_COUNT_FAIL:
      return update(state, { status: { Count: { $set: action.Count } } });

    default:
      return state;
  }
};
