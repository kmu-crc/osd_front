import * as types from "actions/ActionTypes";
import host from "config";

export function GetMyMsgListRequest(token) {
  return (dispatch) => {
    dispatch(GetMyMsgList());
    return fetch(`${host}/users/msgList`, {
      headers: { 
        "Content-Type": "application/json",
        "x-access-token": token 
      },
      method: "get"
    }).then((response) => {
        return response.json();
      }).then((data) => {
        console.log("message list data >>", data);
        if (!data) {
          console.log("no message");
          data = [];
        }
        dispatch(GetMyMsgListSuccess(data));
      }).catch((error) => {
        dispatch(GetMyMsgListFailure());
        console.log("err", error);
      });
  }
};

export function GetMyMsgList(data) {
  return {
    type: types.GET_MY_MSG_LIST
  };
};

export function GetMyMsgListSuccess(data) {
  return {
    type: types.GET_MY_MSG_LIST_SUCCESS,
    MsgList: data
  };
};

export function GetMyMsgListFailure() {
  return {
    type: types.GET_MY_MSG_LIST_FAILURE
  }
}