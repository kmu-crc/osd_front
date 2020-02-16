import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  MakerDetail: { status: "INIT" },
  status: { MakerDetail: [],MakerViewDetail:[], }
};

export function MakerDetail(state, action) {
  if (typeof state === "undefined") {
    state = initialState;
  }
  switch (action.type) {
    case types.GET_MAKER_DETAIL:
      return update(state, { status: { MakerDetail: { $set: action.MakerDetail } } });
    case types.GET_MAKER_VIEW_DETAIL:
        return update(state, { status: { MakerViewDetail: { $set: action.MakerViewDetail } } });
    default:
        return state;
  }
};
