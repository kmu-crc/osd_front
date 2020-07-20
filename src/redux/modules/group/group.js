import host from "config"
import update from "react-addons-update"


const CREATE_NEW_GROUP = "CREATE_NEW_GROUP"
const CREATE_NEW_GROUP_SUCCESS = "CREATE_NEW_GROUP_SUCCESS"
const CREATE_GROUP_FAILURE = "CREATE_GROUP_FAILURE"
const UPDATE_GROUP = "UPDATE_GROUP"
const UPDATE_GROUP_SUCCESS = "UPDATE_GROUP_SUCCESS"
const UPDATE_GROUP_FAILURE = "UPDATE_GROUP_FAILURE"
const DELETE_GROUP = "DELETE_GROUP"
const DELETE_GROUP_SUCCESS = "DETELE_GROUP_SUCCESS"
const DELETE_GROUP_FAILURE = "DETELE_GROUP_FAILURE"
const GET_GROUP_DETAIL = "GET_GROUP_DETAIL"
const GET_GROUP_COUNT = "GET_GROUP_COUNT"
const GET_DESIGN_IN_GROUP = "GET_DESIGN_IN_GROUP"
const GET_DESIGN_IN_GROUP_CLEAR = "GET_DESIGN_IN_GROUP_CLEAR"
const DESIGN_IN_GROUP_FAIL = "DESIGN_IN_GROUP_FAIL"
const GET_GROUP_IN_GROUP = "GET_GROUP_IN_GROUP"
const GET_GROUP_IN_GROUP_CLEAR = "GET_GROUP_IN_GROUP_CLEAR"
const GROUP_IN_GROUP_FAIL = "GROUP_IN_GROUP_FAIL"
const GET_WAITING_DESIGN = "GET_WAITING_DESIGN"
const GET_WAITING_GROUP = "GET_WATING_GROUP"
const GET_WAITING_DATA_FAIL = "GET_WAITING_DATA_FAIL"
const GET_MY_DESIGN_LIST = "GET_MY_DESIGN_LIST"
const GET_MY_DESIGN_LIST_SUCCESS = "GET_MY_DESIGN_LIST_SUCCESS"
const GET_MY_DESIGN_LIST_FAILURE = "GET_MY_DESIGN_LIST_FAILURE"
const GET_MY_GROUP_LIST = "GET_MY_GROUP_LIST"
const GET_MY_GROUP_LIST_SUCCESS = "GET_MY_GROUP_LIST_SUCCESS"
const GET_MY_GROUP_LIST_FAILURE = "GET_MY_GROUP_LIST_FAILURE"
// const JOIN_GROUP = "JOIN_GROUP"
const JOIN_GROUP_SUCCESS = "JOIN_GROUP_SUCCESS"
const JOIN_GROUP_FAILURE = "JOIN_GROUP_FAILURE"
const GROUP_JOIN_GROUP = "GROUP_JOIN_GROUP"
// const GROUP_JOIN_GROUP_SUCCESS = "GROUP_JOIN_GROUP_SUCCESS"
// const GROUP_JOIN_GROUP_FAILURE = "GROUP_JOIN_GROUP_FAILURE"
const UPDATE_DESIGN_IN_GROUP_SUCCESS = "UPDATE_DESIGN_IN_GROUP_SUCCESS"
const UPDATE_DESIGN_IN_GROUP_FAIL = "UPDATE_DESIGN_IN_GROUP_FAIL"
const UPDATE_GROUP_IN_GROUP_SUCCESS = "UPDATE_GROUP_IN_GROUP_SUCCESS"
const UPDATE_GROUP_IN_GROUP_FAIL = "UPDATE_GROUP_IN_GROUP_FAIL"
const DELETE_DESIGN_IN_GROUP_SUCCESS = "DELETE_DESIGN_IN_GROUP_SUCCESS"
const DELETE_DESIGN_IN_GROUP_FAIL = "DELETE_DESIGN_IN_GROUP_FAIL"
const DELETE_GROUP_IN_GROUP_SUCCESS = "DELETE_GROUP_IN_GROUP_SUCCESS"
const DELETE_GROUP_IN_GROUP_FAIL = "DELETE_GROUP_IN_GROUP_FAIL"
const GET_MY_EXIST_DESIGN_LIST = "GET_MY_EXIST_DESIGN_LIST"
const GET_MY_EXIST_DESIGN_LIST_SUCCESS = "GET_MY_EXIST_DESIGN_LIST_SUCCESS"
const GET_MY_EXIST_DESIGN_LIST_FAILURE = "GET_MY_EXIST_DESIGN_LIST_FAILURE"
const GET_MY_EXIST_GROUP_LIST = "GET_MY_EXIST_GROUP_LIST"
const GET_MY_EXIST_GROUP_LIST_SUCCESS = "GET_MY_EXIST_GROUP_LIST_SUCCESS"
const GET_MY_EXIST_GROUP_LIST_FAILURE = "GET_MY_EXIST_GROUP_LIST_FAILURE"
const GET_LIKE_GROUP = "GET_LIKE_GROUP"
const GET_LIKE_GROUP_SUCCESS = "GET_LIKE_GROUP_SUCCESS"
const GET_LIKE_GROUP_FAILURE = "GET_LIKE_GROUP_FAILURE"
const LIKE_GROUP = "LIKE_GROUP"
const LIKE_GROUP_SUCCESS = "LIKE_GROUP_SUCCESS"
const LIKE_GROUP_FAILURE = "LIKE_GROUP_FAILURE"
const UNLIKE_GROUP = "UNLIKE_GROUP"
const UNLIKE_GROUP_SUCCESS = "UNLIKE_GROUP_SUCCESS"
const UNLIKE_GROUP_FAILURE = "UNLIKE_GROUP_FAILURE"

