import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  GroupDetail: {
    status: "INIT"
  },
  status: {
    GroupDetail: [],
    Count: { 
      like: 0,
      design: 0, 
      group: 0 
    },
    DesignInGroup: [],
    GroupInGroup: [],
    DesignInGroupAdded: [],
    GroupInGroupAdded: [],
  }
};

export function GroupDetail(state, action) {
  if (typeof state === "undefined")
    state = initialState;

  switch (action.type) {
    case types.GET_GROUP_DETAIL:
      return update(state, {
        status: {
          GroupDetail: { $set: action.GroupDetail }
        }
      });
    case types.GET_GROUP_COUNT:
      return update(state, {
        status: {
          Count: { $set: action.Count }
        }
      });
    case types.GET_DESIGN_IN_GROUP:
      return update(state, {
        status: {
          DesignInGroup: { $set: action.DesignInGroup },
          DesignInGroupAdded: { $push: action.DesignInGroup }
        }
      });
    case types.GET_DESIGN_IN_GROUP_CLEAR:
      return update(state, {
        status: {
          DesignInGroup: { $set: action.DesignInGroup },
          DesignInGroupAdded: { $set: action.DesignInGroup }
        }
      });
    case types.DESIGN_IN_GROUP_FAIL:
      return update(state, {
        status: {
          DesignInGroup: { $set: action.DesignInGroup },
          DesignInGroupAdded: { $set: action.DesignInGroupAdded }
        }
      });
    case types.GET_GROUP_IN_GROUP:
      return update(state, {
        status: {
          GroupInGroup: { $set: action.GroupInGroup },
          GroupInGroupAdded: { $push: action.GroupInGroup }
        }
      });
    case types.GET_GROUP_IN_GROUP_CLEAR:
      return update(state, {
        status: {
          GroupInGroup: { $set: action.GroupInGroup },
          GroupInGroupAdded: { $set: action.GroupInGroup }
        }
      });
    case types.GROUP_IN_GROUP_FAIL:
      return update(state, {
        status: {
          GroupInGroup: { $set: action.GroupInGroup },
          GroupInGroupAdded: { $set: action.GroupInGroupAdded }
        }
      });
    default:
      return state;
  }
};
