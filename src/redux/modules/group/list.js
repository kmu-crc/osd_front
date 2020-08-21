import host from "config"
import update from 'react-addons-update'


const GROUP_LIST_CLEAR = "GROUP_LIST_CLEAR"
const GET_GROUP_LIST = "GET_GROUP_LIST"
const GROUP_LIST_FAIL = "GROUP_LIST_FAIL"
const GET_GROUP_TOTAL_COUNT = "GET_GROUP_TOTAL_COUNT"
const GET_GROUP_TOTAL_COUNT_FAIL = "GET_GROUP_TOTAL_COUNT_FAIL"


export const GroupListClear = (data) => ({ type: GROUP_LIST_CLEAR, GroupList: data, GroupListAdded: [] })
const GetGroupList = (data) => ({ type: GET_GROUP_LIST, GroupList: data })
const GroupListFail = () => ({ type: GROUP_LIST_FAIL, GroupList: [], GroupListAdded: [] })
const GetGroupTotalCount = (data) => ({ type: GET_GROUP_TOTAL_COUNT, Count: data })
const GroupTotalCountFail = () => ({ type: GET_GROUP_TOTAL_COUNT_FAIL, Count: 0 })


const initialState = {
  GroupList: { status: "INIT" },
  status: {
    GroupList: [], GroupListAdded: [], GroupCount: 0
  }
}


export function GroupList(state, action) {
  if (typeof state === "undefined")
    state = initialState

  switch (action.type) {
    case GET_GROUP_LIST:
      return update(state, {
        GroupList: { status: { $set: action.type } },
        status: {
          GroupList: { $set: action.GroupList },
          GroupListAdded: { $push: action.GroupList }
        }
      })
    case GROUP_LIST_CLEAR:
      return update(state, {
        GroupList: { status: { $set: action.type } },
        status: {
          GroupList: { $set: action.GroupList },
          GroupListAdded: { $set: action.GroupList }
        }
      })
    case GROUP_LIST_FAIL:
      return update(state, {
        GroupList: { status: { $set: action.type } },
        status: {
          GroupList: { $set: action.GroupList },
          GroupListAdded: { $set: action.GroupListAdded }
        }
      })
    case GET_GROUP_TOTAL_COUNT:
      return update(state, {
        status: {
          GroupCount: { $set: action.Count }
        }
      })
    case GET_GROUP_TOTAL_COUNT_FAIL:
      return update(state, {
        status: {
          GroupCount: { $set: action.Count }
        }
      })
    default:
      return state
  }
}


export function GetGroupListRequest(page = 0, sort = null, keyword = null) {
  const url = `${host}/group/topGroupList/${page}/${sort}/${keyword}`
  // console.log("url:", url);
  return (dispatch) => {
    return fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      method: "get"
    }).then((response) => {
      return response.json()
    }).then((data) => {
      // console.log("group data >>", data)
      if (!data) {
        // console.log("no data")
        data = []
      }
      if (page === 0) {
        return dispatch(GroupListClear(data))
      }
      return dispatch(GetGroupList(data))
    }).catch((error) => {
      console.error("err", error)
      return dispatch(GroupListFail())
    })
  }
}
export function GetGroupTotalCountRequest() {
  return (dispatch) => {
    return fetch(`${host}/group/groupCount`, {
      headers: { "Content-Type": "application/json" },
      method: "get"
    }).then((response) => {
      return response.json()
    }).then((data) => {
      if (!data) {
        //console.log("no data")
        data = 0
      } else {
        data = data["count(*)"]
      }
      return dispatch(GetGroupTotalCount(data))
    }).catch((error) => {
      console.error("err", error)
      return dispatch(GroupTotalCountFail())
    })
  }
}

// import host from "config"
// import update from 'react-addons-update'
// const GET_TOP_GROUP_LIST_SUCCESS = "GET_TOP_GROUP_LIST_SUCCESS"
// const GET_TOP_GROUP_LIST_FAILURE = "GET_TOP_GROUP_LIST_FAILURE"
// const GET_TOP_GROUP_LIST_CLEAR = "GET_TOP_GROUP_LIST_CLEAR"
// const GetTopGroupListSuccess = (data) => ({ type: GET_TOP_GROUP_LIST_SUCCESS, TopList: data })
// const GetTopGroupListFailure = () => ({ type: GET_TOP_GROUP_LIST_FAILURE, TopList: [], TopListAdded: [] })
// const GetTopGroupListClear = (data) => ({ type: GET_TOP_GROUP_LIST_CLEAR, TopList: data, TopListAdded: [] })
// const initialState = {
//   TopList: { status: "INIT" },
//   status: { TopList: [], TopListAdded: [] }
// }
// export function GetTopGroupListRequest(page) {
//   return (dispatch) => {
//     return fetch(`${host}/group/topGroupList/1/like`, {
//       headers: { "Content-Type": "application/json" },
//       method: "get"
//     }).then((response) => {
//       return response.json()
//     }).then((data) => {
//       //console.log("group data >>", data)
//       if (!data) {
//         //console.log("no data")
//         data = []
//       }
//       if (page === 0) {
//         dispatch(GetTopGroupListClear(data))
//         return;
//       }
//       dispatch(GetTopGroupListSuccess(data))
//     }).catch((error) => {
//       dispatch(GetTopGroupListFailure())
//       console.error("err", error)
//     })
//   }
// }