const GET_GROUP_NOTICE = "GET_GROUP_NOTICE"
const GET_GROUP_NOTICE_SUCCESS = "GET_GROUP_NOTICE_SUCCESS"
const GET_GROUP_NOTICE_FAILURE = "GET_GROUP_NOTICE_FAILURE"
const GET_GROUP_MY_NOTICE_SUCCESS = "GET_GROUP_MY_NOTICE_SUCCESS"
const GET_GROUP_MY_NOTICE_FAILURE = "GET_GROUP_MY_NOTICE_FAILURE"


const GetGroupDetail = (data) => ({ type: GET_GROUP_DETAIL, GroupDetail: data })
const GetGroupCount = (data) => ({ type: GET_GROUP_COUNT, Count: data })
const GetLikeGroup = (data) => ({ type: GET_LIKE_GROUP })
const GetLikeGroupSuccess = (data) => ({ type: GET_LIKE_GROUP_SUCCESS, like: data })
const GetLikeGroupFailure = (data) => ({ type: GET_LIKE_GROUP_FAILURE, like: data })
const GetDesignInGroup = (data) => ({ type: GET_DESIGN_IN_GROUP, DesignInGroup: data })
export const DesignInGroupClear = (data) => ({ type: GET_DESIGN_IN_GROUP_CLEAR, DesignInGroup: data, DesignInGroupAdded: [] })
const DesignInGroupFail = () => ({ type: DESIGN_IN_GROUP_FAIL, DesignInGroup: [], DesignInGroupAdded: [] })
const GetGroupInGroup = (data) => ({ type: GET_GROUP_IN_GROUP, GroupInGroup: data })
export const GroupInGroupClear = (data) => ({ type: GET_GROUP_IN_GROUP_CLEAR, GroupInGroup: data, GroupInGroupAdded: [] })
const GroupInGroupFail = () => ({ type: GROUP_IN_GROUP_FAIL, GroupInGroup: [], GroupInGroupAdded: [] })
// const JoinGroup = () => ({ type: JOIN_GROUP })
const JoinGroupSuccess = () => ({ type: JOIN_GROUP_SUCCESS })
const JoinGroupFailure = () => ({ type: JOIN_GROUP_FAILURE })
const GetMyDesignList = () => ({ type: GET_MY_DESIGN_LIST })
const GetMyDesignListSuccess = (data) => ({ type: GET_MY_DESIGN_LIST_SUCCESS, success: data.success, list: data.list })
const GetMyDesignListFailure = (data) => ({ type: GET_MY_DESIGN_LIST_FAILURE, success: data.success })
const GroupJoinGroup = () => ({ type: GROUP_JOIN_GROUP })
// const GroupJoinGroupSuccess = () => ({ type: GROUP_JOIN_GROUP_SUCCESS })
// const GroupJoinGroupFailure = () => ({ type: GROUP_JOIN_GROUP_FAILURE })
// const GetMyGroupList = () => ({ type: GET_MY_GROUP_LIST })
const GetMyGroupListSuccess = (data) => ({ type: GET_MY_GROUP_LIST_SUCCESS, success: data.success, list: data.list })
const GetMyGroupListFailure = (data) => ({ type: GET_MY_GROUP_LIST_FAILURE, success: data.success })
const GetWaitingDesign = (data) => ({ type: GET_WAITING_DESIGN, waitingDesign: data })
const GetWaitingGroup = (data) => ({ type: GET_WAITING_GROUP, waitingGroup: data })
const GetWaitingDataFail = () => ({ type: GET_WAITING_DATA_FAIL, waitingDesign: [], waitingGroup: [] })
const DeleteDesignInGroupSuccess = (data) => ({ type: DELETE_DESIGN_IN_GROUP_SUCCESS, data })
const DeleteDesignInGroupFail = () => ({ type: DELETE_DESIGN_IN_GROUP_FAIL })
const UpdateDesignInGroupSuccess = (data) => ({ type: UPDATE_DESIGN_IN_GROUP_SUCCESS, data })
const UpdateDesignInGroupFail = () => ({ type: UPDATE_DESIGN_IN_GROUP_FAIL })
const DeleteGroupInGroupSuccess = (data) => ({ type: DELETE_GROUP_IN_GROUP_SUCCESS, data })
const DeleteGroupInGroupFail = () => ({ type: DELETE_GROUP_IN_GROUP_FAIL })
const UpdateGroupInGroupSuccess = (data) => ({ type: UPDATE_GROUP_IN_GROUP_SUCCESS, data })
const UpdateGroupInGroupFail = () => ({ type: UPDATE_GROUP_IN_GROUP_FAIL })
const CreateNewGroup = () => ({ type: CREATE_NEW_GROUP })
const CreateNewGroupSuccess = (id) => ({ type: CREATE_NEW_GROUP_SUCCESS, id })
const CreateGroupFailure = () => ({ type: CREATE_GROUP_FAILURE })
const UpdateGroup = () => ({ type: UPDATE_GROUP })
const UpdateGroupSuccess = (data) => ({ type: UPDATE_GROUP_SUCCESS, data })
const UpdateGroupFailure = () => ({ type: UPDATE_GROUP_FAILURE })
const DeleteGroup = () => ({ type: DELETE_GROUP })
const DeleteGroupSuccess = () => ({ type: DELETE_GROUP_SUCCESS })
const DeleteGroupFailure = () => ({ type: DELETE_GROUP_FAILURE })
const LikeGroup = () => ({ type: LIKE_GROUP })
const LikeGroupSuccess = () => ({ type: LIKE_GROUP_SUCCESS })
const LikeGroupFailure = () => ({ type: LIKE_GROUP_FAILURE })
const UnlikeGroup = () => ({ type: UNLIKE_GROUP })
const UnlikeGroupSuccess = () => ({ type: UNLIKE_GROUP_SUCCESS })
const UnlikeGroupFailure = () => ({ type: UNLIKE_GROUP_FAILURE })
const GetExistDesignList = () => ({ type: GET_MY_EXIST_DESIGN_LIST })
const GetMyExistDesignListSuccess = (data) => ({ type: GET_MY_EXIST_DESIGN_LIST_SUCCESS, success: data.success, list: data.list })
const GetExistDesignListFailure = (data) => ({ type: GET_MY_EXIST_DESIGN_LIST_FAILURE, success: data.success })
const GetExistGroupList = () => ({ type: GET_MY_EXIST_GROUP_LIST })
const GetMyExistGroupListSuccess = (data) => ({ type: GET_MY_EXIST_GROUP_LIST_SUCCESS, success: data.success, list: data.list })
const GetExistGroupListFailure = (data) => ({ type: GET_MY_EXIST_GROUP_LIST_FAILURE, success: data.success })


