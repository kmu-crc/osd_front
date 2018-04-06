import * as types from './ActionTypes';

export function GetDesignListRequest(sort, categoryLevel1, categoryLevel2) {
  return (dispatch) => {
    return fetch("http://localhost:8080/design/designList", { 
      headers: { 'Content-Type': 'application/json' }, 
      method: "get" 
    }).then((response) => {
        return response.json();
      }).then((data) => {
        console.log("design data >>", data);
        if (!data) {
          console.log("no data");
          return;
        } else {
          dispatch(GetDesignList(data));
        }
      }).catch((error) => {
        console.log("err", error);
      })
  }
};

export function GetDesignList(data) {
  return {
      type: types.GET_DESIGN_LIST,
      DesignList : data
  }
};

export function GetDesignDetailRequest(id) {
  return (dispatch) => {
    console.log(id);
    return fetch("http://localhost:8080/design/designDetail/"+id, { 
      headers: { 'Content-Type': 'application/json' }, 
      method: "get" 
    }).then((response) => {
        return response.json();
      }).then((data) => {
        console.log("design Detail data >>", data);
        if (!data) {
          console.log("no data");
          return;
        } else {
          dispatch(GetDesignDetail(data));
        }
      }).catch((error) => {
        console.log("err", error);
      })
  }
};

export function GetDesignDetail(data) {
  return {
    type: types.GET_DESIGN_DETAIL,
    DesignDetail : data
  }
};

