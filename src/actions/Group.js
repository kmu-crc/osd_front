import * as types from './ActionTypes';

export function GetGroupListRequest(sort) {
  return (dispatch) => {
    return fetch("http://localhost:8080/group/groupList", { 
      headers: { 'Content-Type': 'application/json' }, 
      method: "get" 
    }).then((response) => {
        return response.json();
      }).then((data) => {
        console.log("group data >>", data);
        if (!data) {
          console.log("no data");
          return;
        } else {
          dispatch(GetGroupList(data))
        }
      }).catch((error) => {
        console.log("err", error);
      })
  }
};

export function GetGroupList(data) {
  return {
      type: types.GET_GROUP_LIST,
      GroupList : data
  }
};

export function GetGroupDetailRequest(id) {
  return (dispatch) => {
    return fetch("http://localhost:8080/group/groupDetail/"+id, { 
      headers: { "Content-Type": "application/json" }, 
      method: "get" 
    }).then((response) => {
        return response.json();
      }).then((data) => {
        console.log("group Detail data >>", data);
        if (!data) {
          console.log("no data");
          return;
        } else {
          dispatch(GetGroupDetail(data));
        }
      }).catch((error) => {
        console.log("err", error);
      })
  }
};

export function GetGroupDetail(data) {
  return {
    type: types.GET_GROUP_DETAIL,
    GroupDetail : data
  }
};