const GetGroupNotice = () => ({ type: GET_GROUP_NOTICE });
const GetGroupNoticeSuccess = data => ({ type: GET_GROUP_NOTICE_SUCCESS, success: true, data: data });
const GetGroupNoticeFailure = error => ({ type: GET_GROUP_NOTICE_FAILURE, success: false, error: error });
const GetGroupNoticeYouJoined = (data) => ({ type: GET_GROUP_MY_NOTICE_SUCCESS, sucess: true, data: data });
const GetGroupNoticeYouJoinedFailed = (error) => ({ type: GET_GROUP_MY_NOTICE_FAILURE, sucess: false, error: error });


const initialState = {
  DeleteGroup: { status: "INIT" },
  WaitingList: { status: "INIT" },
  GroupDetail: { status: "INIT" },
  LikeGroup: { status: "INIT" },
  MyExistList: { status: "INIT" },
  MyList: { status: "INIT" },
  CreateGroup: { status: "INIT" },
  GroupNotice: { status: "INIT" },
  status: {
    GroupDetail: [],
    Count: { like: 0, design: 0, group: 0 },
    DesignInGroup: [], DesignInGroupAdded: [],
    GroupInGroup: [], GroupInGroupAdded: [],
    waitingDesign: [], waitingGroup: [],
    like: false,
    MyDesignList: [],
    MyGroupList: [],
    MyExistDesignList: [],
    MyExistGroupList: [],
    GroupNotice: [],
    GroupMyNotice: [],
  }
}


