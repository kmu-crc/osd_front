import * as types from "actions/ActionTypes";
import host from "config";

// 카드 댓글 가져오기
export const GetDesignCommentRequest = (design_id) => {
  return dispatch => {
    dispatch(GetDesignComment());
    return fetch(
      `${host}/design/designDetail/${design_id}/getDetailComment`,
      {
        headers: {
          "Content-Type": "application/json"
        },
        method: "GET"
      }
    )
      .then(function(res) {
        return res.json();
      })
      .then(res => {
        return dispatch(GetDesignCommentSuccess(res.data));
      })
      .catch(error => {
        console.log("get card comment err", error);
        return dispatch(GetDesignCommentFailure(error));
      });
  };
};

export const GetDesignComment = () => {
  return {
    type: types.GET_DESIGN_COMMENT
  };
};

export const GetDesignCommentSuccess = data => {
  return {
    type: types.GET_DESIGN_COMMENT_SUCCESS,
    Comment: data
  };
};

export const GetDesignCommentFailure = error => {
  return {
    type: types.GET_DESIGN_COMMENT_FAILURE
  };
};

// 카드 댓글 생성
export const CreateDesignCommentRequest = (data, design_id, token) => {
  return dispatch => {
    dispatch(CreateDesignComment());
    console.log("request", data);
    return fetch(
      `${host}/design/designDetail/${design_id}/createDetailComment`,
      {
        headers: {
          "x-access-token": token,
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(data)
      }
    )
      .then(function(res) {
        return res.json();
      })
      .then(function(res) {
        return dispatch(CreateDesignCommentSuccess(res));
      })
      .catch(error => {
        console.log("insert issue err", error);
        return dispatch(CreateDesignCommentFailure(error));
      });
  };
};

export const CreateDesignComment = () => {
  return {
    type: types.CREATE_DESIGN_COMMENT
  };
};

export const CreateDesignCommentSuccess = res => {
  return {
    type: types.CREATE_DESIGN_COMMENT_SUCCESS,
    data: res
  };
};

export const CreateDesignCommentFailure = error => {
  return {
    type: types.CREATE_DESIGN_COMMENT_FAILURE
  };
};

// 카드 댓글 삭제
export const DeleteDesignCommentRequest = (
  design_id,
  comment_id,
  token
) => {
  return dispatch => {
    dispatch(DeleteDesignComment());
    return fetch(
      `${host}/design/designDetail/${design_id}/deleteDetailComment/${comment_id}`,
      {
        headers: {
          "x-access-token": token,
          "Content-Type": "application/json"
        },
        method: "DELETE"
      }
    )
      .then(function(res) {
        return res.json();
      })
      .then(function(res) {
        return dispatch(DeleteDesignCommentSuccess(res));
      })
      .catch(error => {
        console.log("insert issue err", error);
        return dispatch(DeleteDesignCommentFailure(error));
      });
  };
};

export const DeleteDesignComment = () => {
  return {
    type: types.DELETE_DESIGN_COMMENT
  };
};

export const DeleteDesignCommentSuccess = res => {
  return {
    type: types.DELETE_DESIGN_COMMENT_SUCCESS,
    data: res
  };
};

export const DeleteDesignCommentFailure = error => {
  return {
    type: types.DELETE_DESIGN_COMMENT_FAILURE
  };
};
