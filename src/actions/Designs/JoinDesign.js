import * as types from "actions/ActionTypes";
import host from "config";

// 디자인 가입 신청 >>>
export function JoinDesignRequest(id, data, flag, token) {
  return (dispatch) => {
    dispatch(JoinDesign());
    return fetch(`${host}/design/designDetail/${id}/joinDesign/${flag}`, {
      headers: { "Content-Type": "application/json", 'x-access-token': token },
      method: "post",
      body: JSON.stringify(data)
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log("가입신청 >>>", data);
      if (!data) {
        console.log("no data");
      }
      return dispatch(JoinDesignSuccess(data));
    }).catch((error) => {
      console.log("err", error);
      return JoinDesignFailure(error);
    });
  }
}

export function JoinDesign() {
  return {
    type: types.JOIN_DESIGN
  }
};

export function JoinDesignSuccess(data) {
  return {
    type: types.JOIN_DESIGN_SUCCESS,
    data
  }
};

export function JoinDesignFailure() {
  return {
    type: types.JOIN_DESIGN_FAILURE
  }
};

// 디자인 가입 승낙 >>>
export function AcceptDesignRequest(id, memberId, token) {
  return (dispatch) => {
    dispatch(AcceptDesign());
    return fetch(`${host}/Design/designDetail/${id}/acceptDesign/${memberId}`, {
      headers: { "Content-Type": "application/json", 'x-access-token': token },
      method: "post"
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log("가입승낙 >>>", data);
      if (!data) {
        console.log("no data");
      }
      return dispatch(AcceptDesignSuccess(data));
    }).catch((error) => {
      console.log("err", error);
      return AcceptDesignFailure(error);
    });
  }
}

export function AcceptDesign() {
  return {
    type: types.ACCEPT_DESIGN
  }
};

export function AcceptDesignSuccess(data) {
  return {
    type: types.ACCEPT_DESIGN_SUCCESS,
    data
  }
};

export function AcceptDesignFailure() {
  return {
    type: types.ACCEPT_DESIGN_FAILURE
  }
};

// 디자인 탈퇴 >>>
export function GetoutDesignRequest(id, memberId, token, refuse) {
  return (dispatch) => {
    dispatch(GetoutDesign());
    return fetch(`${host}/Design/designDetail/${id}/getoutDesign/${memberId}/${refuse}`, {
      headers: { "Content-Type": "application/json", 'x-access-token': token },
      method: "delete"
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log("디자인 탈퇴 >>>", data);
      if (!data) {
        console.log("no data");
      }
      return dispatch(GetoutDesignSuccess(data));
    }).catch((error) => {
      console.log("err", error);
      return GetoutDesignFailure(error);
    });
  }
}


export function GetoutDesign() {
  return {
    type: types.GETOUT_DESIGN
  }
};

export function GetoutDesignSuccess(data) {
  return {
    type: types.GETOUT_DESIGN_SUCCESS,
    data
  }
};

export function GetoutDesignFailure() {
  return {
    type: types.GETOUT_DESIGN_FAILURE
  }
};

// 디자인에 가입 신청한 멤버 리스트 가져오기
export function DesignWaitingListRequest(id, token) {
  return (dispatch) => {
    dispatch(DesignWaitingList());
    return fetch(`${host}/design/designDetail/${id}/waitingList`, {
      headers: { "Content-Type": "application/json", 'x-access-token': token },
      method: "get"
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log("list >>>", data.data);
      if (!data) {
        console.log("no data");
      }
      return dispatch(DesignWaitingListSuccess(data.data));
    }).catch((error) => {
      console.log("err", error);
      return DesignWaitingListFailure(error);
    });
  }
}

export function DesignWaitingList() {
  return {
    type: types.GET_WAITING_LIST
  }
};

export function DesignWaitingListSuccess(data) {
  return {
    type: types.GET_WAITING_LIST_SUCCESS,
    list: data
  }
};

export function DesignWaitingListFailure() {
  return {
    type: types.GET_WAITING_LIST_FAILURE,
    list: []
  }
};
