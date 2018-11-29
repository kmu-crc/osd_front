import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  GetDesignComment: {
    status: "INIT"
  },
  CreateDesignComment: {
    status: "INIT"
  },
  DeleteDesignComment: {
    status: "INIT"
  },
  status: {
    Comment: []
  }
};

export function DesignDetailComment(state, action) {
  if (typeof state === "undefined")
    state = initialState;

  switch (action.type) {
    case types.GET_DESIGN_COMMENT:
      return update(state, {
        CreateDesignComment: {
          status: { $set: "WATTING" }
        }
      });
    case types.GET_DESIGN_COMMENT_SUCCESS:
      return update(state, {
        CreateDesignComment: {
          status: { $set: "SUCCESS"}
        },
        status: {
          Comment: { $set: action.Comment }
        }
      });
    case types.GET_DESIGN_COMMENT_FAILURE:
      return update(state, {
        CreateDesignComment: {
          status: { $set: "FAILURE"}
        }
      });
    case types.CREATE_DESIGN_COMMENT:
      return update(state, {
        CreateDesignComment: {
          status: { $set: "WATTING" }
        }
      });
    case types.CREATE_DESIGN_COMMENT_SUCCESS:
      return update(state, {
        CreateDesignComment: {
          status: { $set: "SUCCESS"}
        }
      });
    case types.CREATE_DESIGN_COMMENT_FAILURE:
      return update(state, {
        CreateDesignComment: {
          status: { $set: "FAILURE"}
        }
      });
    case types.DELETE_DESIGN_COMMENT:
      return update(state, {
        DeleteDesignComment: {
          status: { $set: "WATTING" }
        }
      });
    case types.DELETE_CARD_COMMENT_SUCCESS:
      return update(state, {
        DeleteDesignComment: {
          status: { $set: "SUCCESS"}
        }
      });
    case types.DELETE_DESIGN_COMMENT_FAILURE:
      return update(state, {
        DeleteDesignComment: {
          status: { $set: "FAILURE"}
        }
      });
    default:
      return state;
  }
};
