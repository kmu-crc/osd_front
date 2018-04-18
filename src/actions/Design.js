import * as types from "./ActionTypes";

export function GetDesignListRequest(sort, categoryLevel1, categoryLevel2) {
  return (dispatch) => {
    return fetch("http://localhost:8080/design/designList", { headers: { "Content-Type": "application/json" }, method: "get" })
      .then((response) => {
        return response.json();
      }).then((data) => {
        console.log("data", data);
        dispatch(GetDesignList(data))
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

