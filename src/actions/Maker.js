import * as types from "actions/ActionTypes";
import host from "config";

// NORMAL
export const GetMakerListRequest = (page, sort, cate1, cate2, keyword) => {
  return (dispatch) => {
    const url = `${host}/maker/list/${page}/${sort}/${cate1}/${cate2}/${keyword}`;
    return fetch(url, {
      headers: { "Content-Type": "application/json" },
      method: "GET"
    })
      .then(res => res.json())
      .then(data =>
        dispatch(page === 0
          ? MakerListClear(data ? data : [])
          : GetMakerList(data ? data : [])))
      .catch(error => dispatch(MakerListFail()));
  }
};
const GetMakerList = (data) => ({ type: types.GET_MAKER_LIST, List: data });
const MakerListClear = (data) => ({ type: types.MAKER_LIST_CLEAR, List: data, ListAdded: [] });
const MakerListFail = () => ({ type: types.MAKER_LIST_FAIL, List: [], ListAdded: [] });


export function GetMakerTotalCountRequest(cate1, cate2) {
  return (dispatch) => {
    const sql = `${host}/maker/list-count/${cate1}/${cate2}`;
    return fetch(sql, { headers: { "Content-Type": "application/json" }, method: "GET" })
      .then(res => res.json())
      .then(data => dispatch(GetMakerTotalCount(data ? data["count(*)"] : 0)))
      .catch(err => dispatch(MakerTotalCountFail()))
  }
};
const GetMakerTotalCount = (data) => ({ type: types.GET_MAKER_TOTAL_COUNT, Count: data });
const MakerTotalCountFail = () => ({ type: types.GET_MAKER_TOTAL_COUNT_FAIL, Count: 0 });
export const GetMakerDetailRequest = (id) => {
  return (dispatch) => {
    const sql = `${host}/maker/detail/${id}`;
    return fetch(sql, { headers: { "Content-Type": "application/json" }, method: "GET" })
      .then(res => res.json())
      .then(data => dispatch(GetMakerDetail(data ? data : [])))
      .catch(err => { console.log("err", err); })
  }
};
const GetMakerDetail = (data) => ({ type: types.GET_MAKER_DETAIL, MakerDetail: data });
export function GetMakerCountRequest(id) {
  return (dispatch) => {
    const sql = `${host}/maker/maker-count/${id}`;
    return fetch(sql, { headers: { "Content-Type": "application/json" }, method: "GET" })
      .then(res => res.json())
      .then(data => dispatch(GetMakerCount(data ? data : { total_like: 0, total_design: 0, total_group: 0, total_view: 0 })))
      .catch(err => { console.log("err", err) });
  }
};
const GetMakerCount = (data) => ({ type: types.GET_MAKER_COUNT, Count: data });

// // 디자이너의 디자인 리스트 가져오기
// export function GetMyDesignInMakerRequest(id, page) {
//   return (dispatch) => {
//     return fetch(`${host}/maker/detail/` + id + "/items/" + page, {
//       headers: { "Content-Type": "application/json" },
//       method: "get"
//     }).then((response) => {
//       return response.json();
//     }).then((data) => {
//       console.log("designer's design list data >>", data);
//       if (!data) {
//         console.log("no data");
//         data = [];
//       }
//       if (page === 0) {
//         dispatch(MyDesignInMakerClear(data));
//         return;
//       }
//       dispatch(GetMyDesignInMaker(data));
//     }).catch((error) => {
//       dispatch(MyDesignInMakerFail());
//       console.log("err", error);
//     });
//   }
// };
// const GetMyDesignInMaker = (data) => ({ type: types.GET_MY_DESIGN_IN_MAKER, MyDesignInMaker: data })
// const MyDesignInMakerClear = (data) => ({ type: types.GET_MY_DESIGN_IN_MAKER_CLEAR, MyDesignInMaker: data, MyDesignInMakerAdded: [] });
// const MyDesignInMakerFail = () => ({ type: types.MY_DESIGN_IN_MAKER_FAIL, MyDesignInMaker: [], MyDesignInMakerAdded: [] });

