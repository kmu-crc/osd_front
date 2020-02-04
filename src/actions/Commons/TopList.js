import * as types from "actions/ActionTypes";
import host from "config";

// 인기 디자이너/메이커 
export const GetTopExpertListRequest = () => {
  return (dispatch) => {
    const url = `${host}/expert/TopList`;
    return fetch(url, {
      headers: { "Content-Type": "application/json" }, method: "GET"
    })
      .then(res => res.json())
      .then(data => dispatch(GetTopExpertListSuccess(data ? data : [])))
      .catch(error => dispatch(GetTopExpertListFailure()));
  }
};
const GetTopExpertListSuccess = (data) => ({ type: types.GET_TOP_EXPERT_LIST_SUCCESS, ExpertList: data });
const GetTopExpertListFailure = () => ({ type: types.GET_TOP_EXPERT_LIST_FAILURE, ExpertList: [] });

// 탑 디자인 가져오기
export const GetTopItemListRequest = page => {
  return (dispatch) => {
    const url = `${host}/product/TopList/${page}`
    console.log(url)
    return fetch(url, {
      headers: { "Content-Type": "application/json" }, method: "GET"
    }).then(res => res.json())
      .then(data => dispatch(
        page === 0 ?
          GetTopDesignListClear(data ? data : []) :
          GetTopDesignListSuccess(data ? data : [])))
      .catch(error => dispatch(GetTopDesignListFailure()))
  }
};
const GetTopDesignListSuccess = data => ({ type: types.GET_TOP_ITEM_LIST_SUCCESS, TopList: data });
const GetTopDesignListFailure = () => ({ type: types.GET_TOP_ITEM_LIST_FAILURE, TopList: [], TopListAdded: [] });
const GetTopDesignListClear = data => ({ type: types.GET_TOP_ITEM_LIST_CLEAR, TopList: data, TopListAdded: [] })

// // 탑 디자이너 가져오기
// export function GetTopDesignerListRequest() {
//   return (dispatch) => {
//     return fetch(`${host}/designer/TopList`, {
//       headers: { "Content-Type": "application/json" },
//       method: "get"
//     }).then((response) => {
//       return response.json();
//     }).then((data) => {
//       console.log("designer data >>", data);
//       if (!data) {
//         console.log("no data");
//         data = [];
//       }
//       dispatch(GetTopDesignerListSuccess(data));
//     }).catch((error) => {
//       dispatch(GetTopDesignerListFailure());
//       console.log("err", error);
//     })
//   }
// };
// export function GetTopDesignerListSuccess(data) {
//   return {
//     type: types.GET_TOP_DESIGNER_LIST_SUCCESS,
//     TopDesignerList: data
//   };
// };
// export function GetTopDesignerListFailure() {
//   return {
//     type: types.GET_TOP_DESIGNER_LIST_FAILURE,
//     TopDesignerList: []
//   };
// };
// export function GetTopGroupListRequest(page) {
//   return (dispatch) => {
//     return fetch(`${host}/group/topGroupList/1/like`, {
//       headers: { "Content-Type": "application/json" },
//       method: "get"
//     }).then((response) => {
//       return response.json();
//     }).then((data) => {
//       console.log("group data >>", data);
//       if (!data) {
//         console.log("no data");
//         data = [];
//       }
//       if (page === 0) {
//         dispatch(GetTopGroupListClear(data));
//         return;
//       }
//       dispatch(GetTopGroupListSuccess(data));
//     }).catch((error) => {
//       dispatch(GetTopGroupListFailure());
//       console.log("err", error);
//     })
//   }
// };
// const GetTopGroupListSuccess = (data) => ({ type: types.GET_TOP_GROUP_LIST_SUCCESS, TopList: data });
// const GetTopGroupListFailure = () => ({ type: types.GET_TOP_GROUP_LIST_FAILURE, TopList: [], TopListAdded: [] });
// const GetTopGroupListClear = (data) => ({ type: types.GET_TOP_GROUP_LIST_CLEAR, TopList: data, TopListAdded: [] });
