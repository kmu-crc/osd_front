import * as types from "../../actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  MyDetail: {
    status: "INIT"
  },
  status: {
    MyDetail: [],
    MyDesign: [],
    MyDesignAdded: [],
    MyGroup: [],
    MyGroupAdded: [],
    MyLikeDesign: [],
    MyLikeDesignAdded: [],
    MyLikeDesigner: [],
    MyLikeDesignerAdded: []
  }
};

export function MyDetail(state, action) {
  if (typeof state === "undefined")
    state = initialState;

  switch (action.type) {
    case types.GET_MY_DETAIL:
      return update(state, {
        status: {
          MyDetail: { $set: action.MyDetail }
        }
      });
    case types.GET_MY_DESIGN:
      return update(state, {
        status: {
          MyDesign: { $set: action.MyDesign },
          MyDesignAdded: { $push: action.MyDesign }
        }
      });
    case types.GET_MY_DESIGN_CLEAR:
      return update(state, {
        status: {
          MyDesign: { $set: action.MyDesign },
          MyDesignAdded: { $set: action.MyDesign }
        }
      });
    case types.MY_DESIGN_FAIL:
      return update(state, {
        status: {
          MyDesign: { $set: action.MyDesign },
          MyDesignAdded: { $set: action.MyDesignAdded }
        }
      });
    case types.GET_MY_GROUP:
      return update(state, {
        status: {
          MyGroup: { $set: action.MyGroup },
          MyGroupAdded: { $push: action.MyGroup }
        }
      });
    case types.GET_MY_GROUP_CLEAR:
      return update(state, {
        status: {
          MyGroup: { $set: action.MyGroup },
          MyGroupAdded: { $set: action.MyGroup }
        }
      });
    case types.MY_GROUP_FAIL:
      return update(state, {
        status: {
          MyGroup: { $set: action.MyGroup },
          MyGroupAdded: { $set: action.MyGroupAdded }
        }
      });
    case types.GET_MY_LIKE_DESIGN:
      return update(state, {
        status: {
          MyLikeDesign: { $set: action.MyLikeDesign },
          MyLikeDesignAdded: { $push: action.MyLikeDesign }
        }
      });
    case types.GET_MY_LIKE_DESIGN_CLEAR:
      return update(state, {
        status: {
          MyLikeDesign: { $set: action.MyLikeDesign },
          MyLikeDesignAdded: { $set: action.MyLikeDesign }
        }
      });
    case types.MY_LIKE_DESIGN_FAIL:
      return update(state, {
        status: {
          MyLikeDesign: { $set: action.MyLikeDesign },
          MyLikeDesignAdded: { $set: action.MyLikeDesignAdded }
        }
      });
    case types.GET_MY_LIKE_DESIGNER:
      return update(state, {
        status: {
          MyLikeDesigner: { $set: action.MyLikeDesigner },
          MyLikeDesignerAdded: { $push: action.MyLikeDesigner }
        }
      });
    case types.GET_MY_LIKE_DESIGNER_CLEAR:
      return update(state, {
        status: {
          MyLikeDesigner: { $set: action.MyLikeDesigner },
          MyLikeDesignerAdded: { $set: action.MyLikeDesigner }
        }
      });
    case types.MY_LIKE_DESIGNER_FAIL:
      return update(state, {
        status: {
          MyLikeDesigner: { $set: action.MyLikeDesigner },
          MyLikeDesignerAdded: { $set: action.MyLikeDesignerAdded }
        }
      });
    default:
      return state;
  }
};