export function Group(state, action) {
  if (typeof state === "undefined") {
    state = initialState;
  }

  switch (action.type) {
    case DELETE_GROUP:
      return update(state, {
        DeleteGroup: {
          status: { $set: "WATTING" }
        }
      })
    case DELETE_GROUP_SUCCESS:
      return update(state, {
        DeleteGroup: {
          status: { $set: "SUCCESS" }
        }
      })
    case DELETE_GROUP_FAILURE:
      return update(state, {
        DeleteGroup: {
          status: { $set: "FAILURE" }
        }
      })
    case GET_GROUP_DETAIL:
      return update(state, {
        status: {
          GroupDetail: { $set: action.GroupDetail }
        }
      })
    case GET_GROUP_COUNT:
      return update(state, {
        status: {
          Count: { $set: action.Count }
        }
      })
    case GET_DESIGN_IN_GROUP:
      return update(state, {
        status: {
          DesignInGroup: { $set: action.DesignInGroup },
          DesignInGroupAdded: { $push: action.DesignInGroup }
        }
      })
    case GET_DESIGN_IN_GROUP_CLEAR:
      return update(state, {
        status: {
          DesignInGroup: { $set: action.DesignInGroup },
          DesignInGroupAdded: { $set: action.DesignInGroup }
        }
      })
    case DESIGN_IN_GROUP_FAIL:
      return update(state, {
        status: {
          DesignInGroup: { $set: action.DesignInGroup },
          DesignInGroupAdded: { $set: action.DesignInGroupAdded }
        }
      })
    case GET_GROUP_IN_GROUP:
      return update(state, {
        status: {
          GroupInGroup: { $set: action.GroupInGroup },
          GroupInGroupAdded: { $push: action.GroupInGroup }
        }
      })
    case GET_GROUP_IN_GROUP_CLEAR:
      return update(state, {
        status: {
          GroupInGroup: { $set: action.GroupInGroup },
          GroupInGroupAdded: { $set: action.GroupInGroup }
        }
      })
    case GROUP_IN_GROUP_FAIL:
      return update(state, {
        status: {
          GroupInGroup: { $set: action.GroupInGroup },
          GroupInGroupAdded: { $set: action.GroupInGroupAdded }
        }
      })
    case GET_LIKE_GROUP:
      return update(state, {
        LikeGroup: {
          status: { $set: "WATTING" }
        }
      })
    case GET_LIKE_GROUP_SUCCESS:
      return update(state, {
        LikeGroup: {
          status: { $set: "SUCCESS" }
        },
        status: {
          like: { $set: action.like }
        }
      })
    case GET_LIKE_GROUP_FAILURE:
      return update(state, {
        LikeGroup: {
          status: { $set: "FAILURE" }
        },
        status: {
          like: { $set: action.like }
        }
      })
    case LIKE_GROUP:
      return update(state, {
        LikeGroup: {
          status: { $set: "WATING" }
        }
      })
    case LIKE_GROUP_SUCCESS:
      return update(state, {
        LikeGroup: {
          status: { $set: "SUCCESS" }
        }
      })
    case LIKE_GROUP_FAILURE:
      return update(state, {
        LikeGroup: {
          status: { $set: "FAILURE" }
        }
      })
    case UNLIKE_GROUP:
      return update(state, {
        LikeGroup: {
          status: { $set: "WATING" }
        }
      })
    case UNLIKE_GROUP_SUCCESS:
      return update(state, {
        LikeGroup: {
          status: { $set: "SUCCESS" }
        }
      })
    case UNLIKE_GROUP_FAILURE:
      return update(state, {
        LikeGroup: {
          status: { $set: "FAILURE" }
        }
      })
    case GET_WAITING_DESIGN:
      return update(state, {
        status: {
          waitingDesign: { $set: action.waitingDesign }
        }
      })
    case GET_WAITING_GROUP:
      return update(state, {
        status: {
          waitingGroup: { $set: action.waitingGroup }
        }
      })
    case GET_WAITING_DATA_FAIL:
      return update(state, {
        status: {
          waitingDesign: { $set: action.waitingDesign },
          waitingGroup: { $set: action.waitingGroup }
        }
      })
    case GET_MY_EXIST_DESIGN_LIST:
      return update(state, {
        MyExistList: {
          status: { $set: "WATTING" }
        }
      })
    case GET_MY_EXIST_DESIGN_LIST_SUCCESS:
      return update(state, {
        MyExistList: {
          status: { $set: "SUCCESS" }
        },
        status: {
          MyExistDesignList: { $set: action.list },
        }
      })
    case GET_MY_EXIST_DESIGN_LIST_FAILURE:
      return update(state, {
        MyExistList: {
          status: { $set: "FAILURE" }
        },
        status: {
          MyExistDesignList: { $set: [] },
        }
      })
    case GET_MY_EXIST_GROUP_LIST:
      return update(state, {
        MyExistList: {
          status: { $set: "WATTING" }
        }
      })
    case GET_MY_EXIST_GROUP_LIST_SUCCESS:
      return update(state, {
        MyExistList: {
          status: { $set: "SUCCESS" }
        },
        status: {
          MyExistGroupList: { $set: action.list },
        }
      })
    case GET_MY_EXIST_GROUP_LIST_FAILURE:
      return update(state, {
        MyExistList: {
          status: { $set: "FAILURE" }
        },
        status: {
          MyExistGroupList: { $set: [] },
        }
      })
    case GET_MY_DESIGN_LIST:
      return update(state, {
        MyList: {
          status: { $set: "WATTING" }
        }
      })
    case GET_MY_DESIGN_LIST_SUCCESS:
      return update(state, {
        MyList: {
          status: { $set: "SUCCESS" }
        },
        status: {
          MyDesignList: { $set: action.list },
        }
      })
    case GET_MY_DESIGN_LIST_FAILURE:
      return update(state, {
        MyList: {
          status: { $set: "FAILURE" }
        },
        status: {
          MyDesignList: { $set: [] },
        }
      })
    case GET_MY_GROUP_LIST:
      return update(state, {
        MyList: {
          status: { $set: "WATTING" }
        }
      })
    case GET_MY_GROUP_LIST_SUCCESS:
      return update(state, {
        MyList: {
          status: { $set: "SUCCESS" }
        },
        status: {
          MyGroupList: { $set: action.list },
        }
      })
    case GET_MY_GROUP_LIST_FAILURE:
      return update(state, {
        MyList: {
          status: { $set: "FAILURE" }
        },
        status: {
          MyGroupList: { $set: [] },
        }
      })
    case CREATE_NEW_GROUP:
      return update(state, {
        CreateGroup: {
          status: { $set: "Success" }
        }
      })
    case CREATE_GROUP_FAILURE:
      return update(state, {
        CreateGroup: {
          status: { $set: "Failure" }
        }
      })

    case GET_GROUP_NOTICE:
      return update(state, {
        GroupNotice: { status: { $set: "WAITING" } }
      })
    case GET_GROUP_NOTICE_SUCCESS:
      return update(state, {
        GroupNotice: {
          status: { $set: "SUCCESS" }
        },
        status: {
          GroupNotice: { $set: action.data },
        }
      })
    case GET_GROUP_NOTICE_FAILURE:
      return update(state, {
        GroupNotice: {
          status: { $set: "Failure" }
        },
        status: {
          GroupNotice: { $set: [] },
        }
      })
    case GET_GROUP_MY_NOTICE_SUCCESS:
      return update(state, {
        status: { GroupMyNotice: { $set: action.data }, }
      })
    case GET_GROUP_MY_NOTICE_FAILURE:
      return update(state, {
        status: { GroupMyNotice: { $set: [] }, }
      })

    default:
      return state
  }
}

