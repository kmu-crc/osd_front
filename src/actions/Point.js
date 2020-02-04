import * as types from "actions/ActionTypes";
import host from "config";

// Point //
export const GetMyPointRequest = (id, token) => {
  return dispatch => {
    dispatch(PointRequest());
    const url = `${host}/point/get/${id}`;
    return fetch(url, {
      headers: { "Content-Type": "application/json", "x-access-token": token },
      method: "GET",
    })
      .then(res => res.json())
      .then(res => dispatch(PointRequestSuccess(res)))
      .catch(error => dispatch(PointRequestFailure(error)));
  };
};
const PointRequest = () => ({ type: types.GET_POINT });
const PointRequestSuccess = res => ({ type: types.GET_POINT_SUCCESS, Point: res.Point });
const PointRequestFailure = error => ({ type: types.GET_POINT_FAILURE });


export const PointUpRequest = (info, data) => {
  const { id, token } = info;
  const { point, type } = data;
  return dispatch => {
    const url = `${host}/point/up`
    return fetch(url, {
      headers: { "Content-Type": "application/json", "x-access-token": token },
      body: JSON.stringify({ id: id, point: point, type: type }), method: "POST"
    })
      .then(res => res.json())
      .then(data => dispatch(PointUp()))
      .catch(err => console.log("ERR", err))
  }
};
const PointUp = () => ({ type: types.REQUEST_POINT_UP });



export const GetHistoryRequest = (id, token) => {
  return dispatch => {
    dispatch(HistoryRequest());
    const url = `${host}/point/get-history/${id}`;
    return fetch(url, {
      headers: { "Content-Type": "application/json", "x-access-token": token },
      method: "GET",
    })
      .then(res => res.json())
      .then(res => dispatch(HistoryRequestSuccess(res)))
      .catch(error => dispatch(HistoryRequestFailure(error)));
  };
};
const HistoryRequest = () => ({ type: types.GET_POINT_HISTORY_REQUEST });
const HistoryRequestSuccess = res => ({ type: types.GET_POINT_HISTORY_SUCCESS, History: res.History, HistoryCount: res.HistoryCount });
const HistoryRequestFailure = error => ({ type: types.GET_POINT_HISTORY_FAILURE });

