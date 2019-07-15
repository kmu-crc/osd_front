import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  LikeGroup: {
    status: "INIT"
  },
  status: {
    like: false
  }
};

export function GroupLike(state, action) {
  if (typeof state === "undefined")
    state = initialState;

  switch (action.type) {
    case types.GET_LIKE_GROUP:
      return update(state, {
        LikeGroup: {
          status: { $set: "WATTING" }
        }
      });
    case types.GET_LIKE_GROUP_SUCCESS:
      return update(state, {
        LikeGroup: {
          status: { $set: "SUCCESS" }
        },
        status: {
          like: { $set: action.like }
        }
      });
    case types.GET_LIKE_GROUP_FAILURE:
      return update(state, {
        LikeGroup: {
          status: { $set: "FAILURE" }
        },
        status: {
          like: { $set: action.like }
        }
      });
    case types.LIKE_GROUP:
      return update(state, {
        LikeGroup: {
          status: { $set: "WATING"}
        }
      });
    case types.LIKE_GROUP_SUCCESS:
      return update(state, {
        LikeGroup: {
          status: { $set: "SUCCESS"}
        }
      });
    case types.LIKE_GROUP_FAILURE:
      return update(state, {
        LikeGroup: {
          status: { $set: "FAILURE"}
        }
      });
    case types.UNLIKE_GROUP:
      return update(state, {
        LikeGroup: {
          status: { $set: "WATING"}
        }
      });
    case types.UNLIKE_GROUP_SUCCESS:
      return update(state, {
        LikeGroup: {
          status: { $set: "SUCCESS"}
        }
      });
    case types.UNLIKE_GROUP_FAILURE:
      return update(state, {
        LikeGroup: {
          status: { $set: "FAILURE"}
        }
      });
    default:
      return state;
  }
};
