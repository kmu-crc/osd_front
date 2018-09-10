import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  MyExistList: {
    status: "INIT"
  },
  status: {
    MyExistDesignList: [],
    MyExistGroupList: []
  }
};

export function MyExistList(state, action) {
  if (typeof state === "undefined")
    state = initialState;

  switch (action.type) {
    case types.GET_MY_EXIST_DESIGN_LIST:
      return update(state, {
        MyExistList: {
          status: { $set: "WATTING" }
        }
      });
    case types.GET_MY_EXIST_DESIGN_LIST_SUCCESS:
      return update(state, {
        MyExistList: {
          status: { $set: "SUCCESS" }
        },
        status: {
          MyExistDesignList: { $set: action.list },
        }
      });
    case types.GET_MY_EXIST_DESIGN_LIST_FAILURE:
      return update(state, {
        MyExistList: {
          status: { $set: "FAILURE" }
        },
        status: {
          MyExistDesignList: { $set: [] },
        }
      });
    case types.GET_MY_EXIST_GROUP_LIST:
      return update(state, {
        MyExistList: {
          status: { $set: "WATTING" }
        }
      });
    case types.GET_MY_EXIST_GROUP_LIST_SUCCESS:
      return update(state, {
        MyExistList: {
          status: { $set: "SUCCESS" }
        },
        status: {
          MyExistGroupList: { $set: action.list },
        }
      });
    case types.GET_MY_EXIST_GROUP_LIST_FAILURE:
      return update(state, {
        MyExistList: {
          status: { $set: "FAILURE" }
        },
        status: {
          MyExistGroupList: { $set: [] },
        }
      });
    default:
      return state;
  }
};
