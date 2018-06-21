import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  LikeDesigner: {
    status: "INIT"
  },
  status: {
    like: false
  }
};

export function DesignerLike(state, action) {
  if (typeof state === "undefined")
    state = initialState;

  switch (action.type) {
    case types.GET_LIKE_DESIGNER:
      return update(state, {
        LikeDesigner: {
          status: { $set: "WATTING" }
        }
      });
    case types.GET_LIKE_DESIGNER_SUCCESS:
      return update(state, {
        LikeDesigner: {
          status: { $set: "SUCCESS" }
        },
        status: {
          like: { $set: action.like }
        }
      });
    case types.GET_LIKE_DESIGNER_FAILURE:
      return update(state, {
        LikeDesigner: {
          status: { $set: "FAILURE" }
        },
        status: {
          like: { $set: action.like }
        }
      });
    case types.LIKE_DESIGNER:
      return update(state, {
        LikeDesigner: {
          status: { $set: "WATING"}
        }
      });
    case types.LIKE_DESIGNER_SUCCESS:
      return update(state, {
        LikeDesigner: {
          status: { $set: "SUCCESS"}
        }
      });
    case types.LIKE_DESIGNER_FAILURE:
      return update(state, {
        LikeDesigner: {
          status: { $set: "FAILURE"}
        }
      });
    case types.UNLIKE_DESIGNER:
      return update(state, {
        LikeDesigner: {
          status: { $set: "WATING"}
        }
      });
    case types.UNLIKE_DESIGNER_SUCCESS:
      return update(state, {
        LikeDesigner: {
          status: { $set: "SUCCESS"}
        }
      });
    case types.UNLIKE_DESIGNER_FAILURE:
      return update(state, {
        LikeDesigner: {
          status: { $set: "FAILURE"}
        }
      });
    default:
      return state;
  }
};
