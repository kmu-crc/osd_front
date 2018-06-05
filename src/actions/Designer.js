import * as types from "actions/ActionTypes";
import host from "config";

export function GetDesignerListRequest(page, sort, cate1, cate2) {
  return (dispatch) => {
    return fetch(`${host}/designer/designerList/`+page+"/"+sort+"/"+cate1+"/"+cate2, {
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
          return;
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
      type: types.GET_DESIGNER_LIST,
      DesignerList : data
  }
};

export function DesignerListClear(data) {
  return {
    type: types.DESIGNER_LIST_CLEAR,
    DesignerList: data,
    DesignerListAdded: []
  }
};

export function DesignerListFail() {
  return {
    type: types.DESIGNER_LIST_FAIL,
    DesignerList: [],
    DesignerListAdded: []
  }
};

export function GetDesignerDetailRequest(id) {
  return (dispatch) => {
    return fetch(`${host}/designer/designerDetail/`+id, {
      headers: { "Content-Type": "application/json" },
      method: "get"
    }).then((response) => {
        return response.json();
      }).then((data) => {
        console.log("designer Detail data >>", data);
        if (!data) {
          console.log("no data");
          data = [];
        }
        dispatch(GetDesignerDetail(data));
      }).catch((error) => {
        console.log("err", error);
      })
  }
};

export function GetDesignerDetail(data) {
  return {
    type: types.GET_DESIGNER_DETAIL,
    DesignerDetail : data
  }
};

// 디자이너의 디자인 리스트 가져오기
export function GetDesignInDesignerRequest(id, page) {
  return (dispatch) => {
    return fetch(`${host}/designer/designerDetail/`+id+"/design/"+page, {
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
          dispatch(DesignInDesignerClear(data));
          return;
        }
        dispatch(GetDesignInDesigner(data));
      }).catch((error) => {
        console.log("err", error);
      })
  }
};

export function GetDesignInDesigner(data) {
  return {
    type: types.GET_DESIGN_IN_DESIGNER,
    DesignInDesigner : data
  }
};

export function DesignInDesignerClear(data) {
  return {
    type: types.GET_DESIGN_IN_DESIGNER_CLEAR,
    DesignInDesigner: data,
    DesignInDesignerAdded: []
  }
};

// 디자이너가 좋아요 한 디자인 가져오기
export function GetLikeInDesignerRequest(id, page) {
  return (dispatch) => {
    return fetch(`${host}/designer/designerDetail/`+id+"/like/"+page, {
      headers: { "Content-Type": "application/json" },
      method: "get"
    }).then((response) => {
        return response.json();
      }).then((data) => {
        console.log("designer's like list data >>", data);
        if (!data) {
          console.log("no data");
          data = [];
        }
        if (page === 0) {
          dispatch(LikeInDesignerClear(data));
          return;
        }
        dispatch(GetLikeInDesigner(data));
      }).catch((error) => {
        console.log("err", error);
      })
  }
};

export function GetLikeInDesigner(data) {
  return {
    type: types.GET_LIKE_IN_DESIGNER,
    LikeInDesigner : data
  }
};

export function LikeInDesignerClear(data) {
  return {
    type: types.GET_LIKE_IN_DESIGNER_CLEAR,
    LikeInDesigner: data,
    LikeInDesignerAdded: []
  }
};
