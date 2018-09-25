import * as types from "actions/ActionTypes";
import host from "config";

// 디자인 가입 신청 >>>
export function JoinDesignRequest(id, token) {
  return (dispatch) => {
    dispatch(JoinDesign());
    return fetch(`${host}/design/designDetail/${id}/joinDesign`, {
      headers: { "Content-Type": "application/json", 'x-access-token': token },
      method: "post"
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
export function AcceptDesignRequest(id, token) {
  return (dispatch) => {
    dispatch(AcceptDesign());
    return fetch(`${host}/Design/designDetail/${id}/acceptDesign`, {
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
export function GetoutDesignRequest(id, token) {
  return (dispatch) => {
    dispatch(GetoutDesign());
    return fetch(`${host}/Design/designDetail/${id}/getoutDesign`, {
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
