import * as types from "../ActionTypes";
import host from "config";

/////////////////// 
// 디자이너 등록
///////////////////
export function InsertDesignerDetailRequest(data, token) {
  return (dispatch) => {
    dispatch(InsertDesignerDetail());

    return fetch(`${host}/users/insertDesignerDetail`, { headers: { "x-access-token": token, "Content-Type": "application/json" }, method: "POST", body: JSON.stringify(data) })
      .then(function (res) {
        console.log("res2:",res);
        return res.json();
      })
      .then(function (res) {
        console.log("insert designer detail", res);
        return dispatch(InsertDesignerDetailSuccess(res));
      }).catch((error) => {
        console.log("insert designer detail err", error);
        return dispatch(InsertDesignerFailureFailure());
      })
  }
};

export function InsertDesignerDetail() {
    return {
      type: types.INSERT_DESIGNER_DETAIL
    }
  };

  export function InsertDesignerDetailSuccess(res) {
    return {
      type: types.INSERT_DESIGNER_DETAIL_SUCCESS,
      res
    }
  };

  export function InsertDesignerFailureFailure() {
    return {
      type: types.INSERT_DESIGNER_DETAIL_FAILURE
    }
  };
/////////////////// 
// 디자이너 수정
///////////////////
  export function UpdateDesignerDetailRequest(data, token) {
    return (dispatch) => {
      dispatch(UpdateDesignerDetail());
      return fetch(`${host}/users/modifyDesignerDetail`, { headers: { "x-access-token": token, "Content-Type": "application/json" }, method: "POST", body: JSON.stringify(data) }).then(function (res) {
          return res.json();
        }).then(function (res) {
          console.log("update designer detail", res);
          if (res.success === true) {
            return dispatch(UpdateDesignerDetailSuccess());
          }
          return dispatch(UpdateDesingnerDetailFailure());
        }).catch((error) => {
          console.log("update designer detail err", error);
          return dispatch(UpdateDesingnerDetailFailure());
        })
    }
  };

  export function UpdateDesignerDetail() {
      return {
        type: types.UPDATE_DESIGNER_DETAIL
      }
    };

    export function UpdateDesignerDetailSuccess() {
      return {
        type: types.UPDATE_DESIGNER_DETAIL_SUCCESS,
        success: true
      }
    };

    export function UpdateDesingnerDetailFailure() {
      return {
        type: types.UPDATE_DESIGNER_DETAIL_FAILURE,
        success: false
      }
    };


/////////////////// 
// 메이커 등록
///////////////////
export function InsertMakerDetailRequest(data, token) {
  return (dispatch) => {
    dispatch(InsertMakerDetail());

    return fetch(`${host}/users/insertMakerDetail`, { headers: { "x-access-token": token, "Content-Type": "application/json" }, method: "POST", body: JSON.stringify(data) })
      .then(function (res) {
        console.log("res2:",res);
        return res.json();
      })
      .then(function (res) {
        console.log("insert designer detail", res);
        return dispatch(InsertMakerDetailSuccess(res));
      }).catch((error) => {
        console.log("insert designer detail err", error);
        return dispatch(InsertMakerFailureFailure());
      })
  }
};

export function InsertMakerDetail() {
    return {
      type: types.INSERT_MAKER_DETAIL
    }
  };

  export function InsertMakerDetailSuccess(res) {
    return {
      type: types.INSERT_MAKER_DETAIL_SUCCESS,
      res
    }
  };

  export function InsertMakerFailureFailure() {
    return {
      type: types.INSERT_MAKER_DETAIL_FAILURE
    }
  };

/////////////////// 
// 메이커 수정
///////////////////
export function UpdateMakerDetailRequest(data, token) {
  return (dispatch) => {
    dispatch(UpdateMakerrDetail());
    return fetch(`${host}/users/modifyMakerDetail`, { headers: { "x-access-token": token, "Content-Type": "application/json" }, method: "POST", body: JSON.stringify(data) }).then(function (res) {
        return res.json();
      }).then(function (res) {
        console.log("update maker detail", res);
        if (res.success === true) {
          return dispatch(UpdateMakerDetailSuccess());
        }
        return dispatch(UpdateMakerDetailFailure());
      }).catch((error) => {
        console.log("update maker detail err", error);
        return dispatch(UpdateMakerDetailFailure());
      })
  }
};

export function UpdateMakerrDetail() {
    return {
      type: types.UPDATE_MAKER_DETAIL
    }
  };

  export function UpdateMakerDetailSuccess() {
    return {
      type: types.UPDATE_MAKER_DETAIL_SUCCESS,
      success: true
    }
  };

  export function UpdateMakerDetailFailure() {
    return {
      type: types.UPDATE_MAKER_DETAIL_FAILURE,
      success: false
    }
  };
export function InsertUserDetailRequest(data, token) {
  return (dispatch) => {
    dispatch(InsertUserDetail());

    return fetch(`${host}/users/insertDetail`, { headers: { "x-access-token": token, "Content-Type": "application/json" }, method: "POST", body: JSON.stringify(data) })
      .then(function (res) {
        return res.json();
      })
      .then(function (res) {
        console.log("insert detail", res);
        return dispatch(InsertUserDetailSuccess(res));
      }).catch((error) => {
        console.log("insert detail err", error);
        return dispatch(InsertUserDetailFailure());
      })
  }
};

export function InsertUserDetail() {
    return {
      type: types.INSERT_USER_DETAIL
    }
  };

  export function InsertUserDetailSuccess(res) {
    return {
      type: types.INSERT_USER_DETAIL_SUCCESS,
      res
    }
  };

  export function InsertUserDetailFailure() {
    return {
      type: types.INSERT_USER_DETAIL_FAILURE
    }
  };

  export function UpdateUserDetailRequest(data, token) {
    return (dispatch) => {
      dispatch(UpdateUserDetail());
      return fetch(`${host}/users/modifyDetail`, { headers: { "x-access-token": token, "Content-Type": "application/json" }, method: "POST", body: JSON.stringify(data) }).then(function (res) {
          return res.json();
        }).then(function (res) {
          console.log("update detail", res);
          if (res.success === true) {
            return dispatch(UpdateUserDetailSuccess());
          }
          return dispatch(UpdateUserDetailFailure());
        }).catch((error) => {
          console.log("update detail err", error);
          return dispatch(UpdateUserDetailFailure());
        })
    }
  };

  export function UpdateUserDetail() {
      return {
        type: types.UPDATE_USER_DETAIL
      }
    };

    export function UpdateUserDetailSuccess() {
      return {
        type: types.UPDATE_USER_DETAIL_SUCCESS,
        success: true
      }
    };

    export function UpdateUserDetailFailure() {
      return {
        type: types.UPDATE_USER_DETAIL_FAILURE,
        success: false
      }
    };
