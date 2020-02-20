import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  LikeMaker: {
    status: "INIT"
  },
  status: {
    like: false
  }
};

export function MakerLike(state, action) {
  if (typeof state === "undefined")
    state = initialState;

  switch (action.type) {
    case types.GET_LIKE_MAKER:
      return update(state, {
        LikeMaker: {
          status: { $set: "WATTING" }
        }
      });
    case types.GET_LIKE_MAKER_SUCCESS:
      return update(state, {
        LikeMaker: {
          status: { $set: "SUCCESS" }
        },
        status: {
          like: { $set: action.like }
        }
      });
    case types.GET_LIKE_MAKER_FAILURE:
      return update(state, {
        LikeMaker: {
          status: { $set: "FAILURE" }
        },
        status: {
          like: { $set: action.like }
        }
      });
    case types.LIKE_MAKER:
      return update(state, {
        LikeMaker: {
          status: { $set: "WATING"}
        }
      });
    case types.LIKE_MAKER_SUCCESS:
      return update(state, {
        LikeMaker: {
          status: { $set: "SUCCESS"}
        }
      });
    case types.LIKE_MAKER_FAILURE:
      return update(state, {
        LikeMaker: {
          status: { $set: "FAILURE"}
        }
      });
    case types.UNLIKE_MAKER:
      return update(state, {
        LikeMaker: {
          status: { $set: "WATING"}
        }
      });
    case types.UNLIKE_MAKER_SUCCESS:
      return update(state, {
        LikeMaker: {
          status: { $set: "SUCCESS"}
        }
      });
    case types.UNLIKE_MAKER_FAILURE:
      return update(state, {
        LikeMaker: {
          status: { $set: "FAILURE"}
        }
      });
    default:
      return state;
  }
};
