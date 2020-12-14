import * as types from "actions/ActionTypes";
import host from "config";

// NORMAL
export const GetDesignerListRequest = (page, sort, cate1, cate2, keyword) => {
  return (dispatch) => {
    const url =  `${host}/designer/designerList/${page}/${sort}/${cate1}/${cate2}/${keyword}`
    // console.log(url);
    return fetch(url, {
      headers: { "Content-Type": "application/json" },
      method: "GET"
    })
      .then(response => response.json())
      .then((data) => {
        return dispatch(page === 0 ? DesignerListClear(data || []) : GetDesignerList(data || []))
      })
      .catch((error) => {
        dispatch(DesignerListFail());
        console.log("err", error);
      })
  }
};
const GetDesignerList = (data) => ({ type: types.GET_DESIGNER_LIST, DesignerList: data });
const DesignerListClear = (data) => ({ type: types.DESIGNER_LIST_CLEAR, DesignerList: data, DesignerListAdded: [] });
const DesignerListFail = () => ({ type: types.DESIGNER_LIST_FAIL, DesignerList: [], DesignerListAdded: [] });



export function GetDesignerSearchCountRequest(sort, cate1, cate2, keyword) {
  return (dispatch) => {
    const url =  `${host}/designer/getDesignerCount/${sort}/${cate1}/${cate2}/${keyword}`;
    return fetch(url, { headers: { "Content-Type": "application/json" }, method: "GET" })
      .then(res => res.json())
      .then(data => {
        return data&&dispatch(GetDesignerSearchCount(data ? data["count"] : 0))
      })
      .catch(err => dispatch(GetDesignerSearchCountFail()))
  }
};
const GetDesignerSearchCount = (data) => ({ type: types.GET_DESIGNER_SEARCH_COUNT, searchCount: data });
const GetDesignerSearchCountFail = () => ({ type: types.GET_DESIGNER_SEARCH_COUNT_FAIL, searchCount: 0 });



export function GetDesignerTotalCountRequest(cate1, cate2) {
  return (dispatch) => {
    const url =  `${host}/designer/designerCount/${cate1}/${cate2}`;
    return fetch(url, { headers: { "Content-Type": "application/json" }, method: "GET" })
      .then(res => res.json())
      .then(data => dispatch(GetDesignerTotalCount(data ? data["count(*)"] : 0)))
      .catch(err => dispatch(DesignerTotalCountFail()))
  }
};
const GetDesignerTotalCount = (data) => ({ type: types.GET_DESIGNER_TOTAL_COUNT, Count: data });
const DesignerTotalCountFail = () => ({ type: types.GET_DESIGNER_TOTAL_COUNT_FAIL, Count: 0 });
export const GetDesignerDetailRequest = (id) => {
  return (dispatch) => {
    const url =  `${host}/designer/designerDetail/${id}`;
    return fetch(url, { headers: { "Content-Type": "application/json" }, method: "GET" })
      .then(res => res.json())
      .then(data => dispatch(GetDesignerDetail(data ? data : [])))
      .catch(err => { console.log("err", err); })
  }
};
const GetDesignerDetail = (data) => ({ type: types.GET_DESIGNER_DETAIL, DesignerDetail: data });
export function GetDesignerCountRequest(id) {
  return (dispatch) => {
    const url =  `${host}/designer/getCount/${id}`;
    return fetch(url, { headers: { "Content-Type": "application/json" }, method: "GET" })
      .then(res => res.json())
      .then(data => dispatch(GetDesignerCount(data ? data : { total_like: 0, total_design: 0, total_group: 0, total_view: 0 })))
      .catch(err => { console.log("err", err) });
  }
};
const GetDesignerCount = (data) => ({ type: types.GET_DESIGNER_COUNT, Count: data });

// 디자이너의 디자인 리스트 가져오기
export function GetMyDesignInDesignerRequest(id, page) {
  return (dispatch) => {
    return fetch(`${host}/designer/designerDetail/` + id + "/myDesign/" + page, {
      headers: { "Content-Type": "application/json" },
      method: "get"
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log("designer's design list data >>", data);
      if (!data) {
        console.log("no data");
        data = [];
      }
      if (page === 0) {
        dispatch(MyDesignInDesignerClear(data));
        return;
      }
      dispatch(GetMyDesignInDesigner(data));
    }).catch((error) => {
      dispatch(MyDesignInDesignerFail());
      console.log("err", error);
    });
  }
};
const GetMyDesignInDesigner = (data) => ({ type: types.GET_MY_DESIGN_IN_DESIGNER, MyDesignInDesigner: data })
const MyDesignInDesignerClear = (data) => ({ type: types.GET_MY_DESIGN_IN_DESIGNER_CLEAR, MyDesignInDesigner: data, MyDesignInDesignerAdded: [] });
const MyDesignInDesignerFail = () => ({ type: types.MY_DESIGN_IN_DESIGNER_FAIL, MyDesignInDesigner: [], MyDesignInDesignerAdded: [] });

