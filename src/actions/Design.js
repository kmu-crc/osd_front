import * as types from "actions/ActionTypes";
import host from "config";

export const GetDesignListRequest = (page, sort, cate1, cate2, keyword) => {
  return (dispatch) => {
    const url = `${host}/item/list/${page}/${sort}/${cate1}/${cate2}/${keyword}`;
    console.log(url);
    return fetch(url, {
      headers: { "Content-Type": "application/json" },
      method: "get"
    })
      .then(res => res.json())
      .then(data =>
        dispatch((page === 0)
          ? DesignListClear(data ? data : [])
          : GetDesignList(data ? data : [])))
      .catch(error => dispatch(DesignListFail()));
  }
};

export function GetDesignList(data) {
  return {
    type: types.GET_DESIGN_LIST,
    DesignList: data
  }
};

export function DesignListClear(data) {
  return {
    type: types.DESIGN_LIST_CLEAR,
    DesignList: data,
    DesignListAdded: []
  }
}

export function DesignListFail() {
  return {
    type: types.DESIGN_LIST_FAIL,
    DesignList: [],
    DesignListAdded: []
  }
}

export function GetDesignTotalCountRequest(cate1, cate2) {
  return (dispatch) => {
    return fetch(`${host}/design/designCount/${cate1}/${cate2}`, {
      headers: { "Content-Type": "application/json" },
      method: "get"
    }).then((response) => {
      return response.json();
    }).then((data) => {
      if (!data) {
        console.log("no data");
        data = 0;
      } else {
        data = data["count(*)"];
      }
      dispatch(GetDesignTotalCount(data));
    }).catch((error) => {
      dispatch(DesignTotalCountFail());
      console.log("err", error);
    })
  }
};

export function GetDesignTotalCount(data) {
  return {
    type: types.GET_DESIGN_TOTAL_COUNT,
    Count: data
  }
};

export function DesignTotalCountFail() {
  return {
    type: types.GET_DESIGN_TOTAL_COUNT_FAIL,
    Count: 0
  }
}

export function GetDesignDetailRequest(id, token) {
  return (dispatch) => {
    if (token == null) {
      token = "";
    }
    return fetch(`${host}/design/designDetail/` + id, {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token
      },
      method: "get"
    }).then((response) => {
      return response.json();
    }).then((data) => {
      // console.log("design Detail data >>", data);
      if (!data) {
        // console.log("no data");
        data = [];
      }
      return dispatch(GetDesignDetail(data));
    }).catch((error) => {
      console.log("err", error);
    })
  }
};

export function GetDesignDetail(data) {
  return {
    type: types.GET_DESIGN_DETAIL,
    DesignDetail: data
  }
};

export function DesignDetailResetRequest() {
  return (dispatch) => {
    dispatch(DesignDetailReset());
  }
};

export function DesignDetailReset() {
  return {
    type: types.DESIGN_DETAIL_RESET,
    DesignDetail: []
  }
};

export function GetDesignCountRequest(id) {
  return (dispatch) => {
    return fetch(`${host}/design/getCount/${id}`, {
      headers: { "Content-Type": "application/json" },
      method: "get"
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log("design count >>", data);
      if (!data) {
        console.log("no data");
        data = {
          like_count: 0,
          member_count: 0,
          card_count: 0,
          view_count: 0
        };
      }
      dispatch(GetDesignCount(data));
    }).catch((err) => {
      console.log("err", err);
    })
  }
};

export function GetDesignCount(data) {
  return {
    type: types.GET_DESIGN_COUNT,
    Count: data
  }
};

// 디자인 조회수 업데이트
export function UpdateDesignViewRequest(id) {
  return (dispatch) => {
    return fetch(`${host}/design/updateViewCount/${id}`, {
      headers: { "Content-Type": "application/json" },
      method: "post"
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log("increase view count >>", data);
      if (!data) {
        console.log("no data");
      }
      dispatch(UpdateDesignView());
    }).catch((error) => {
      console.log("err", error);
    })
  }
}

export function UpdateDesignView() {
  return {
    type: types.UPDATE_DESIGN_VIEW
  }
};

export function GetDesignDetailViewRequest(id, token) {
  return (dispatch) => {
    if (token == null) {
      token = "";
    }
    return fetch(`${host}/design/designDetail/${id}/view`, {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token
      },
      method: "get",
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log("design Detail View data >>", data);
      if (!data || data.length === 0) {
        console.log("no data");
        data = [];
      }
      return dispatch(GetDesignDetailView(data));
    }).catch((error) => {
      console.log("err", error);
    })
  }
};

export function GetDesignDetailView(data) {
  return {
    type: types.GET_DESIGN_DETAIL_VIEW,
    DesignDetailView: data
  }
};

export function DesignDetailViewResetRequest() {
  return (dispatch) => {
    dispatch(DesignDetailViewReset());
  }
};

export function DesignDetailViewReset() {
  return {
    type: types.DESIGN_DETAIL_VIEW_RESET,
    DesignDetailView: []
  }
};

export function GetDesignDetailStepRequest(id) {
  return (dispatch) => {
    return fetch(`${host}/design/designDetail/` + id + "/step", {
      headers: { "Content-Type": "application/json" },
      method: "get"
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log("design Detail Step data >>", data);
      if (!data) {
        console.log("no data");
        return;
      } else {
        dispatch(GetDesignDetailStep(data));
      }
    }).catch((error) => {
      console.log("err", error);
    })
  }
};

export function GetDesignDetailStep(data) {
  return {
    type: types.GET_DESIGN_DETAIL_STEP,
    DesignDetailStep: data
  }
};

