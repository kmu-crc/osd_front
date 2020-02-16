import * as types from "actions/ActionTypes";
import host from "config";

export const GetExpertDesignerDetailRequest = (id) => {
    console.log("?");
    return (dispatch) => {
      const sql = `${host}/expert/designerDetail/${id}`;
      console.log("sql",sql);
      return fetch(sql, { headers: { "Content-Type": "application/json" }, method: "GET" })
        .then(res => res.json())
        .then(data => dispatch(GetExpertDesignerDetail(data ? data : [])))
        .catch(err => { console.log("err", err); })
    }
  };
  const GetExpertDesignerDetail = (data) => ({ type: types.GET_DESIGNER_DETAIL, DesignerDetail: data });

  export const GetExpertMakerDetailRequest = (id) => {
    console.log("?");
    return (dispatch) => {
      const sql = `${host}/expert/makerDetail/${id}`;
      console.log("sql",sql);
      return fetch(sql, { headers: { "Content-Type": "application/json" }, method: "GET" })
        .then(res => res.json())
        .then(data => dispatch(GetExpertMakerDetail(data ? data : [])))
        .catch(err => { console.log("err", err); })
    }
  };
  const GetExpertMakerDetail = (data) => ({ type: types.GET_MAKER_DETAIL, MakerDetail: data });
