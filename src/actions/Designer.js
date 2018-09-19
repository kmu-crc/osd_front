import * as types from "actions/ActionTypes";
import host from "config";

export function GetDesignerListRequest(page, sort, cate1, cate2, keyword) {
  return (dispatch) => {
    console.log(keyword);
    return fetch(`${host}/designer/designerList/${page}/${sort}/${cate1}/${cate2}/${keyword}`, {
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
    type: types.GET_DESIGNER_TOTAL_COUNT,
    Count : data
  }
};

export function DesignerTotalCountFail() {
  return {
    type: types.GET_DESIGNER_TOTAL_COUNT_FAIL,
    Count: 0
  }
}

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

export function GetDesignerCountRequest(id) {
  return (dispatch) => {
    return fetch(`${host}/designer/getCount/${id}`, {
      headers: { "Content-Type": "application/json" },
      method: "get"
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log("designer count >>", data);
      if (!data) {
        console.log("no data");
        data = {
          total_like: 0,
          total_design: 0,
          total_group: 0,
          total_view: 0
        };
      }
      dispatch(GetDesignerCount(data));
    }).catch((err) => {
      console.log("err", err);
    })
  }
};

export function GetDesignerCount(data) {
  return {
    type: types.GET_DESIGNER_COUNT,
    Count: data
  }
};

// 디자이너의 디자인 리스트 가져오기
export function GetMyDesignInDesignerRequest(id, page) {
  return (dispatch) => {
    return fetch(`${host}/designer/designerDetail/`+id+"/myDesign/"+page, {
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
          dispatch(MyDesignInDesignerClear(data));
          return;
        }
        dispatch(GetMyDesignInDesigner(data));
      }).catch((error) => {
        dispatch(MyDesignInDesignerFail());
        console.log("err", error);
      });
  }
};

export function GetMyDesignInDesigner(data) {
  return {
    type: types.GET_MY_DESIGN_IN_DESIGNER,
    MyDesignInDesigner : data
  }
};

export function MyDesignInDesignerClear(data) {
  return {
    type: types.GET_MY_DESIGN_IN_DESIGNER_CLEAR,
    MyDesignInDesigner: data,
    MyDesignInDesignerAdded: []
  }
};

export function MyDesignInDesignerFail() {
  return {
    type: types.MY_DESIGN_IN_DESIGNER_FAIL,
    MyDesignInDesigner: [],
    MyDesignInDesignerAdded: []
  }
};

// 디자이너의 참여 리스트 가져오기
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
        dispatch(DesignInDesignerFail());
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

export function DesignInDesignerFail() {
  return {
    type: types.DESIGN_IN_DESIGNER_FAIL,
    DesignInDesigner: [],
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
        dispatch(LikeInDesignerFail());
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

export function LikeInDesignerFail() {
  return {
    type: types.LIKE_IN_DESIGNER_FAIL,
    LikeInDesigner: [],
    LikeInDesignerAdded: []
  }
};

// 로그인 했을때 내 좋아요 정보 가져오기
export function GetLikeDesignerRequest(id, token) {
  return (dispatch) => {
    dispatch(GetLikeDesigner());
    return fetch(`${host}/Designer/getLike/${id}`, {
      headers: { "Content-Type": "application/json", 'x-access-token': token },
      method: "get"
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log("Designer like >>", data);
      if (!data) {
        console.log("no like info");
        data = false;
      }
      dispatch(GetLikeDesignerSuccess(data.like));
    }).catch((error) => {
      console.log("err", error);
      GetLikeDesignerFailure(false);
    });
  }
}

export function GetLikeDesigner(data) {
  return {
    type: types.GET_LIKE_DESIGNER
  }
};

export function GetLikeDesignerSuccess(data) {
  return {
    type: types.GET_LIKE_DESIGNER_SUCCESS,
    like: data
  }
};

export function GetLikeDesignerFailure(data) {
  return {
    type: types.GET_LIKE_DESIGNER_FAILURE,
    like: data
  }
};

// 디자이너 좋아요 하기
export function LikeDesignerRequest(id, token) {
  return (dispatch) => {
    dispatch(LikeDesigner());
    return fetch(`${host}/Designer/like/${id}`, {
      headers: { "Content-Type": "application/json", 'x-access-token': token },
      method: "post"
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log("like >>>", data);
      if (!data) {
        console.log("no data");
      }
      dispatch(LikeDesignerSuccess());
      return data;
    }).catch((error) => {
      console.log("err", error);
      LikeDesignerFailure(error);
    });
  }
}

export function LikeDesigner() {
  return {
    type: types.LIKE_DESIGNER
  }
};

export function LikeDesignerSuccess() {
  return {
    type: types.LIKE_DESIGNER_SUCCESS
  }
};

export function LikeDesignerFailure() {
  return {
    type: types.LIKE_DESIGNER_FAILURE
  }
};

// 디자이너 좋아요 취소하기
export function UnlikeDesignerRequest(id, token) {
  return (dispatch) => {
    dispatch(UnlikeDesigner());
    return fetch(`${host}/Designer/unlike/${id}`, {
      headers: { "Content-Type": "application/json", 'x-access-token': token },
      method: "post"
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log("unlike >>>", data);
      if (!data) {
        console.log("no data");
      }
      dispatch(UnlikeDesignerSuccess(data));
      return data;
    }).catch((error) => {
      console.log("err", error);
      UnlikeDesignerFailure(error);
    });
  }
}

export function UnlikeDesigner() {
  return {
    type: types.UNLIKE_DESIGNER
  }
};

export function UnlikeDesignerSuccess() {
  return {
    type: types.UNLIKE_DESIGNER_SUCCESS
  }
};

export function UnlikeDesignerFailure() {
  return {
    type: types.UNLIKE_DESIGNER_FAILURE
  }
};
