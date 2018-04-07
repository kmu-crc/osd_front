import * as types from "./ActionTypes";

export function GetDesignerListRequest(sort) {
  return (dispatch) => {
    return fetch("http://localhost:8080/designer/designerList", { 
      headers: { "Content-Type": "application/json" }, 
      method: "get" 
    }).then((response) => {
        return response.json();
      }).then((data) => {
        console.log("Designer data >>", data);
        if (!data) {
          console.log("no data");
          return;
        } else {
          dispatch(GetDesignerList(data));
        }   
      }).catch((error) => {
        console.log("err", error);
      })
  }
};

export function GetDesignerList(data) {
  return {
      type: types.GET_DESIGNER_LIST,
      DesignerList : data
  }
};

export function GetDesignerDetailRequest(id) {
  return (dispatch) => {
    return fetch("http://localhost:8080/designer/designerDetail/"+id, { 
      headers: { "Content-Type": "application/json" }, 
      method: "get" 
    }).then((response) => {
        return response.json();
      }).then((data) => {
        console.log("designer Detail data >>", data);
        if (!data) {
          console.log("no data");
          return;
        } else {
          dispatch(GetDesignerDetail(data));
        }
      }).catch((error) => {
        console.log("err", error);
      })
  }
};

export function GetDesignerDetail(data) {
  return {
    type: types.GET_DESIGNER_DETAIL,
    DesignerDetail : data
  }
};