export function GetDesignDetailStepCardRequest(id, card_id) {
  return (dispatch) => {
    return fetch(`${host}/design/designDetail/` + id + "/cardDetail/" + card_id, {
      headers: { "Content-Type": "application/json" },
      method: "get"
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log("design Detail Card data >>", data);
      if (!data || data.length === 0) {
        console.log("no data");
        return;
      } else {
        dispatch(GetDesignDetailStepCard(data));
      }
    }).catch((error) => {
      console.log("err", error);
    })
  }
};

export function GetDesignDetailStepCard(data) {
  return {
    type: types.GET_DESIGN_DETAIL_STEP_CARD,
    DesignDetailStepCard: data
  }
};

export function GetDesignIssueListRequest(id) {
  return (dispatch) => {
    return fetch(`${host}/design/designDetail/` + id + "/issue", {
      headers: { "Content-Type": "application/json" },
      method: "get"
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log("design Detail Issue data >>", data);
      if (!data || data.length === 0) {
        console.log("no data");
        data = [];
      }
      dispatch(GetDesignIssueList(data));
    }).catch((error) => {
      console.log("err", error);
    })
  }
};

export function GetDesignIssueList(data) {
  return {
    type: types.GET_DESIGN_ISSUE_LIST,
    DesignIssueList: data
  }
};

export function GetDesignIssueDetailRequest(id, issue_id) {
  return (dispatch) => {
    return fetch(`${host}/design/designDetail/${id}/issueDetail/${issue_id}`, {
      headers: { "Content-Type": "application/json" },
      method: "get"
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log("design Issue Detail data >>", data);
      if (!data || data.length === 0) {
        console.log("no data");
        data = [];
      }
      dispatch(GetDesignIssueDetail(data));
    }).catch((error) => {
      console.log("err", error);
    })
  }
};

export function GetDesignIssueDetail(data) {
  return {
    type: types.GET_DESIGN_ISSUE_DETAIL,
    IssueDetail: data
  }
};

// 로그인 했을때 내 좋아요 정보 가져오기 >>> 전체 디자인에 대한 좋아요
export function GetLikeDesignRequest(id, token) {
  return (dispatch) => {
    dispatch(GetLikeDesign());
    return fetch(`${host}/Design/getLike/${id}`, {
      headers: { "Content-Type": "application/json", 'x-access-token': token },
      method: "get"
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log("Design like >>", data);
      if (!data) {
        console.log("no like info");
        data = false;
      }
      dispatch(GetLikeDesignSuccess(data.like));
    }).catch((error) => {
      console.log("err", error);
      GetLikeDesignFailure(false);
    });
  }
}

export function GetLikeDesign(data) {
  return {
    type: types.GET_LIKE_DESIGN
  }
};

export function GetLikeDesignSuccess(data) {
  return {
    type: types.GET_LIKE_DESIGN_SUCCESS,
    like: data
  }
};

export function GetLikeDesignFailure(data) {
  return {
    type: types.GET_LIKE_DESIGN_FAILURE,
    like: data
  }
};

// 디자인 좋아요 하기 >>> 전체 디자인에 대한 좋아요
export function LikeDesignRequest(id, token) {
  return (dispatch) => {
    dispatch(LikeDesign());
    return fetch(`${host}/Design/like/${id}`, {
      headers: { "Content-Type": "application/json", 'x-access-token': token },
      method: "post"
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log("like >>>", data);
      if (!data) {
        console.log("no data");
      }
      dispatch(LikeDesignSuccess());
      return data;
    }).catch((error) => {
      console.log("err", error);
      LikeDesignFailure(error);
    });
  }
}

export function LikeDesign() {
  return {
    type: types.LIKE_DESIGN
  }
};

export function LikeDesignSuccess() {
  return {
    type: types.LIKE_DESIGN_SUCCESS
  }
};

export function LikeDesignFailure() {
  return {
    type: types.LIKE_DESIGN_FAILURE
  }
};

// 디자인 좋아요 취소하기 >>> 전체 디자인에 대한 좋아요
export function UnlikeDesignRequest(id, token) {
  return (dispatch) => {
    dispatch(UnlikeDesign());
    return fetch(`${host}/Design/unlike/${id}`, {
      headers: { "Content-Type": "application/json", 'x-access-token': token },
      method: "post"
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log("unlike >>>", data);
      if (!data) {
        console.log("no data");
      }
      dispatch(UnlikeDesignSuccess(data));
      return data;
    }).catch((error) => {
      console.log("err", error);
      UnlikeDesignFailure(error);
    });
  }
}

export function UnlikeDesign() {
  return {
    type: types.UNLIKE_DESIGN
  }
};

export function UnlikeDesignSuccess() {
  return {
    type: types.UNLIKE_DESIGN_SUCCESS
  }
};

export function UnlikeDesignFailure() {
  return {
    type: types.UNLIKE_DESIGN_FAILURE
  }
};

// 블로그형 디자인 -> 프로젝트형으로 변경
export function ChangeToProjectRequest(id, token) {
  return (dispatch) => {
    dispatch(ChangeToProject());
    return fetch(`${host}/Design/changeToProject/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token
      },
      method: "post"
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log("change request >>>", data);
      dispatch(ChangeToProjectSuccess(data));
      return data;
    }).catch((error) => {
      console.log("err", error);
      ChangeToProjectFailure(error);
    });
  }
}

export function ChangeToProject() {
  return {
    type: types.CHANGE_TO_PROJECT
  }
};

export function ChangeToProjectSuccess(data) {
  return {
    type: types.CHANGE_TO_PROJECT_SUCCESS,
    data: data
  }
};

export function ChangeToProjectFailure() {
  return {
    type: types.CHANGE_TO_PROJECT_FAILURE
  }
};
