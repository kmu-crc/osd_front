import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  List: { status: "INIT" },
  status: {
    List: [],ListAdded:[], Total: 0, success: null
  }
};

export const RequestList = (state, action) => {
  if (typeof state === "undefined") {
    state = initialState;
  }

  switch (action.type) {
    case types.GET_REQUEST_LIST:
      return update(state, { status: { List: { $set: action.payload.data.requests }, Total: { $set: action.payload.data.total },ListAdded: { $push: action.payload.data.requests } } });
    case types.REQUEST_LIST_CLEAR:
        return update(state, { status: { List: { $set: action.payload.data.requests },Total: { $set: action.payload.data.total }, ListAdded: { $set: action.payload.data.requests }} });
    case types.REQUEST_LIST_FAIL:
      return update(state, { status: { List: { $set: [] }, ListAdded: []}});

    case types.GET_DESIGNER_REQUEST_LIST:
      return update(state, { status: { List: { $set: action.payload.data.requests }, Total: { $set: action.payload.data.total } } });
    case types.DESIGNER_REQUEST_LIST_FAIL:

      return update(state, { status: { List: { $set: action.List }, } });
    case types.GET_MAKER_REQUEST_LIST:
      return update(state, { status: { List: { $set: action.payload.data.requests }, Total: { $set: action.payload.data.total } } });
    case types.MAKER_REQUEST_LIST_FAIL:
      return update(state, { status: { List: { $set: action.List }, } });

    case types.GET_MY_DESIGNER_REQUEST_LIST:
      return update(state, { status: { List: { $set: action.payload.data.requests }, Total: { $set: action.payload.data.total },ListAdded: { $push: action.payload.data.requests } } });
    case types.MY_DESIGNER_REQUEST_LIST_CLEAR:
        return update(state, { status: { List: { $set: action.payload.data.requests },Total: { $set: action.payload.data.total }, ListAdded: { $set: action.payload.data.requests }} });
    case types.MY_DESIGNER_REQUEST_LIST_FAIL:
      return update(state, { status: { List: { $set: [] }, ListAdded: []}});

    case types.GET_MY_MAKER_REQUEST_LIST:
      return update(state, { status: { List: { $set: action.payload.data.requests }, Total: { $set: action.payload.data.total },ListAdded: { $push: action.payload.data.requests } } });
    case types.MY_MAKER_REQUEST_LIST_CLEAR:
        return update(state, { status: { List: { $set: action.payload.data.requests },Total: { $set: action.payload.data.total }, ListAdded: { $set: action.payload.data.requests }} });
    case types.MY_MAKER_REQUEST_LIST_FAIL:
      return update(state, { status: { List: { $set: [] }, ListAdded: []}});
    // case types.GET_MY_DESIGNER_REQUEST_LIST:
    //   return update(state, { status: { List: { $set: action.payload.data.requests }, Total: { $set: action.payload.data.total } } });
    // case types.MY_DESIGNER_REQUEST_LIST_FAIL:
    //   return update(state, { status: { List: { $set: action.List }, } });

    // case types.GET_MY_MAKER_REQUEST_LIST:
    //   return update(state, { status: { List: { $set: action.payload.data.requests }, Total: { $set: action.payload.data.total } } });
    // case types.MY_MAKER_REQUEST_LIST_FAIL:
    //   return update(state, { status: { List: { $set: action.List }, } });  
    default:
      return state;
  }
};
