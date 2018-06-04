import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  GroupDetail: {
    status: "INIT"
  },
  status: {
    GroupDetail: [],
    DesignInGroup: [],
    GroupInGroup: [],
    DesignInGroupAdded: [],
    GroupInGroupAdded: []
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
      })
    default:
      return state;
  }
};