export function UpdateDesignInGroupRequest(id, designid) {
  return (dispatch) => {
    return fetch(`${host}/group/groupDetail/${id}/acceptDesign/${designid}`, {
      headers: { "Content-Type": "application/json" },
      method: "post"
    }).then((response) => {
      return response.json()
    }).then((data) => {
      console.log("result >>", data)
      return dispatch(UpdateDesignInGroupSuccess(data))
    }).catch((error) => {
      dispatch(UpdateDesignInGroupFail())
      console.log("err", error)
    })
  }
}
export function UpdateGroupInGroupRequest(id, groupid) {
  return (dispatch) => {
    return fetch(`${host}/group/groupDetail/${id}/acceptGroup/${groupid}`, {
      headers: { "Content-Type": "application/json" },
      method: "post"
    }).then((response) => {
      return response.json()
    }).then((data) => {
      console.log("result >>", data)
      return dispatch(UpdateGroupInGroupSuccess(data))
    }).catch((error) => {
      dispatch(UpdateGroupInGroupFail())
      console.log("err", error)
    })
  }
}
export function DeleteGroupInGroupRequest(id, groupid) {
  return (dispatch) => {
    return fetch(`${host}/group/groupDetail/${id}/deleteGroup/${groupid}`, {
      headers: { "Content-Type": "application/json" },
      method: "delete"
    }).then((response) => {
      return response.json()
    }).then((data) => {
      console.log("result >>", data)
      return dispatch(DeleteGroupInGroupSuccess(data))
    }).catch((error) => {
      dispatch(DeleteGroupInGroupFail())
      console.log("err", error)
    })
  }
}

