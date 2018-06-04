import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  DesignerDetail: {
    status: "INIT"
  },
  status: {
    DesignerDetail: [],
    DesignInDesigner: [],
    DesignInDesignerAdded: [],
    LikeInDesigner: [],
    LikeInDesignerAdded: []
  }
};

export function DesignerDetail(state, action) {
  if (typeof state === "undefined")
    state = initialState;

  switch (action.type) {
    case types.GET_DESIGNER_DETAIL:
      return update(state, {
        status: {
          DesignerDetail: { $set: action.DesignerDetail }
        }
      });
    case types.GET_DESIGN_IN_DESIGNER:
      return update(state, {
        status: {
          DesignInDesigner: { $set: action.DesignInDesigner },
          DesignInDesignerAdded: { $push: action.DesignInDesigner }
        }
      });
    case types.GET_DESIGN_IN_DESIGNER_CLEAR:
      return update(state, {
        status: {
          DesignInDesigner: { $set: action.DesignInDesigner },
          DesignInDesignerAdded: { $set: action.DesignInDesigner }
        }
      });
    case types.GET_LIKE_IN_DESIGNER:
      return update(state, {
        status: {
          LikeInDesigner: { $set: action.LikeInDesigner },
          LikeInDesignerAdded: { $push: action.LikeInDesigner }
        }
      });
    case types.GET_LIKE_IN_DESIGNER_CLEAR:
      return update(state, {
        status: {
          LikeInDesigner: { $set: action.LikeInDesigner },
          LikeInDesignerAdded: { $set: action.LikeInDesigner }
        }
      });
    default:
      return state;
  }
};
