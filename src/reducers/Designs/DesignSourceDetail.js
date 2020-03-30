// import * as types from "actions/ActionTypes";
// import update from "react-addons-update";

const initialState = {
  DesignSourceDetail: {
    status: "INIT"
  },
  DesignSourceEdit: {
    status: "INIT"
  },
  status: {
    content: []
  }
};

export function DesignSourceDetail(state, action) {
  if (typeof state === "undefined") state = initialState;

  switch (action.type) {
    // case types.UPDATE_DESIGN_SOURCE:
    //   return update(state, {
    //     DesignSourceEdit: {
    //       status: { $set: "WATTING" }
    //     }
    //   });
    // case types.UPDATE_DESIGN_SOURCE_SUCCESS:
    //   return update(state, {
    //     DesignSourceEdit: {
    //       status: { $set: "SUCCESS" }
    //     }
    //   });
    // case types.UPDATE_DESIGN_SOURCE_FAILURE:
    //   return update(state, {
    //     DesignSourceEdit: {
    //       status: { $set: "FAILURE" }
    //     }
    //   });
    // case types.GET_DESIGN_SOURCE:
    //   return update(state, {
    //     DesignSourceDetail: {
    //       status: { $set: "WATTING" }
    //     }
    //   });
    // case types.GET_DESIGN_SOURCE_SUCCESS:
    //   return update(state, {
    //     DesignSourceDetail: {
    //       status: { $set: "SUCCESS" }
    //     },
    //     status: {
    //       content: { $set: action.data }
    //     }
    //   });
    // case types.GET_DESIGN_SOURCE_FAILURE:
    //   return update(state, {
    //     DesignSourceDetail: {
    //       status: { $set: "FAILURE" }
    //     },
    //     status: {
    //       content: { $set: [] }
    //     }
    //   });
    default:
      return state;
  }
}
