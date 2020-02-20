import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  MakerDetail: { status: "INIT" },
  status: { MakerDetail: [],MakerViewDetail:[],
    LikeInMaker: [],
    LikeInMakerAdded: [] }
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
    case types.GET_LIKE_IN_MAKER:
      return update(state, {
        status: {
          LikeInMaker: { $set: action.LikeInMaker },
          LikeInMakerAdded: { $push: action.LikeInMaker }
        }
      });
    case types.GET_LIKE_IN_MAKER_CLEAR:
      return update(state, {
        status: {
          LikeInMaker: { $set: action.LikeInMaker },
          LikeInMakerAdded: { $set: action.LikeInMaker }
        }
      });
    case types.LIKE_IN_MAKER_FAIL:
      return update(state, {
        status: {
          LikeInMaker: { $set: action.LikeInMaker },
          LikeInMakerAdded: { $set: action.LikeInMakerAdded }
        }
      });
    default:
        return state;
  }
};
