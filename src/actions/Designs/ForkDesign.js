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

export function ForkDesignListRequest(design_id, token) {
  return (dispatch) => {
    dispatch(ForkDesignList())
    return fetch(`${host}/design/forkDesignList/${design_id}`, {
      headers: { "Content-Type": "application/json"}, method: "post"
    }).then((response) => {
      return response.json()
    }).then((data) => {
      if(data.success){
        // console.log("DATA", data)
        return dispatch(ForkDesignListSuccess(data.list))
      }
      return dispatch(ForkDesignListFailure())
    }).catch((error) => {
      console.log("err", error)
      return dispatch(ForkDesignListFailure())
    })
  }
}

export function ForkDesignList() {
  return {
    type: types.FORK_DESIGN_LIST
  }
}

export function ForkDesignListSuccess(list) {
  return {
    type: types.FORK_DESIGN_LIST_SUCCESS, list 
  }
}

export function ForkDesignListFailure() {
  return {
    type: types.FORK_DESIGN_LIST_FAILURE
  }
}
