import host from "config"
import update from "react-addons-update"

const GET_DESIGNER_LIST = "GET_DESIGNER_LIST";
const DESIGNER_LIST_CLEAR = "DESIGNER_LIST_CLEAR";
const DESIGNER_LIST_FAIL = "DESIGNER_LIST_FAIL";
const GET_DESIGNER_TOTAL_COUNT = "GET_DESIGNER_TOTAL_COUNT";
const GET_DESIGNER_TOTAL_COUNT_FAIL = "GET_DESIGNER_TOTAL_COUNT_FAIL";

const initialState = {
  DesignerList: {
    status: "INIT"
  },
  status: {
    DesignerList: [],
    DesignerListAdded: [],
    Count: 0
  }
};

export function DesignerList(state, action) {
  if (typeof state === "undefined")
    state = initialState;

  switch (action.type) {
    case GET_DESIGNER_LIST:
      return update(state, {
        DesignerList: { status: { $set: action.type } },
        status: {
          DesignerList: { $set: action.DesignerList },
          DesignerListAdded: { $push: action.DesignerList }
        }
      });
    case DESIGNER_LIST_CLEAR:
      return update(state, {
        DesignerList: { status: { $set: action.type } },
        status: {
          DesignerList: { $set: [] },
          DesignerListAdded: { $set: [] }
        }
      });
    case DESIGNER_LIST_FAIL:
      return update(state, {
        DesignerList: { status: { $set: action.type } },
        status: {
          DesignerList: { $set: action.DesignerList },
          DesignerListAdded: { $set: action.DesignerListAdded }
        }
      });
    case GET_DESIGNER_TOTAL_COUNT:
      return update(state, {
        status: {
          Count: { $set: action.Count }
        }
      });
    case GET_DESIGNER_TOTAL_COUNT_FAIL:
      return update(state, {
        status: {
          Count: { $set: action.Count }
        }
      });
    default:
      return state;
  }
};


export function GetDesignerListRequest(page, sort, cate1, cate2, keyword) {
  const sql = `${host}/designer/designerList/${page}/${sort}/${cate1}/${cate2}/${keyword}`
  console.log("sql:", sql)
  return (dispatch) => {
    return fetch(sql, {
      headers: { "Content-Type": "application/json" },
      method: "get"
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log("Designer data >>", data);
      if (!data) {
        console.log("no data");
        data = [];
      }
      if (page === 0) {
        dispatch(DesignerListClear(data));
      }
      dispatch(GetDesignerList(data));
    }).catch((error) => {
      dispatch(DesignerListFail());
      console.log("err", error);
    })
  }
};

export function GetDesignerList(data) {
  return {
    type: GET_DESIGNER_LIST,
    DesignerList: data
  }
};

export function DesignerListClear(data) {
  return {
    type: DESIGNER_LIST_CLEAR,
    DesignerList: [],
    DesignerListAdded: []
  }
};

export function DesignerListFail() {
  return {
    type: DESIGNER_LIST_FAIL,
    DesignerList: [],
    DesignerListAdded: []
  }
};

export function GetDesignerTotalCountRequest(cate1, cate2) {
  return (dispatch) => {
    return fetch(`${host}/designer/designerCount/${cate1}/${cate2}`, {
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
      dispatch(GetDesignerTotalCount(data));
    }).catch((error) => {
      dispatch(DesignerTotalCountFail());
      console.log("err", error);
    })
  }
};

export function GetDesignerTotalCount(data) {
  return {
    type: GET_DESIGNER_TOTAL_COUNT,
    Count: data
  }
};

export function DesignerTotalCountFail() {
  return {
    type: GET_DESIGNER_TOTAL_COUNT_FAIL,
    Count: 0
  }
}