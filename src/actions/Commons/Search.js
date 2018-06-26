import * as types from "actions/ActionTypes";
import host from "config";

// 멤버 검색
export function SearchMemberRequest (data, token) {
  return (dispatch) => {
    dispatch(SearchMember());

    return fetch(`${host}/search/members`, { headers: { "Content-Type": "application/json", "x-access-token": token }, method: "POST", body: JSON.stringify(data) })
      .then(function (res) {
        return res.json();
      })
      .then(function (res) {
        console.log(res);
        return dispatch(SearchMemberSuccess(res.members));
      }).catch((error) => {
        return dispatch(SearchMemberFailure());
      })
  }
}

export function SearchMember () {
  return {
    type: types.GET_SEARCH_MEMVER
  }
}

export function SearchMemberSuccess (members) {
  return {
    type: types.GET_SEARCH_MEMBER_SUCCESS,
    members
  }
}

export function SearchMemberFailure () {
  return {
    type: types.GET_SEARCH_MEMBER_FAILURE
  }
}

// 디자인 이슈 검색
export function SearchIssueRequest (id, keyword) {
  return (dispatch) => {
    dispatch(SearchIssue());
    if (!keyword) {
      keyword = "null";
    }
    return fetch(`${host}/search/${id}/designIssue/${keyword}`, { 
      headers: { "Content-Type": "application/json" }, 
      method: "GET"
    }).then(res => {
        return res.json();
      }).then(res => {
        console.log(res);
        if (!res || res.length === 0) {
          console.log("no data");
          res = [];
        }
        return dispatch(SearchIssueSuccess(res));
      }).catch((error) => {
        return dispatch(SearchIssueFailure());
      })
  }
}

export function SearchIssue () {
  return {
    type: types.GET_SEARCH_ISSUE
  }
}

export function SearchIssueSuccess (issue) {
  return {
    type: types.GET_SEARCH_ISSUE_SUCCESS,
    issue
  }
}

export function SearchIssueFailure () {
  return {
    type: types.GET_SEARCH_ISSUE_FAILURE
  }
}
