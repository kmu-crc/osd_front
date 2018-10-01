import * as types from "actions/ActionTypes";
import host from "config";

// 내 기본 정보 불러오기
export function GetMyDetailRequest(token) {
  return (dispatch) => {
    return fetch(`${host}/users/myPage`, {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token
      },
      method: "get"
    }).then(response => {
      return response.json();
      }).then((data) => {
        console.log("my detail info data >>", data);
        if (!data) {
          console.log("no data");
          data = [];
        }
        return dispatch(GetMyDetail(data));
      }).catch((error) => {
        console.log("err", error);
      });
  }
};

export function GetMyDetail(data) {
  return {
    type: types.GET_MY_DETAIL,
    MyDetail : data
  }
};

// 내 디자인 리스트 불러오기
export function GetMyDesignListRequest(token, page) {
  return (dispatch) => {
    return fetch(`${host}/users/myPage/design/${page}`, {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token
      },
      method: "get"
    }).then(response => {
      return response.json();
      }).then((data) => {
        console.log("my design list data >>", data);
        if (!data) {
          console.log("no data");
          data = [];
        }
        if (page === 0) {
          dispatch(MyDesignListClear(data));
          return;
        }
        dispatch(GetMyDesignList(data));
      }).catch((error) => {
        dispatch(MyDesignListFail());
        console.log("err", error);
      });
  }
};

export function GetMyDesignList(data) {
  return {
    type: types.GET_MY_DESIGN,
    MyDesign: data
  }
};

export function MyDesignListClear(data) {
  return {
    type: types.GET_MY_DESIGN_CLEAR,
    MyDesign: data,
    MyDesignAdded: []
  }
};

export function MyDesignListFail() {
  return {
    type: types.MY_DESIGN_FAIL,
    MyDesign: [],
    MyDesignAdded: []
  }
};

// 내 그룹 리스트 불러오기
export function GetMyGroupListRequest(token, page) {
  return (dispatch) => {
    return fetch(`${host}/users/myPage/group/${page}`, {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token
      },
      method: "get"
    }).then(response => {
      return response.json();
      }).then((data) => {
        console.log("my group list data >>", data);
        if (!data) {
          console.log("no data");
          data = [];
        }
        if (page === 0) {
          dispatch(MyGroupListClear(data));
          return;
        }
        dispatch(GetMyGroupList(data));
      }).catch((error) => {
        dispatch(MyGroupListFail());
        console.log("err", error);
      });
  }
};

export function GetMyGroupList(data) {
  return {
    type: types.GET_MY_GROUP,
    MyGroup: data
  }
};

export function MyGroupListClear(data) {
  return {
    type: types.GET_MY_GROUP_CLEAR,
    MyGroup: data,
    MyGroupAdded: []
  }
};

export function MyGroupListFail() {
  return {
    type: types.MY_GROUP_FAIL,
    MyGroup: [],
    MyGroupAdded: []
  }
};

// 내 좋아요 디자인 불러오기
export function GetMyLikeDesignRequest(token, page) {
  return (dispatch) => {
    return fetch(`${host}/users/myPage/likeDesign/${page}`, {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token
      },
      method: "get"
    }).then(response => {
      return response.json();
      }).then((data) => {
        console.log("my like list data >>", data);
        if (!data) {
          console.log("no data");
          data = [];
        }
        if (page === 0) {
          dispatch(MyLikeDesignClear(data));
          return;
        }
        dispatch(GetMyLikeDesign(data));
      }).catch((error) => {
        dispatch(MyLikeDesignFail());
        console.log("err", error);
      });
  }
};

export function GetMyLikeDesign(data) {
  return {
    type: types.GET_MY_LIKE_DESIGN,
    MyLikeDesign: data
  }
};

export function MyLikeDesignClear(data) {
  return {
    type: types.GET_MY_LIKE_DESIGN_CLEAR,
    MyLikeDesign: data,
    MyLikeDesignAdded: []
  }
};

export function MyLikeDesignFail() {
  return {
    type: types.MY_LIKE_DESIGN_FAIL,
    MyLikeDesign: [],
    MyLikeDesignAdded: []
  }
};

// 내 좋아요 디자이너 불러오기
export function GetMyLikeDesignerRequest(token, page) {
  return (dispatch) => {
    return fetch(`${host}/users/myPage/likeDesigner/${page}`, {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token
      },
      method: "get"
    }).then(response => {
      return response.json();
      }).then((data) => {
        console.log("my like list data >>", data);
        if (!data) {
          console.log("no data");
          data = [];
        }
        if (page === 0) {
          dispatch(MyLikeDesignerClear(data));
          return;
        }
        dispatch(GetMyLikeDesigner(data));
      }).catch((error) => {
        dispatch(MyLikeDesignerFail());
        console.log("err", error);
      });
  }
};

export function GetMyLikeDesigner(data) {
  return {
    type: types.GET_MY_LIKE_DESIGNER,
    MyLikeDesigner: data
  }
};

export function MyLikeDesignerClear(data) {
  return {
    type: types.GET_MY_LIKE_DESIGNER_CLEAR,
    MyLikeDesigner: data,
    MyLikeDesigneRAdded: []
  }
};

export function MyLikeDesignerFail() {
  return {
    type: types.MY_LIKE_DESIGNER_FAIL,
    MyLikeDesigner: [],
    MyLikeDesigneRAdded: []
  }
};

// 내가 받은 초대 리스트 가져오기
export function GetMyInvitedListRequest(token) {
  return (dispatch) => {
    dispatch(GetMyInvitedList());
    return fetch(`${host}/users/myPage/invited`, {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token
      },
      method: "get"
    }).then(response => {
      return response.json();
      }).then((data) => {
        console.log("my invited list data >>", data);
        if (!data) {
          console.log("no data");
          data = [];
        }
        dispatch(GetMyInvitedListSuccess(data));
      }).catch((error) => {
        dispatch(GetMyInvitedListFailure());
        console.log("err", error);
      });
  }
};

export function GetMyInvitedList() {
  return {
    type: types.GET_MY_INVITED_LIST
  }
};

export function GetMyInvitedListSuccess(data) {
  return {
    type: types.GET_MY_INVITED_LIST_SUCCESS,
    list: data
  }
};

export function GetMyInvitedListFailure() {
  return {
    type: types.GET_MY_INVITED_LIST_FAILURE,
    list: []
  }
};

// 내가 보낸 가입 신청 리스트 가져오기
export function GetMyInvitingListRequest(token) {
  return (dispatch) => {
    dispatch(GetMyInvitingList());
    return fetch(`${host}/users/myPage/inviting`, {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token
      },
      method: "get"
    }).then(response => {
      return response.json();
      }).then((data) => {
        console.log("my inviting list data >>", data);
        if (!data) {
          console.log("no data");
          data = [];
        }
        dispatch(GetMyInvitingListSuccess(data));
      }).catch((error) => {
        dispatch(GetMyInvitingListFailure());
        console.log("err", error);
      });
  }
};

export function GetMyInvitingList() {
  return {
    type: types.GET_MY_INVITING_LIST
  }
};

export function GetMyInvitingListSuccess(data) {
  return {
    type: types.GET_MY_INVITING_LIST_SUCCESS,
    list: data
  }
};

export function GetMyInvitingListFailure() {
  return {
    type: types.GET_MY_INVITING_LIST_FAILURE,
    list: []
  }
};

