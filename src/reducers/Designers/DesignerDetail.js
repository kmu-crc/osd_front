import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  DesignerDetail: {
    status: "INIT"
  },
  status: {
    DesignerDetail: [],
    Count: { 
      total_like: 0, 
      total_design: 0, 
      total_group: 0,
      total_view: 0
    },
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
    case types.GET_DESIGNER_COUNT:
      return update(state, {
        status: {
          Count: { $set: action.Count }
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
    case types.DESIGN_IN_DESIGNER_FAIL:
      return update(state, {
        status: {
          DesignInDesigner: { $set: action.DesignInDesigner },
          DesignInDesignerAdded: { $set: action.DesignInDesignerAdded }
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
    case types.LIKE_IN_DESIGNER_FAIL:
      return update(state, {
        status: {
          LikeInDesigner: { $set: action.LikeInDesigner },
          LikeInDesignerAdded: { $set: action.LikeInDesignerAdded }
        }
      });
    default:
      return state;
  }
};