// // 디자이너의 참여 리스트 가져오기
// export function GetDesignInMakerRequest(id, page) {
//   return (dispatch) => {
//     const sql = `${host}/maker/detail/${id}/items-joined/${page}`;
//     return fetch(sql,
//       { headers: { "Content-Type": "application/json" }, method: "get" })
//       .then(res => res.json())
//       .then(data => dispatch(page === 0 ? DesignInMakerClear(data || []) : GetDesignInMaker(data || [])))
//       .catch((error) => {
//         dispatch(DesignInMakerFail());
//         console.log("err", error);
//       })
//   }
// };
// const GetDesignInMaker = (data) => ({ type: types.GET_DESIGN_IN_MAKER, DesignInMaker: data });
// const DesignInMakerClear = (data) => ({ type: types.GET_DESIGN_IN_MAKER_CLEAR, DesignInMaker: data, DesignInMakerAdded: [] });
// const DesignInMakerFail = () => ({ type: types.DESIGN_IN_MAKER_FAIL, DesignInMaker: [], DesignInMakerAdded: [] });

// 디자이너가 좋아요 한 디자인 가져오기
export function GetLikeInMakerRequest(id, page) {
  return (dispatch) => {
    const sql = `${host}/expert/makerDetail/${id}/like/${page}`;
    return fetch(sql,
      { headers: { "Content-Type": "application/json" }, method: "GET" })
      .then(res => res.json())
      .then(data => dispatch(page === 0 ? LikeInMakerClear(data || []) : GetLikeInMaker(data || [])))
      .catch(err => dispatch(LikeInMakerFail()))
  }
};
const GetLikeInMaker = (data) => ({ type: types.GET_LIKE_IN_MAKER, LikeInMaker: data });
const LikeInMakerClear = (data) => ({ type: types.GET_LIKE_IN_MAKER_CLEAR, LikeInMaker: data, LikeInMakerAdded: [] });
const LikeInMakerFail = () => ({ type: types.LIKE_IN_MAKER_FAIL, LikeInMaker: [], LikeInMakerAdded: [] });

// 로그인 했을때 내 좋아요 정보 가져오기
export function GetLikeMakerRequest(id, token) {
  return (dispatch) => {
    dispatch(GetLikeMaker());
    const sql = `${host}/expert/getLikeMaker/${id}`;
    return fetch(sql,
      { headers: { "Content-Type": "application/json", 'x-access-token': token }, method: "get" })
      .then(res => res.json())
      .then(data => {
        console.log("Maker like >>", data);
        if (!data) {
          console.log("no like info");
          data = false;
        }
        dispatch(GetLikeMakerSuccess(data.like));
      }).catch((error) => {
        console.log("err", error);
        GetLikeMakerFailure(false);
      });
  }
}
const GetLikeMaker = () => ({ type: types.GET_LIKE_MAKER });
const GetLikeMakerSuccess = (data) => ({ type: types.GET_LIKE_MAKER_SUCCESS, like: data });
const GetLikeMakerFailure = (data) => ({ type: types.GET_LIKE_MAKER_FAILURE, like: data });

// 디자이너 좋아요 하기
export function LikeMakerRequest(id, token) {
  return (dispatch) => {
    dispatch(LikeMaker());
    const sql = `${host}/expert/likeMaker/${id}`;
    return fetch(sql,
      { headers: { "Content-Type": "application/json", 'x-access-token': token }, method: "post" })
      .then(res => res.json())
      .then((data) => {
        console.log("like >>>", data);
        if (!data) {
          console.log("no data");
        }
        dispatch(LikeMakerSuccess());
        return data;
      }).catch((error) => {
        console.log("err", error);
        LikeMakerFailure(error);
      });
  }
}
const LikeMaker = () => ({ type: types.LIKE_MAKER });
const LikeMakerSuccess = () => ({ type: types.LIKE_MAKER_SUCCESS });
const LikeMakerFailure = () => ({ type: types.LIKE_MAKER_FAILURE });

// 디자이너 좋아요 취소하기
export function UnlikeMakerRequest(id, token) {
  return (dispatch) => {
    dispatch(UnlikeMaker());
    const sql = `${host}/expert/unlikeMaker/${id}`;
    return fetch(sql,
      { headers: { "Content-Type": "application/json", 'x-access-token': token }, method: "post" })
      .then(res => res.json())
      .then((data) => dispatch(UnlikeMakerSuccess(data)) && data)
      .catch(err => UnlikeMakerFailure(err));
  }
};
const UnlikeMaker = () => ({ type: types.UNLIKE_MAKER });
const UnlikeMakerSuccess = () => ({ type: types.UNLIKE_MAKER_SUCCESS });
const UnlikeMakerFailure = () => ({ type: types.UNLIKE_MAKER_FAILURE });