// 디자이너의 참여 리스트 가져오기
export function GetDesignInDesignerRequest(id, page) {
  return (dispatch) => {
    const url =  `${host}/designer/designerDetail/${id}/design/${page}`;
    return fetch(url,
      { headers: { "Content-Type": "application/json" }, method: "get" })
      .then(res => res.json())
      .then(data => dispatch(page === 0 ? DesignInDesignerClear(data || []) : GetDesignInDesigner(data || [])))
      .catch((error) => {
        dispatch(DesignInDesignerFail());
        console.log("err", error);
      })
  }
};
const GetDesignInDesigner = (data) => ({ type: types.GET_DESIGN_IN_DESIGNER, DesignInDesigner: data });
const DesignInDesignerClear = (data) => ({ type: types.GET_DESIGN_IN_DESIGNER_CLEAR, DesignInDesigner: data, DesignInDesignerAdded: [] });
const DesignInDesignerFail = () => ({ type: types.DESIGN_IN_DESIGNER_FAIL, DesignInDesigner: [], DesignInDesignerAdded: [] });

// 디자이너가 좋아요 한 디자인 가져오기
export function GetLikeInDesignerRequest(id, page) {
  return (dispatch) => {
    const url =  `${host}/expert/designerDetail/${id}/like/${page}`;
    return fetch(url,
      { headers: { "Content-Type": "application/json" }, method: "GET" })
      .then(res => res.json())
      .then(data => dispatch(page === 0 ? LikeInDesignerClear(data || []) : GetLikeInDesigner(data || [])))
      .catch(err => dispatch(LikeInDesignerFail()))
  }
};
const GetLikeInDesigner = (data) => ({ type: types.GET_LIKE_IN_DESIGNER, LikeInDesigner: data });
const LikeInDesignerClear = (data) => ({ type: types.GET_LIKE_IN_DESIGNER_CLEAR, LikeInDesigner: data, LikeInDesignerAdded: [] });
const LikeInDesignerFail = () => ({ type: types.LIKE_IN_DESIGNER_FAIL, LikeInDesigner: [], LikeInDesignerAdded: [] });

// 로그인 했을때 내 좋아요 정보 가져오기
export function GetLikeDesignerRequest(id, token) {
  return (dispatch) => {
    dispatch(GetLikeDesigner());
    const url =  `${host}/expert/getLikeDesigner/${id}`;
    return fetch(url,
      { headers: { "Content-Type": "application/json", 'x-access-token': token }, method: "get" })
      .then(res => res.json())
      .then(data => {
        console.log("Designer like >>", data);
        if (!data) {
          console.log("no like info");
          data = false;
        }
        dispatch(GetLikeDesignerSuccess(data.like));
      }).catch((error) => {
        console.log("err", error);
        GetLikeDesignerFailure(false);
      });
  }
}
const GetLikeDesigner = () => ({ type: types.GET_LIKE_DESIGNER });
const GetLikeDesignerSuccess = (data) => ({ type: types.GET_LIKE_DESIGNER_SUCCESS, like: data });
const GetLikeDesignerFailure = (data) => ({ type: types.GET_LIKE_DESIGNER_FAILURE, like: data });

// 디자이너 좋아요 하기
export function LikeDesignerRequest(id, token) {
  return (dispatch) => {
    dispatch(LikeDesigner());
    const url =  `${host}/expert/likeDesigner/${id}`;
    return fetch(url,
      { headers: { "Content-Type": "application/json", 'x-access-token': token }, method: "post" })
      .then(res => res.json())
      .then((data) => {
        console.log("like >>>", data);
        if (!data) {
          console.log("no data");
        }
        dispatch(LikeDesignerSuccess());
        return data;
      }).catch((error) => {
        console.log("err", error);
        LikeDesignerFailure(error);
      });
  }
}
const LikeDesigner = () => ({ type: types.LIKE_DESIGNER });
const LikeDesignerSuccess = () => ({ type: types.LIKE_DESIGNER_SUCCESS });
const LikeDesignerFailure = () => ({ type: types.LIKE_DESIGNER_FAILURE });

