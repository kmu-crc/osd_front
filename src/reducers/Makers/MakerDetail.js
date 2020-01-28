import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  MakerDetail: { status: "INIT" },
  status: { MakerDetail: [], }
};

export function MakerDetail(state, action) {
  if (typeof state === "undefined") {
    state = initialState;
  }
  switch (action.type) {
    case types.GET_MAKER_DETAIL:
      return update(state, { status: { MakerDetail: { $set: action.MakerDetail } } });
    default:
      return state;
  }
};
