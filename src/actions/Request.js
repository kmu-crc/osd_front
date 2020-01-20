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
      .then(res => dispatch(CreateRequestSuccess(res)) && res.id)
      .catch(error => dispatch(CreateRequestFail(error)));
  };
};
const CreateRequest = () => ({ type: types.CREATE_REQUEST });
const CreateRequestSuccess = res => ({ type: types.CREATE_REQUEST_SUCCESS, success: res.success });
const CreateRequestFail = error => ({ type: types.CREATE_REQUEST_FAIL, success: error.success });


export const GetRequestListRequest = (page, sort, cate1, cate2, keyword) => {
  return dispatch => {
    const url = `${host}/request/list/${page}/${sort}/${cate1}/${cate2}/${keyword}`
    return fetch(url, {
      headers: { "Content-Type": "application/json" },
      method: "GET"
    })
      .then(res => res.json())
      .then(data => {
        console.log("list", data);
        return dispatch(GetRequestList(data || []))
      })
      .catch(err => dispatch(RequestListFail()))
  }
};
const GetRequestList = data => ({ type: types.GET_REQUEST_LIST, List: data });
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
    const sql = `${host}/request/detail/${id}`;
    return fetch(sql, {
      headers: { "Content-Type": "application/json" }, method: "GET"
    })
      .then(res => res.json())
      .then(data => dispatch(GetRequestDetail(data ? data : [])) && data)
      .catch(err => { console.log("err", err); })
  }
};
const GetRequestDetail = (data) => ({ type: types.GET_REQUEST_DETAIL, Detail: data });