// 디자이너 좋아요 취소하기
export function UnlikeDesignerRequest(id, token) {
  return (dispatch) => {
    dispatch(UnlikeDesigner());
    const url =  `${host}/expert/unlikeDesigner/${id}`;
    return fetch(url,
      { headers: { "Content-Type": "application/json", 'x-access-token': token }, method: "post" })
      .then(res => res.json())
      .then((data) => dispatch(UnlikeDesignerSuccess(data)) && data)
      .catch(err => UnlikeDesignerFailure(err));
  }
};
const UnlikeDesigner = () => ({ type: types.UNLIKE_DESIGNER });
const UnlikeDesignerSuccess = () => ({ type: types.UNLIKE_DESIGNER_SUCCESS });
const UnlikeDesignerFailure = () => ({ type: types.UNLIKE_DESIGNER_FAILURE });

// 디자이너보드 댓글관련함수

// 카드 댓글 가져오기
export const GetCardCommentRequest = (design_id, card_id) => {
  return dispatch => {
    dispatch(GetCardComment());
    return fetch(
      `${host}/design/designDetail/${design_id}/getCardComment/${card_id}`,
      {
        headers: {
          "Content-Type": "application/json"
        },
        method: "GET"
      }
    )
      .then(function (res) {
        return res.json();
      })
      .then(res => {
        return dispatch(GetCardCommentSuccess(res.data));
      })
      .catch(error => {
        console.log("get card comment err", error);
        return dispatch(GetCardCommentFailure(error));
      });
  };
};

export const GetCardComment = () => {
  return {
    type: types.GET_CARD_COMMENT
  };
};

export const GetCardCommentSuccess = data => {
  return {
    type: types.GET_CARD_COMMENT_SUCCESS,
    Comment: data
  };
};

export const GetCardCommentFailure = error => {
  return {
    type: types.GET_CARD_COMMENT_FAILURE
  };
};

// 카드 댓글 생성
export const CreateCardCommentRequest = (data, design_id, card_id, token) => {
  return dispatch => {
    dispatch(CreateCardComment());
    console.log("request", data);
    return fetch(
      `${host}/design/designDetail/${design_id}/createCardComment/${card_id}`,
      {
        headers: {
          "x-access-token": token,
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(data)
      }
    )
      .then(function (res) {
        return res.json();
      })
      .then(function (res) {
        return dispatch(CreateCardCommentSuccess(res));
      })
      .catch(error => {
        console.log("insert issue err", error);
        return dispatch(CreateCardCommentFailure(error));
      });
  };
};

export const CreateCardComment = () => {
  return {
    type: types.CREATE_CARD_COMMENT
  };
};

export const CreateCardCommentSuccess = res => {
  return {
    type: types.CREATE_CARD_COMMENT_SUCCESS,
    data: res
  };
};

export const CreateCardCommentFailure = error => {
  return {
    type: types.CREATE_CARD_COMMENT_FAILURE
  };
};

// 카드 댓글 삭제
export const DeleteDesignBoardCommentRequest = (design_id, card_id, comment_id, token) => {
  return dispatch => {
    dispatch(DeleteDesignerBoardComment());
    return fetch(
      `${host}/design/designDetail/${design_id}/deleteCardComment/${card_id}/${comment_id}`,
      {
        headers: {
          "x-access-token": token,
          "Content-Type": "application/json"
        },
        method: "DELETE"
      }
    )
      .then(function (res) {
        return res.json();
      })
      .then(function (res) {
        return dispatch(DeleteDesignerBoardCommentSuccess(res));
      })
      .catch(error => {
        console.log("insert issue err", error);
        return dispatch(DeleteDesignerBoardCommentFailure(error));
      });
  };
};

const DeleteDesignerBoardComment = () => ({ type: types.DELETE_DESIGN_COMMENT });
const DeleteDesignerBoardCommentSuccess = res => ({ type: types.DELETE_DESIGN_COMMENT_SUCCESS, data: res });
const DeleteDesignerBoardCommentFailure = error => ({ type: types.DELETE_DESIGN_COMMENT_FAILURE });
