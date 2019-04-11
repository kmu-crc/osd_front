import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  DesignForked: {
    status: "INIT"
  },
  status: {
    DesignForked: [], new_design_id: null, Message: ""
  }
}

export function DesignForked(state, action) {
  if (typeof state === "undefined")
    state = initialState;

  switch (action.type) {
    case types.FORK_DESIGN:
      return update(state, {
        status: { DesignForked: { $set: "WAIT_FORK"}}
      })
    case types.FORK_DESIGN_SUCCESS:
      return update(state, {
        status: {
          DesignForked: { $set: "SUCCESS_FORK"}, 
          new_design_id: { $set: action.new_design_id},
          Message: { $set: action.message } 
        }
      })
    case types.FORK_DESIGN_FAILURE:
      return update(state, {
        status: { DesignForked: { $set: "FAILURE_FORK"}}
      })
    default: return state;
  }
}
