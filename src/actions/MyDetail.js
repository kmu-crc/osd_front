import * as types from "./ActionTypes";

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