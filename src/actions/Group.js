import * as types from 'actions/ActionTypes';

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
          data = [];
        }
        dispatch(GetGroupList(data));
      }).catch((error) => {
        console.log("err", error);
      });
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
          data = [];
        }
        dispatch(GetGroupDetail(data));
      }).catch((error) => {
        console.log("err", error);
      });
  }
};

export function GetGroupDetail(data) {
  return {
    type: types.GET_GROUP_DETAIL,
    GroupDetail : data
  }
};

// 그룹 안에 속한 디자인 리스트 가져오기
export function GetDesignInGroupRequest(id, sort) {
  return (dispatch) => {
    return fetch("http://localhost:8080/group/groupDetail/"+id+"/design/"+sort, {
      headers: { "Content-Type": "application/json" },
      method: "get"
    }).then((response) => {
        return response.json();
      }).then((data) => {
        console.log("design in group data >>", data);
        if (!data) {
          console.log("no data");
          data = [];
        }
        dispatch(GetDesignInGroup(data));
      }).catch((error) => {
        console.log("err", error);
      });
  }
};

export function GetDesignInGroup(data) {
  return {
    type: types.GET_DESIGN_IN_GROUP,
    DesignInGroup : data
  }
};

// 그룹 안에 속한 그룹 리스트 가져오기
export function GetGroupInGroupRequest(id, sort) {
  return (dispatch) => {
    return fetch("http://localhost:8080/group/groupDetail/"+id+"/group/"+sort, {
      headers: { "Content-Type": "application/json" },
      method: "get"
    }).then((response) => {
        return response.json();
      }).then((data) => {
        console.log("group in group data >>", data);
        if (!data) {
          console.log("no data");
          data = [];
        }
        dispatch(GetGroupInGroup(data));
      }).catch((error) => {
        console.log("err", error);
      });
  }
};

export function GetGroupInGroup(data) {
  return {
    type: types.GET_GROUP_IN_GROUP,
    GroupInGroup : data
  }
};

export function CreateNewGroupRequest(data) {
  return (dispatch) => {
    dispatch(CreateNewGroup());
    return fetch("http://localhost:8080/group/createGroup", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(data)
    }).then((response) => {
      return response.json();
    }).catch((error) => {
      dispatch(CreateGroupFailure());
      console.log(error);
    })
  }
};

export function CreateNewGroup() {
  return {
    type: types.CREATE_NEW_GROUP
  }
};

export function CreateGroupFailure() {
  return {
    type: types.CREATE_GROUP_FAILURE
  }
};
