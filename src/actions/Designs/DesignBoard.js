import * as types from "actions/ActionTypes";
import host from "config";

export const CreateDesignBoardRequest = (data, design_id, token) => {
  return (dispatch) => {
    dispatch(CreateBoard());
    console.log("request", data);
    return fetch(`${host}/design/designDetail/${design_id}/createBoard`, { headers: { "x-access-token": token, 'Content-Type': 'application/json' }, method: "POST", body: JSON.stringify(data) })
      .then(function (res) {
        return res.json();
      })
      .then(function (res) {
        console.log("insert detail", res.desing_id);
        return dispatch(CreateBoardSuccess(res));
      }).catch((error) => {
        console.log("insert detail err", error);
        return dispatch(CreateBoardFailure(error));
      });
  };
};

export const CreateBoard = () => {
  return {
    type: types.CREATE_BOARD
  };
};

export const CreateBoardSuccess = (res) => {
  return {
    type: types.CREATE_BOARD_SUCCESS,
    success: res.success
  };
};

export const CreateBoardFailure = (error) => {
  return {
    type: types.CREATE_BOARD_FAILURE,
    success: error.success,
  };
};

export const GetDesignBoardRequest = (id) => {
  return (dispatch) => {
    dispatch(GetBoard());
    return fetch(`${host}/design/designDetail/${id}/getBoardList`, { headers: { 'Content-Type': 'application/json' }, method: "GET" })
      .then(function (res) {
        return res.json();
      })
      .then(function (res) {
        console.log(res);
        return dispatch(GetBoardSuccess(res));
      }).catch((error) => {
        console.log("insert detail err", error);
        return dispatch(GetBoardFailure(error));
      });
  };
};

export const GetBoard = () => {
  return {
    type: types.GET_BOARD
  };
};

export const GetBoardSuccess = (res) => {
  return {
    type: types.GET_BOARD_SUCCESS,
    success: res.success,
    list: res.list
  };
};

export const GetBoardFailure = (error) => {
  return {
    type: types.GET_BOARD_FAILURE,
    success: error.success,
  };
};

export const UpdateDesignBoardRequest = (id, token, data) => {
  return (dispatch) => {
    dispatch(UpdateBoard());
    return fetch(`${host}/design/designDetail/updateBoard/${id}`, { headers: { "x-access-token": token, 'Content-Type': 'application/json' }, method: "POST", body: JSON.stringify(data) })
      .then(function (res) {
        return res.json();
      })
      .then(function (res) {
        console.log(res);
        return dispatch(UpdateBoardSuccess(res));
      }).catch((error) => {
        console.log("UpdateDesignBoardRequest err", error);
        return dispatch(UpdateBoardFailure(error));
      });
  };
};

export const UpdateBoard = () => {
  return {
    type: types.UPDATE_BOARD
  };
};

export const UpdateBoardSuccess = (res) => {
  return {
    type: types.UPDATE_BOARD_SUCCESS,
    success: res.success
  };
};

export const UpdateBoardFailure = (error) => {
  return {
    type: types.UPDATE_BOARD_FAILURE,
    success: error.success,
  };
};

export const DeleteDesignBoardRequest = (id, token) => {
  return (dispatch) => {
    dispatch(DeleteBoard());
    return fetch(`${host}/design/designDetail/deleteBoard/${id}`, { headers: { "x-access-token": token, 'Content-Type': 'application/json' }, method: "DELETE" })
      .then(function (res) {
        return res.json();
      })
      .then(function (res) {
        console.log(res);
        return dispatch(DeleteBoardSuccess(res));
      }).catch((error) => {
        console.log("DeleteDesignBoardRequest err", error);
        return dispatch(DeleteBoardFailure(error));
      });
  };
};

export const DeleteBoard = () => {
  return {
    type: types.DELETE_BOARD
  };
};

export const DeleteBoardSuccess = (res) => {
  return {
    type: types.DELETE_BOARD_SUCCESS,
    success: res.success
  };
};

export const DeleteBoardFailure = (error) => {
  return {
    type: types.DELETE_BOARD_FAILURE,
    success: error.success,
  };
};
