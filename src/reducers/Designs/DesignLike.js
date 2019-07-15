import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  LikeDesign: {
    status: "INIT"
  },
  status: {
    like: false
  }
};

export function DesignLike(state, action) {
  if (typeof state === "undefined")
    state = initialState;

  switch (action.type) {
    case types.GET_LIKE_DESIGN:
      return update(state, {
        LikeDesign: {
          status: { $set: "WATTING" }
        }
      });
    case types.GET_LIKE_DESIGN_SUCCESS:
      return update(state, {
        LikeDesign: {
          status: { $set: "SUCCESS" }
        },
        status: {
          like: { $set: action.like }
        }
      });
    case types.GET_LIKE_DESIGN_FAILURE:
      return update(state, {
        LikeDesign: {
          status: { $set: "FAILURE" }
        },
        status: {
          like: { $set: action.like }
        }
      });
    case types.LIKE_DESIGN:
      return update(state, {
        LikeDesign: {
          status: { $set: "WATING"}
        }
      });
    case types.LIKE_DESIGN_SUCCESS:
      return update(state, {
        LikeDesign: {
          status: { $set: "SUCCESS"}
        }
      });
    case types.LIKE_DESIGN_FAILURE:
      return update(state, {
        LikeDesign: {
          status: { $set: "FAILURE"}
        }
      });
    case types.UNLIKE_DESIGN:
      return update(state, {
        LikeDesign: {
          status: { $set: "WATING"}
        }
      });
    case types.UNLIKE_DESIGN_SUCCESS:
      return update(state, {
        LikeDesign: {
          status: { $set: "SUCCESS"}
        }
      });
    case types.UNLIKE_DESIGN_FAILURE:
      return update(state, {
        LikeDesign: {
          status: { $set: "FAILURE"}
        }
      });
    default:
      return state;
  }
};
