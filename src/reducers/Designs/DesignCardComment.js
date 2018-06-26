import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  GetCardComment: {
    status: "INIT"
  },
  CreateCardComment: {
    status: "INIT"
  },
  DeleteCardComment: {
    status: "INIT"
  },
  status: {
    Comment: []
  }
};

export function DesignCardComment(state, action) {
  if (typeof state === "undefined")
    state = initialState;

  switch (action.type) {
    case types.GET_CARD_COMMENT:
      return update(state, {
        CreateCardComment: {
          status: { $set: "WATTING" }
        }
      });
    case types.GET_CARD_COMMENT_SUCCESS:
      return update(state, {
        CreateCardComment: {
          status: { $set: "SUCCESS"}
        },
        status: {
          Comment: { $set: action.Comment }
        }
      });
    case types.GET_CARD_COMMENT_FAILURE:
      return update(state, {
        CreateCardComment: {
          status: { $set: "FAILURE"}
        }
      });
    case types.CREATE_CARD_COMMENT:
      return update(state, {
        CreateCardComment: {
          status: { $set: "WATTING" }
        }
      });
    case types.CREATE_CARD_COMMENT_SUCCESS:
      return update(state, {
        CreateCardComment: {
          status: { $set: "SUCCESS"}
        }
      });
    case types.CREATE_CARD_COMMENT_FAILURE:
      return update(state, {
        CreateCardComment: {
          status: { $set: "FAILURE"}
        }
      });
    case types.DELETE_CARD_COMMENT:
      return update(state, {
        DeleteCardComment: {
          status: { $set: "WATTING" }
        }
      });
    case types.DELETE_CARD_COMMENT_SUCCESS:
      return update(state, {
        DeleteCardComment: {
          status: { $set: "SUCCESS"}
        }
      });
    case types.DELETE_CARD_COMMENT_FAILURE:
      return update(state, {
        DeleteCardComment: {
          status: { $set: "FAILURE"}
        }
      });
    default:
      return state;
  }
};
