import * as types from "./ActionTypes";
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
        dispatch(GetMyDetail(data));
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
export function GetMyDesignListRequest(token) {
  return (dispatch) => {
    return fetch(`${host}/users/myPage/design`, {
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
        dispatch(GetMyDesignList(data));
      }).catch((error) => {
        console.log("err", error);
      });
  }
};

export function GetMyDesignList(data) {
  return {
    type: types.GET_MY_DESIGN,
    MyDesign : data
  }
};

// 내 그룹 리스트 불러오기
export function GetMyGroupListRequest(token) {
  return (dispatch) => {
    return fetch(`${host}/users/myPage/group`, {
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
        dispatch(GetMyGroupList(data));
      }).catch((error) => {
        console.log("err", error);
      });
  }
};

export function GetMyGroupList(data) {
  return {
    type: types.GET_MY_GROUP,
    MyGroup : data
  }
};

// 내 좋아요 디자인 불러오기
export function GetMyLikeDesignRequest(token) {
  return (dispatch) => {
    return fetch(`${host}/users/myPage/likeDesign`, {
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
        dispatch(GetMyLikeDesign(data));
      }).catch((error) => {
        console.log("err", error);
      });
  }
};

export function GetMyLikeDesign(data) {
  return {
    type: types.GET_MY_LIKE_DESIGN,
    MyLikeDesign : data
  }
};

// 내 좋아요 디자이너 불러오기
export function GetMyLikeDesignerRequest(token) {
  return (dispatch) => {
    return fetch(`${host}/users/myPage/likeDesigner`, {
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
        dispatch(GetMyLikeDesigner(data));
      }).catch((error) => {
        console.log("err", error);
      });
  }
};

export function GetMyLikeDesigner(data) {
  return {
    type: types.GET_MY_LIKE_DESIGNER,
    MyLikeDesigner : data
  }
};

