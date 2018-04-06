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
