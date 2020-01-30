import * as types from "actions/ActionTypes";
import host from "config";

export function CheckConnectedResponse(token, checkData, id) {
  console.log(JSON.stringify(checkData));
  return (dispatch) => {
    //dispatch(CheckConnected());
    return fetch(`${host}/users/checkOpponent/${id}`, {
      headers:{
        "Content-Type": "application/json",
        "x-access-token": token
      },
      method:"post",
      body:JSON.stringify(checkData),
    })
    .then(()=>{
      console.log("success");
    })
  }
}

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
        //console.log("message list data >>", data);
        if (!data) {
          console.log("no message");
          data = [];
        }
        return dispatch(GetMyMsgListSuccess(data));
      }).catch((error) => {
        dispatch(GetMyMsgListFailure());
        console.log("err", error);
      });
  }
};

export function CheckConnected(){
  return {
    type: types.CHECK_CONNECTED
  }
}

export function GetMyMsgList() {
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
  };
};

export function GetMyMsgDetailRequest(token, id) {
  return (dispatch) => {
    dispatch(GetMyMsgDetail());
    return fetch(`${host}/users/msgDetail/${id}`, {
      headers: { 
        "Content-Type": "application/json",
        "x-access-token": token
      },
      method: "get"
    }).then((response) => {
        return response.json();
      }).then((data) => {
        //console.log("message detail data >>", data);
        if (!data) {
          console.log("no detail message");
          data = [];
        }
        return dispatch(GetMyMsgDetailSuccess(data));
      }).catch((error) => {
        dispatch(GetMyMsgDetailFailure());
        console.log("err", error);
      });
  }
};

export function GetMyMsgDetail() {
  return {
    type: types.GET_MY_MSG_DETAIL
  };
};

export function GetMyMsgDetailSuccess(data) {
  return {
    type: types.GET_MY_MSG_DETAIL_SUCCESS,
    MsgDetail: data
  };
};

export function GetMyMsgDetailFailure() {
  return {
    type: types.GET_MY_MSG_DETAIL_FAILURE
  };
};

export function GetMyMessageDetailClear() {
  return {
    type: types.GET_MY_MSG_DETAIL_CLEAR,
    MsgDetail: []
  };
};

export function SendMessageRequest(token, data,id) {
  return (dispatch) => {
    dispatch(SendMessage());
    return fetch(`${host}/users/sendMsg/${id}`, {
      headers: { 
        "Content-Type": "application/json",
        "x-access-token": token
      },
      method: "post",
      body: JSON.stringify(data)
      //body: JSON.stringify(data),
    }).then((response) => {
        return response.json();
      }).then((data) => {
        console.log("message sending >>", data);
        if (!data) {
          console.log("no detail message");
          data = [];
        }
        return dispatch(SendMessageSuccess(data));
      }).catch((error) => {
        console.log("err", error);
        return dispatch(SendMessageFailure());
      });
  };
};

export function SendMessage() {
  return {
    type: types.SEND_MESSAGE
  };
};

export function SendMessageSuccess(data) {
  return {
    type: types.SEND_MESSAGE_SUCCESS,
    data
  };
};

export function SendMessageFailure() {
  return {
    type: types.SEND_MESSAGE_FAILURE
  };
};