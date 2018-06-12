import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  MyList: {
    status: "INIT"
  },
  status: {
    MyDesignList: [],
    MyGroupList: []
  }
};

export function MyList(state, action) {
  if (typeof state === "undefined")
    state = initialState;

  switch (action.type) {
    case types.GET_MY_DESIGN_LIST:
      return update(state, {
        MyList: {
          status: { $set: "WATTING" }
        }
      });
    case types.GET_MY_DESIGN_LIST_SUCCESS:
      return update(state, {
        MyList: {
          status: { $set: "SUCCESS" }
        },
        status: {
          MyDesignList: { $set: action.list },
        }
      });
    case types.GET_MY_DESIGN_LIST_FAILURE:
      return update(state, {
        MyList: {
          status: { $set: "FAILURE" }
        },
        status: {
          MyDesignList: { $set: [] },
        }
      });
    case types.GET_MY_GROUP_LIST:
      return update(state, {
        MyList: {
          status: { $set: "WATTING" }
        }
      });
    case types.GET_MY_GROUP_LIST_SUCCESS:
      return update(state, {
        MyList: {
          status: { $set: "SUCCESS" }
        },
        status: {
          MyGroupList: { $set: action.list },
        }
      });
    case types.GET_MY_GROUP_LIST_FAILURE:
      return update(state, {
        MyList: {
          status: { $set: "FAILURE" }
        },
        status: {
          MyGroupList: { $set: [] },
        }
      });
    default:
      return state;
  }
};
