import * as types from "../../actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  MyDetail: {
    status: "INIT"
  },
  status: {
    MyDetail: [],
    MyDesign: [],
    MyGroup: [],
    MyLikeDesign: [],
    MyLikeDesigner: []
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
          MyDesign: { $set: action.MyDesign }
        }
      });
    case types.GET_MY_GROUP:
      return update(state, {
        status: {
          MyGroup: { $set: action.MyGroup }
        }
      });
    case types.GET_MY_LIKE_DESIGN:
      return update(state, {
        status: {
          MyLikeDesign: { $set: action.MyLikeDesign }
        }
      });
    case types.GET_MY_LIKE_DESIGNER:
      return update(state, {
        status: {
          MyLikeDesigner: { $set: action.MyLikeDesigner }
        }
      });
    default:
      return state;
  }
};