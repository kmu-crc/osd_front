import * as types from "actions/ActionTypes";
import host from "config";

// Request //
export const CreateRequestRequest = (data, token) => {
  return dispatch => {
    dispatch(CreateRequest());
    const url = `${host}/request/create`;
    return fetch(url, {
      headers: { "Content-Type": "application/json", "x-access-token": token },
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => res && dispatch(CreateRequestSuccess(res)))
      .catch(error => dispatch(CreateRequestFail(error)));
  };
};
const CreateRequest = () => ({ type: types.CREATE_REQUEST });
const CreateRequestSuccess = res => ({ type: types.CREATE_REQUEST_SUCCESS, id: res.id, success: res.success });
const CreateRequestFail = error => ({ type: types.CREATE_REQUEST_FAIL, success: error.success });

// type page cate1 cate2 sort keyword
export const GetRequestListRequest = (type, page, cate1, cate2, sort, keyword) => {
  return dispatch => {
    const url = `${host}/request/list/${type}/${page}/${cate1}/${cate2}/${sort}/${keyword}`
    console.log(url);
    return fetch(url, {
      headers: { "Content-Type": "application/json" },
      method: "GET"
    })
      .then(res => res.json())
      .then(data => dispatch(GetRequestList(data || [])))
      .catch(err => dispatch(RequestListFail()))
  }
};
const GetRequestList = data => ({ type: types.GET_REQUEST_LIST, payload: data });
// const RequestListClear = data => ({ type: types.REQUEST_LIST_CLEAR, List: data });
const RequestListFail = () => ({ type: types.REQUEST_LIST_FAIL, List: [] });


export const GetRequestTotalCountRequest = (cate1, cate2) => {
  return dispatch => {
    const url = `${host}/request/count/${cate1}/${cate2}`
    return fetch(url, {
      headers: { "Content-Type": "application/json" }, method: "GET"
    })
      .then(res => res.json())
      .then(data => dispatch(GetRequestTotalCount(data || 0)))
      .catch(err => dispatch(RequestTotalCountFail()))
  }
};
const GetRequestTotalCount = data => ({ type: types.GET_REQUEST_TOTAL_COUNT, Count: data });
const RequestTotalCountFail = () => ({ type: types.GET_REQUEST_TOTAL_COUNT_FAIL, Count: 0 });


export const GetRequestDetailRequest = (id) => {
  return dispatch => {
    const url =  `${host}/request/detail/${id}`;
    return fetch(url, {
      headers: { "Content-Type": "application/json" }, method: "GET"
    })
      .then(res => res.json())
      .then(data => dispatch(GetRequestDetail(data ? data : [])) && data)
      .catch(err => { console.log("err", err); })
  }
};
const GetRequestDetail = (data) => ({ type: types.GET_REQUEST_DETAIL, Detail: data });

// GET DESIGNER REQUEST LIST
export const GetDesignerRequestListRequest = (id, page) => {
  return dispatch => {
    const url = `${host}/request/designer-list/${id}/${page}`
    console.log(url);
    return fetch(url, {
      headers: { "Content-Type": "application/json" },
      method: "GET"
    })
      .then(res => res.json())
      .then(data => dispatch(GetDesignerRequestList(data || [])))
      .catch(err => dispatch(DesignerRequestListFail()))
  }
};
const GetDesignerRequestList = data => ({ type: types.GET_DESIGNER_REQUEST_LIST, payload: data });
const DesignerRequestListFail = () => ({ type: types.DESIGNER_REQUEST_LIST_FAIL, List: [] });

// my design request list
export const GetMyDesignerRequestListRequest = (id, page) => {
  return dispatch => {
    const url = `${host}/request/My-designer-list/${id}/${page}`
    console.log(url);
    return fetch(url, {
      headers: { "Content-Type": "application/json" },
      method: "GET"
    })
      .then(res => res.json())
      .then(data => dispatch(GetMyDesignerRequestList(data || [])))
      .catch(err => dispatch(MyDesignerRequestListFail()))
  }
};
const GetMyDesignerRequestList = data => ({ type: types.GET_MY_DESIGNER_REQUEST_LIST, payload: data });
const MyDesignerRequestListFail = () => ({ type: types.MY_DESIGNER_REQUEST_LIST_FAIL, List: [] });



// GET MAKER REQUEST LIST
export const GetMakerRequestListRequest = (id, page) => {
  return dispatch => {
    const url = `${host}/request/maker-list/${id}/${page}`
    console.log(url);
    return fetch(url, {
      headers: { "Content-Type": "application/json" },
      method: "GET"
    })
      .then(res => res.json())
      .then(data => dispatch(GetMakerRequestList(data || [])))
      .catch(err => dispatch(MakerRequestListFail()))
  }
};
const GetMakerRequestList = data => ({ type: types.GET_MAKER_REQUEST_LIST, payload: data });
// const RequestListClear = data => ({ type: types.REQUEST_LIST_CLEAR, List: data });
const MakerRequestListFail = () => ({ type: types.MAKER_REQUEST_LIST_FAIL, List: [] });


// GET MY MAKER REQUEST LIST
export const GetMyMakerRequestListRequest = (id, page) => {
  return dispatch => {
    const url = `${host}/request/My-maker-list/${id}/${page}`
    console.log(url);
    return fetch(url, {
      headers: { "Content-Type": "application/json" },
      method: "GET"
    })
      .then(res => res.json())
      .then(data => dispatch(GetMyMakerRequestList(data || [])))
      .catch(err => dispatch(MyMakerRequestListFail()))
  }
};
const GetMyMakerRequestList = data => ({ type: types.GET_MY_MAKER_REQUEST_LIST, payload: data });
const MyMakerRequestListFail = () => ({ type: types.MY_MAKER_REQUEST_LIST_FAIL, List: [] });


//COMMENT

// 카드 댓글 가져오기
export const GetRequestCommentRequest = (id) => {
  return dispatch => {
    dispatch(GetRequestComment());
    const url = `${host}/request/comment/${id}`;
    return fetch(url, {
      headers: { "Content-Type": "application/json" },
      method: "GET"
    })
      .then(res => res.json())
      .then(res => dispatch(GetRequestCommentSuccess(res.data)))
      .catch(error => dispatch(GetRequestCommentFailure(error)));
  };
};
const GetRequestComment = () => ({ type: types.GET_REQUEST_COMMENT });
const GetRequestCommentSuccess = data => ({ type: types.GET_REQUEST_COMMENT_SUCCESS, Comment: data });
const GetRequestCommentFailure = error => ({ type: types.GET_REQUEST_COMMENT_FAILURE });

// 의뢰 댓글 생성
export const CreateRequestCommentRequest = (data, id, token) => {
  return dispatch => {
    dispatch(CreateRequestComment());
    const url = `${host}/request/comment-create/${id}`
    return fetch(url, {
      headers: { "x-access-token": token, "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => dispatch(CreateRequestCommentSuccess(res)))
      .catch(error => dispatch(CreateRequestCommentFailure(error)));
  };
};
const CreateRequestComment = () => ({ type: types.CREATE_REQUEST_COMMENT });
const CreateRequestCommentSuccess = res => ({ type: types.CREATE_REQUEST_COMMENT_SUCCESS, data: res });
const CreateRequestCommentFailure = error => ({ type: types.CREATE_REQUEST_COMMENT_FAILURE });

// 의뢰 댓글 삭제
export const DeleteRequestCommentRequest = (id, token) => {
  return dispatch => {
    dispatch(DeleteRequestComment());
    const url = `${host}/request/comment-remove/${id}`
    return fetch(url, {
      headers: { "x-access-token": token, "Content-Type": "application/json" },
      method: "DELETE"
    })
      .then(res => res.json())
      .then(res => dispatch(DeleteRequestCommentSuccess(res)))
      .catch(error => dispatch(DeleteRequestCommentFailure(error)));
  };
};
const DeleteRequestComment = () => ({ type: types.DELETE_REQUEST_COMMENT });
const DeleteRequestCommentSuccess = res => ({ type: types.DELETE_REQUEST_COMMENT_SUCCESS, data: res });
const DeleteRequestCommentFailure = error => ({ type: types.DELETE_REQUEST_COMMENT_FAILURE });
