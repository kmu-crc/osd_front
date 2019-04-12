import * as types from "actions/ActionTypes";
import host from "config";

export function ForkDesignRequest(design_id, user_id, token) {
  return (dispatch) => {
    dispatch(ForkDesign())
    return fetch(`${host}/design/forkDesign/${design_id}/${user_id}`, {
      headers: { "Content-Type": "application/json", 'x-access-token': token },
      method: "get"
    }).then((response) => {
      return response.json()
    }).then((data) => {
      if(data.success){
        return dispatch(ForkDesignSuccess(data.new_design_id))
        // return ForkDesignFailure(data)
      }
      dispatch(ForkDesignFailure())
    }).catch((error) => {
      console.log("err", error)
      return ForkDesignFailure()
    })
  }
}

export function ForkDesign() {
  return {
    type: types.FORK_DESIGN
  }
}

export function ForkDesignSuccess(new_design_id) {
  return {
    type: types.FORK_DESIGN_SUCCESS, new_design_id
  }
}

export function ForkDesignFailure() {
  return {
    type: types.FORK_DESIGN_FAILURE
  }
}
