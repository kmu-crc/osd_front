import * as types from "actions/ActionTypes";

export function GetDesignerListRequest(sort) {
  return (dispatch) => {
    return fetch("http://localhost:8080/designer/designerList", {
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
        dispatch(GetDesignerList(data));
      }).catch((error) => {
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

export function GetDesignerDetailRequest(id) {
  return (dispatch) => {
    return fetch("http://localhost:8080/designer/designerDetail/"+id, {
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
export function GetDesignInDesignerRequest(id) {
  return (dispatch) => {
    return fetch("http://localhost:8080/designer/designerDetail/"+id+"/design", {
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

// 디자이너가 좋아요 한 디자인 가져오기
export function GetLikeInDesignerRequest(id) {
  return (dispatch) => {
    return fetch("http://localhost:8080/designer/designerDetail/"+id+"/like", {
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
