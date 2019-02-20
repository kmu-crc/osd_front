import * as types from "actions/ActionTypes";
import host from "config";

export const UpdateDesignTime= (id, token) => {
  return dispatch => {
    dispatch(UpdateDesignInfo());
    return fetch(`${host}/design/updateDesignTime/${id}`, {
      headers: { "x-access-token": token, "Content-Type": "application/json" },
      method: "POST"
    })
      .then(function(res) {
        return res.json();
      })
      .then(function(res) {
        console.log("update designTIME", res);
        return dispatch(UpdateDesignInfoSuccess(res));
      })
      .catch(err=> {
        console.log("time update err", err);
        return dispatch(UpdateDesignInfoFailure(err));
      });
  };
};


export const UpdateDesignInfoRequest = (data, id, token) => {
  return dispatch => {
    dispatch(UpdateDesignInfo());
    return fetch(`${host}/design/updateDesignInfo/${id}`, {
      headers: { "x-access-token": token, "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(function(res) {
        return res.json();
      })
      .then(function(res) {
        console.log("update design", res);
        return dispatch(UpdateDesignInfoSuccess(res));
      })
      .catch(error => {
        console.log("insert detail err", error);
        return dispatch(UpdateDesignInfoFailure(error));
      });
  };
};

export const UpdateDesignInfo = () => {
  return {
    type: types.UPDATE_DESIGN_INFO
  };
};

export const UpdateDesignInfoSuccess = res => {
  return {
    type: types.UPDATE_DESIGN_INFO_SUCCESS,
    res
  };
};

export const UpdateDesignInfoFailure = error => {
  return {
    type: types.UPDATE_DESIGN_INFO_FAILURE,
    data: error
  };
};
