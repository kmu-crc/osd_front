import * as types from "actions/ActionTypes";
import host from "config";

export const CreateDesignIssueRequest = (data, design_id, token) => {
  return (dispatch) => {
    dispatch(CreateIssue());
    console.log("request", data);
    return fetch(`${host}/design/designDetail/${design_id}/createIssue`, { 
      headers: {
        "x-access-token": token, 
        "Content-Type": "application/json" 
      }, 
      method: "POST", 
      body: JSON.stringify(data) 
    }).then(function (res) {
        return res.json();
    }).then(function (res) {
      return dispatch(CreateIssueSuccess(res));
    }).catch((error) => {
      console.log("insert issue err", error);
      return dispatch(CreateIssueFailure(error));
    });
  };
};

export const CreateIssue = () => {
  return {
    type: types.CREATE_ISSUE
  };
};

export const CreateIssueSuccess = (res) => {
  return {
    type: types.CREATE_ISSUE_SUCCESS,
    success: res.success
  };
};

export const CreateIssueFailure = (error) => {
  return {
    type: types.CREATE_ISSUE_FAILURE,
    success: error.success,
  };
};