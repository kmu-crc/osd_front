import * as types from "./ActionTypes";

// 내 기본 정보 불러오기
export function GetMyDetailRequest(token) {
  return (dispatch) => {
    return fetch("http://localhost:8080/users/myPage", {
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
export function GetMyDesignListRequest(token, type, sort) {
  return (dispatch) => {
    return fetch("http://localhost:8080/users/myPage/"+type+"/"+sort, {
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
export function GetMyGroupListRequest(token, type, sort) {
  return (dispatch) => {
    return fetch("http://localhost:8080/users/myPage/"+type+"/"+sort, {
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

// 내 좋아요 컨텐츠 불러오기 -> type에 design, group, designer를 받아옴
export function GetMyLikeListRequest(token, type, sort) {
  return (dispatch) => {
    return fetch("http://localhost:8080/users/myPage/like/"+type+"/"+sort, {
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
        dispatch(GetMyGroupList(data));
      }).catch((error) => {
        console.log("err", error);
      });
  }
};

export function GetMyLikeList(data) {
  return {
    type: types.GET_MY_LIKE,
    MyLike : data
  }
};