export function GetMyExistGroupListRequest(token, id) {
  return (dispatch) => {
    dispatch(GetExistGroupList())
    return fetch(`${host}/group/${id}/join/myExistGroupList`, {
      headers: { "Content-Type": "application/json", 'x-access-token': token },
      method: "get"
    }).then((response) => {
      return response.json()
    }).then((data) => {
      console.log("GetMyGroupListRequest >>", data)
      if (!data.list) {
        console.log("no data")
        data = []
      }
      data.list = data.list.map(item => {
        return { key: item.uid, text: item.title, value: item.uid }
      })
      dispatch(GetMyExistGroupListSuccess(data))
    }).catch((error) => {
      dispatch(GetExistGroupListFailure(error))
      console.log("err", error)
    })
  }
}
export function GetMyExistDesignListRequest(token, id) {
  return (dispatch) => {
    dispatch(GetExistDesignList())
    return fetch(`${host}/group/${id}/join/myExistDesignList`, {
      headers: { "Content-Type": "application/json", 'x-access-token': token },
      method: "get"
    }).then((response) => {
      return response.json()
    }).then((data) => {
      if (!data.list) {
        console.log("no data")
        data = []
      }
      data.list = data.list.map(item => {
        return { key: item.uid, text: item.title, value: item.uid }
      })
      dispatch(GetMyExistDesignListSuccess(data))
    }).catch((error) => {
      dispatch(GetExistDesignListFailure(error))
      console.log("err", error)
    })
  }
}
export function UnlikeGroupRequest(id, token) {
  return (dispatch) => {
    dispatch(UnlikeGroup())
    return fetch(`${host}/group/unlike/${id}`, {
      headers: { "Content-Type": "application/json", "x-access-token": token },
      method: "post"
    }).then((response) => {
      return response.json()
    }).then((data) => {
      console.log("unlike >>>", data)
      if (!data) {
        console.log("no data")
      }
      dispatch(UnlikeGroupSuccess(data))
      return data
    }).catch((error) => {
      console.log("err", error)
      UnlikeGroupFailure(error)
    })
  }
}
export function LikeGroupRequest(id, token) {
  return (dispatch) => {
    dispatch(LikeGroup())
    return fetch(`${host}/group/like/${id}`, {
      headers: { "Content-Type": "application/json", "x-access-token": token },
      method: "post"
    }).then((response) => {
      return response.json()
    }).then((data) => {
      if (!data) {
        console.log("no data")
      }
      dispatch(LikeGroupSuccess())
      return data
    }).catch((error) => {
      console.log("err", error)
      LikeGroupFailure(error)
    })
  }
}
export function DeleteGroupRequest(id, token) {
  return (dispatch) => {
    dispatch(DeleteGroup())
    return fetch(`${host}/group/${id}/deleteGroup`, {
      headers: { 'x-access-token': token },
      method: "DELETE"
    }).then((response) => {
      return response.json()
    }).then((res) => {
      if (res.success === true) {
        return dispatch(DeleteGroupSuccess())
      } else {
        return dispatch(DeleteGroupFailure())
      }
    }).catch((error) => {
      dispatch(DeleteGroupFailure())
      console.log(error)
    })
  }
}
export function UpdateGroupRequest(id, data, token) {
  return (dispatch) => {
    dispatch(UpdateGroup())
    return fetch(`${host}/group/${id}/updateGroup`, {
      headers: { "x-access-token": token, "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(data)
    }).then((response) => {
      return response.json()
    }).then((res) => {
      return dispatch(UpdateGroupSuccess(res))
    }).catch((error) => {
      dispatch(UpdateGroupFailure())
      console.log(error)
    })
  }
}
export function CreateNewGroupRequest(data, token) {
  return (dispatch) => {
    dispatch(CreateNewGroup())
    return fetch(`${host}/group/createGroup`, {
      headers: { "x-access-token": token, "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(data)
    }).then((response) => {
      return response.json()
    })
      .then((res) => {
        return dispatch(CreateNewGroupSuccess(res.id))
      }).catch((error) => {
        dispatch(CreateGroupFailure())
        console.log(error)
      })
  }
}
export function GetTotalCountGroupInGroupRequest(id) {
  return new Promise((resolve, reject) => {
    const url = `${host}/group/groupDetail/${id}/groupCount`;
    console.log(url);
    fetch(url, {
      headers: { "Content-Type": "application/json" }, method: "get"
    }).then(res => {
      return res.json();
    }).then(count => {
      if (!count) {
        resolve(count);
      } else {
        resolve(-1);
      }
    }).catch(err => {
      resolve(0);
    })
  })
}
export function GetGroupInGroupRequest(id, page, sort) {
  const url = `${host}/group/groupDetail/` + id + "/group/" + page + "/" + sort
  return (dispatch) => {
    return fetch(url, {
      headers: { "Content-Type": "application/json" },
      method: "get"
    }).then((response) => {
      return response.json()
    }).then((data) => {
      if (!data) {
        console.log("no data")
        data = []
      }
      if (page === 0) {
        dispatch(GroupInGroupClear(data))
        return
      }
      return dispatch(GetGroupInGroup(data))
    }).catch((error) => {
      return dispatch(GroupInGroupFail())
    })
  }
}
export function GetDesignInGroupRequest(id, page, sort) {
  const query = `${host}/group/groupDetail/` + id + "/design/" + page + "/" + sort
  console.log(query, "!!!!!")
  return (dispatch) => {
    return fetch(query, {
      headers: { "Content-Type": "application/json" },
      method: "get"
    }).then((response) => {
      return response.json()
    }).then((data) => {
      console.log("design in group data >>", data)
      if (!data) {
        console.log("no data")
        data = []
      }
      if (page === 0) {
        return dispatch(DesignInGroupClear(data))
      }
      return dispatch(GetDesignInGroup(data))
    }).catch((error) => {
      return dispatch(DesignInGroupFail())
    })
  }
}
export function GetLikeGroupRequest(id, token) {
  return (dispatch) => {
    dispatch(GetLikeGroup())
    return fetch(`${host}/group/getLike/${id}`, {
      headers: { "Content-Type": "application/json", 'x-access-token': token },
      method: "get"
    }).then((response) => {
      return response.json()
    }).then((data) => {
      console.log("group like >>", data)
      if (!data) {
        console.log("no like info")
        data = false
      }
      dispatch(GetLikeGroupSuccess(data.like))
    }).catch((error) => {
      console.log("err", error)
      GetLikeGroupFailure(false)
    })
  }
}
export function GetGroupCountRequest(id) {
  return (dispatch) => {
    return fetch(`${host}/group/getCount/${id}`, {
      headers: { "Content-Type": "application/json" },
      method: "get"
    }).then((response) => {
      return response.json()
    }).then((data) => {
      // console.log("group count >>", data)
      if (!data) {
        console.log("no data")
        data = {
          like: 0,
          design: 0,
          group: 0
        }
      }
      dispatch(GetGroupCount(data))
    }).catch((err) => {
      console.log("err", err)
    })
  }
}
export function GetGroupDetailRequest(id) {
  return (dispatch) => {
    return fetch(`${host}/group/groupDetail/${id}`, {
      headers: { "Content-Type": "application/json" },
      method: "get"
    }).then((response) => {
      return response.json()
    }).then((data) => {
      if (!data) {
        console.log("no data")
        data = []
      }
      dispatch(GetGroupDetail(data))
    }).catch((error) => {
      console.log("err", error)
    })
  }
}
export function JoinGroupRequest(data, token, id) {
  return (dispatch) => {
    return fetch(`${host}/group/groupDetail/${id}/DesignJoinGroup`, {
      headers: { "Content-Type": "application/json", 'x-access-token': token },
      method: "post",
      body: JSON.stringify(data)
    }).then((response) => {
      return response.json()
    }).then((data) => {
      console.log("waiting group list is >>", data)
      if (!data) {
        console.log("no data")
        data = []
      }
      dispatch(JoinGroupSuccess(data))
    }).catch((error) => {
      dispatch(JoinGroupFailure())
    })
  }
}
export function GetMyDesignListRequest(token, id) {
  return (dispatch) => {
    dispatch(GetMyDesignList())

    return fetch(`${host}/group/${id}/join/myDesignList`, {
      headers: { "Content-Type": "application/json", 'x-access-token': token },
      method: "get"
    }).then((response) => {
      return response.json()
    }).then((data) => {
      console.log("GetMyDesignListRequest >>", data)
      if (!data.list) {
        console.log("no data")
        data = []
      }
      data.list = data.list.map(item => {
        return { key: item.uid, text: item.title, value: item.uid }
      })
      dispatch(GetMyDesignListSuccess(data))
    }).catch((error) => {
      dispatch(GetMyDesignListFailure(error))
      console.log("err", error)
    })
  }
}
export function GroupJoinGroupRequest(data, token, id) {
  return (dispatch) => {
    dispatch(GroupJoinGroup())
    return fetch(`${host}/group/groupDetail/${id}/GroupJoinGroup`, {
      headers: { "Content-Type": "application/json", 'x-access-token': token }, method: "post", body: JSON.stringify(data)
    }).then((response) => {
      return response.json()
    }).then((data) => {
      console.log("waiting group list is >>", data)
      if (!data) {
        console.log("no data")
        data = []
      }
      dispatch(GetWaitingGroup(data))
    }).catch((error) => {
      dispatch(GetWaitingDataFail())
      console.log("err", error)
    })
  }
}
export function GetMyGroupListRequest(token, id) {
  return (dispatch) => {
    dispatch(GetMyDesignList())

    return fetch(`${host}/group/${id}/join/myGroupList`, {
      headers: { "Content-Type": "application/json", 'x-access-token': token },
      method: "get"
    }).then((response) => {
      return response.json()
    }).then((data) => {
      console.log("GetMyGroupListRequest >>", data)
      if (!data.list) {
        console.log("no data")
        data = []
      }
      data.list = data.list.map(item => {
        return { key: item.uid, text: item.title, value: item.uid }
      })
      dispatch(GetMyGroupListSuccess(data))
    }).catch((error) => {
      dispatch(GetMyGroupListFailure(error))
      console.log("err", error)
    })
  }
}
export function GetWaitingDesignRequest(id, sort) {
  // console.log(sort)
  return (dispatch) => {
    return fetch(`${host}/group/groupDetail/${id}/waitingDesign/${sort}`, {
      headers: { "Content-Type": "application/json" },
      method: "get"
    }).then((response) => {
      return response.json()
    }).then((data) => {
      console.log("waiting design list is >>", data)
      if (!data) {
        console.log("no data")
        data = []
      }
      return dispatch(GetWaitingDesign(data))
    }).catch((error) => {
      return dispatch(GetWaitingDataFail())
    })
  }
}
export function GetWaitingGroupRequest(id, sort) {
  const url = `${host}/group/groupDetail/${id}/waitingGroup/${sort}`
  console.log("url:", url);
  return (dispatch) => {
    return fetch(url, {
      headers: { "Content-Type": "application/json" },
      method: "get"
    }).then((response) => {
      return response.json()
    }).then((data) => {
      console.log("waiting group list is >>", data)
      if (!data) {
        console.log("no data")
        data = []
      }
      return dispatch(GetWaitingGroup(data))
    }).catch((error) => {
      return dispatch(GetWaitingDataFail())
    })
  }
}
export function DeleteDesignInGroupRequest(id, designid) {
  return (dispatch) => {
    return fetch(`${host}/group/groupDetail/${id}/deleteDesign/${designid}`, {
      headers: { "Content-Type": "application/json" },
      method: "delete"
    }).then((response) => {
      return response.json()
    }).then((data) => {
      console.log("result >>", data)
      return dispatch(DeleteDesignInGroupSuccess(data))
    }).catch((error) => {
      dispatch(DeleteDesignInGroupFail())
      console.log("err", error)
    })
  }
}


export function GetAllNoticeYourGroupRequest(id) {
  const url = `${host}/group/getAllNotiMygroup/${id}`;
  console.log("URL:", url);

  return (dispatch) => {
    dispatch(GetGroupNotice());
    return fetch(url, {
      headers: { "Content-Type": "application/json" },
      method: "GET"
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        dispatch(GetGroupNoticeSuccess(data.data))
      })
      .catch(error => {
        console.error(error);
        dispatch(GetGroupNoticeFailure(error))
      })
  }
}
export function GetGroupNoticeYouJoinedRequest(id, user_id) {
  const url = `${host}/group/getNotiGroupIJoined/${id}/${user_id}`;
  console.log("URL:", url);

  return (dispatch) => {
    return fetch(url, {
      headers: { "Content-Type": "application/json" },
      method: "GET"
    }).then(res => res.json())
      .then(data => {
        console.log("group >>", data)
        return dispatch(GetGroupNoticeYouJoined(!data ? [] : data.data))
      })
      .catch(error => {
        console.error(error);
        return dispatch(GetGroupNoticeYouJoinedFailed())
      })
  }
}
export function HasReadNoticeRequest(id, token) {
  return new Promise((resolve, reject) => {
    const url = `${host}/group/`;
    fetch(url, { headers: { "Content-Type": "application/json" }, method: "GET" })
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(err => reject(err));
  })
}



export function CreateGroupNoticeRequest(token, obj) {
  return new Promise((resolve, reject) => {
    const url = `${host}/group/createGroupNotice`
    console.log("URL:", url, obj);
    // return;
    return fetch(url, {
      headers: { "x-access-token": token, "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(obj)
    })
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(error => reject(error));
  });
}

export function GetLastestGroupNoticeRequest(group_id) {
  return new Promise((resolve, reject) => {
    const url = `${host}/group/lastest-notice/${group_id}`;
    console.log("URL:", url);
    return fetch(url, {
      headers: { "Content-Type": "application/json" },
      method: "GET",
    })
      .then(res => res.json())
      .then(data => resolve(data))
      .then(error => reject(error));
  });
};
export function GetTotalCountGroupNoticeRequest(group_id) {
  return new Promise((resolve, reject) => {
    const url = `${host}/group/total-count-notice/${group_id}`;
    console.log("URL:", url);
    return fetch(url, {
      headers: { "Content-Type": "application/json" },
      method: "GET",
    })
      .then(res => res.json())
      .then(data => resolve(data))
      .then(error => reject(error));
  });
};
export function GetGroupNoticeListRequest(group_id, page) {
  return new Promise((resolve, reject) => {
    const url = `${host}/group/notice-list/${group_id}/${page}`;
    console.log("URL:", url);
    return fetch(url, {
      headers: { "Content-Type": "application/json" },
      method: "GET",
    })
      .then(res => res.json())
      .then(data => resolve(data))
      .then(error => reject(error));
  });
};