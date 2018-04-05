import * as types from './ActionTypes';

export function GetDesignerListRequest(sort) {
  return (dispatch) => {
    return fetch("http://localhost:8080/designer/designerList", { 
      headers: { 'Content-Type': 'application/json' }, 
      method: "get" 
    }).then((response) => {
        return response.json();
      }).then((data) => {
        console.log("Designer data >>", data);
        dispatch(GetDesignerList(data))
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