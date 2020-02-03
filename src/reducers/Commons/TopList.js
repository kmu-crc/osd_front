import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  ExpertList: { status: "INIT" },
  TopList: { status: "INIT" },
  // TopDesignerList: { status: "INIT" },
  status: {
    ExpertList: [],
    ItemList: [],
    ItemListAdded: [],
  }
};

export function TopList(state, action) {
  if (typeof state === "undefined") {
    state = initialState;
  }
  switch (action.type) {
    case types.GET_TOP_ITEM_LIST_SUCCESS:
      return update(state, {
        TopList: {
          status: { $set: "SUCCESS" }
        },
        status: {
          ItemList: { $set: action.TopList },
          ItemListAdded: { $push: action.TopList }
        }
      });
    case types.GET_TOP_ITEM_LIST_FAILURE:
      return update(state, {
        TopList: {
          status: { $set: "FAILURE" }
        },
        status: {
          ItemList: { $set: action.TopList },
          ItemListAdded: { $set: action.TopList }
        }
      });
    case types.GET_TOP_ITEM_LIST_CLEAR:
      return update(state, {
        TopList: {
          status: { $set: "SUCCESS" }
        },
        status: {
          ItemList: { $set: action.TopList },
          ItemListAdded: { $set: action.TopList }
        }
      });
    case types.GET_TOP_DESIGNER_LIST_SUCCESS:
      return update(state, {
        TopDesignerList: {
          status: { $set: "SUCCESS" }
        },
        status: {
          DesignerList: { $set: action.TopDesignerList }
        }
      });
    case types.GET_TOP_DESIGNER_LIST_FAILURE:
      return update(state, {
        TopDesignerList: {
          status: { $set: "FAILURE" }
        },
        status: {
          DesignerList: { $set: action.TopDesignerList }
        }
      });
    case types.GET_TOP_EXPERT_LIST_SUCCESS:
      return update(state, {
        ExpertList: { status: { $set: "SUCCESS" } },
        status: { ExpertList: { $set: action.ExpertList } }
      });
    case types.GET_TOP_EXPERT_LIST_FAILURE:
      return update(state, {
        ExpertList: { status: { $set: "FAILURE" } },
        status: { ExpertList: { $set: action.ExpertList } }
      });
    default:
      return state;
  }
};
