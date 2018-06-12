import * as types from 'actions/ActionTypes';
import host from "config";

export function GetGroupListRequest(page, sort) {
  return (dispatch) => {
    return fetch(`${host}/group/groupList/`+page+"/"+sort, {
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
        if (page === 0) {
          dispatch(GroupListClear(data));
          return;
        }
        dispatch(GetGroupList(data));
      }).catch((error) => {
        dispatch(GroupListFail());
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

export function GroupListClear(data) {
  return {
    type: types.GROUP_LIST_CLEAR,
    GroupList: data,
    GroupListAdded: []
  }
}

export function GroupListFail() {
  return {
    type: types.GROUP_LIST_FAIL,
    GroupList: [],
    GroupListAdded: []
  }
}

export function GetGroupDetailRequest(id) {
  return (dispatch) => {
    return fetch(`${host}/group/groupDetail/`+id, {
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
export function GetDesignInGroupRequest(id, page, sort) {
  return (dispatch) => {
    return fetch(`${host}/group/groupDetail/`+id+"/design/"+page+"/"+sort, {
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
        if (page === 0) {
          dispatch(DesignInGroupClear(data));
          return;
        }
        dispatch(GetDesignInGroup(data));
      }).catch((error) => {
        dispatch(DesignInGroupFail());
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

export function DesignInGroupClear(data) {
  return {
    type: types.GET_DESIGN_IN_GROUP_CLEAR,
    DesignInGroup: data,
    DesignInGroupAdded: []
  }
};

export function DesignInGroupFail() {
  return {
    type: types.DESIGN_IN_GROUP_FAIL,
    DesignInGroup: [],
    DesignInGroupAdded: []
  }
};

// 그룹 안에 속한 그룹 리스트 가져오기
export function GetGroupInGroupRequest(id, page, sort) {
  return (dispatch) => {
    return fetch(`${host}/group/groupDetail/`+id+"/group/"+page+"/"+sort, {
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
        if (page === 0) {
          dispatch(GroupInGroupClear(data));
          return;
        }
        dispatch(GetGroupInGroup(data));
      }).catch((error) => {
        dispatch(GroupInGroupFail());
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

export function GroupInGroupClear(data) {
  return {
    type: types.GET_GROUP_IN_GROUP_CLEAR,
    GroupInGroup: data,
    GroupInGroupAdded: []
  }
};

export function GroupInGroupFail() {
  return {
    type: types.GROUP_IN_GROUP_FAIL,
    GroupInGroup: [],
    GroupInGroupAdded: []
  }
};

export function CreateNewGroupRequest(data) {
  return (dispatch) => {
    dispatch(CreateNewGroup());
    return fetch(`${host}/group/createGroup`, {
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

// 그룹에 가입 신청중인 디자인 가져오기
export function GetWaitingDesignRequest(id) {
  return (dispatch) => {
    return fetch(`${host}/group/groupDetail/${id}/waitingDesign`, {
      headers: { "Content-Type": "application/json" },
      method: "get"
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log("waiting design list is >>", data);
      if (!data) {
        console.log("no data");
        data = [];
      }
      dispatch(GetWaitingDesign(data));
    }).catch((error) => {
      dispatch(GetWaitingDataFail());
      console.log("err", error);
    });
  }
};

export function GetWaitingDesign(data) {
  return {
    type: types.GET_WAITING_DESIGN,
    waitingDesign: data
  }
};

// 그룹에 가입 신청중인 그룹 가져오기
export function GetWaitingGroupRequest(id) {
  return (dispatch) => {
    return fetch(`${host}/group/groupDetail/${id}/waitingGroup`, {
      headers: { "Content-Type": "application/json" },
      method: "get"
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log("waiting group list is >>", data);
      if (!data) {
        console.log("no data");
        data = [];
      }
      dispatch(GetWaitingGroup(data));
    }).catch((error) => {
      dispatch(GetWaitingDataFail());
      console.log("err", error);
    });
  }
};

export function GetWaitingGroup(data) {
  return {
    type: types.GET_WAITING_GROUP,
    waitingGroup: data
  }
};

export function GetWaitingDataFail() {
  return {
    type: types.GET_WAITING_DATA_FAIL,
    waitingDesign: [],
    waitingGroup: []
  }
};

// 그룹에 가입한 & 신청한 디자인 삭제하기
export function DeleteDesignInGroupRequest(id, designid) {
  return (dispatch) => {
    return fetch(`${host}/group/groupDetail/${id}/deleteDesign/${designid}`, {
      headers: { "Content-Type": "application/json" },
      method: "delete"
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log("result >>", data);
      dispatch(DeleteDesignInGroupSuccess());
    }).catch((error) => {
      dispatch(DeleteDesignInGroupFail());
      console.log("err", error);
    });
  }
};

export function DeleteDesignInGroupSuccess(){
  return {
    type: types.DELETE_DESIGN_IN_GROUP_SUCCESS
  }
};

export function DeleteDesignInGroupFail(){
  return {
    type: types.DELETE_DESIGN_IN_GROUP_FAIL
  }
};

// 그룹에 가입한 & 신청한 그룹 삭제하기
export function DeleteGroupInGroupRequest(id, groupid) {
  return (dispatch) => {
    return fetch(`${host}/group/groupDetail/${id}/deleteGroup/${groupid}`, {
      headers: { "Content-Type": "application/json" },
      method: "delete"
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log("result >>", data);
      dispatch(DeleteGroupInGroupSuccess());
    }).catch((error) => {
      dispatch(DeleteGroupInGroupFail());
      console.log("err", error);
    });
  }
};

export function DeleteGroupInGroupSuccess(){
  return {
    type: types.DELETE_GROUP_IN_GROUP_SUCCESS
  }
};

export function DeleteGroupInGroupFail(){
  return {
    type: types.DELETE_GROUP_IN_GROUP_FAIL
  }
};

