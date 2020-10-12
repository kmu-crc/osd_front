import * as types from "actions/ActionTypes";
import host from "config";

export const GetExpertDesignerDetailRequest = (id) => {
    // console.log("?");
    return (dispatch) => {
      const url =  `${host}/expert/designerDetail/${id}`;
      console.log("url",url);
      return fetch(url, { headers: { "Content-Type": "application/json" }, method: "GET" })
        .then(res => res.json())
        .then(data => dispatch(GetExpertDesignerDetail(data ? data : [])))
        .catch(err => { console.log("err", err); })
    }
  };
  const GetExpertDesignerDetail = (data) => ({ type: types.GET_DESIGNER_DETAIL, DesignerDetail: data });

  export const GetExpertMakerDetailRequest = (id) => {
    console.log("?");
    return (dispatch) => {
      const url =  `${host}/expert/makerDetail/${id}`;
      console.log("url",url);
      return fetch(url, { headers: { "Content-Type": "application/json" }, method: "GET" })
        .then(res => res.json())
        .then(data => dispatch(GetExpertMakerDetail(data ? data : [])))
        .catch(err => { console.log("err", err); })
    }
  };
  const GetExpertMakerDetail = (data) => ({ type: types.GET_MAKER_DETAIL, MakerDetail: data });

  export const GetExpertDesignerViewDetailRequest = (id) => {
    console.log("?");
    return (dispatch) => {
      const url =  `${host}/expert/designerViewDetail/${id}`;
      console.log("url",url);
      return fetch(url, { headers: { "Content-Type": "application/json" }, method: "GET" })
        .then(res => res.json())
        .then(data => dispatch(GetExpertDesignerViewDetail(data ? data : [])))
        .catch(err => { console.log("err", err); })
    }
  };
  const GetExpertDesignerViewDetail = (data) => ({ type: types.GET_DESIGNER_VIEW_DETAIL, DesignerViewDetail: data });

  export const GetExpertMakerViewDetailRequest = (id) => {
    console.log("?");
    return (dispatch) => {
      const url =  `${host}/expert/makerViewDetail/${id}`;
      console.log("url",url);
      return fetch(url, { headers: { "Content-Type": "application/json" }, method: "GET" })
        .then(res => res.json())
        .then(data => dispatch(GetExpertMakerViewDetail(data ? data : [])))
        .catch(err => { console.log("err", err); })
    }
  };
  const GetExpertMakerViewDetail = (data) => ({ type: types.GET_MAKER_VIEW_DETAIL, MakerViewDetail: data });
