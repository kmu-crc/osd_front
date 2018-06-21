import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { GetDesignDetailRequest, DesignDetailResetRequest, GetLikeDesignRequest, LikeDesignRequest, UnlikeDesignRequest } from "actions/Design";
import DesignDetail from "components/Designs/DesignDetail";

class DesignDetailContainer extends Component {
  render() {
    return (
      <DesignDetail {...this.props}/>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    DesignDetail: state.DesignDetail.status.DesignDetail,
    valid: state.Authentication.status.valid,
    userInfo: state.Authentication.status.userInfo,
    token: state.Authentication.status.token,
    like: state.DesignLike.status.like
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetDesignDetailRequest: (id, token) => {
      return dispatch(GetDesignDetailRequest(id, token))
    },
    DesignDetailResetRequest: () => {
      return dispatch(DesignDetailResetRequest())
    },
    GetLikeDesignRequest: (id, token) => {
      return dispatch(GetLikeDesignRequest(id, token))
    },
    LikeDesignRequest: (id, token) => {
      return dispatch(LikeDesignRequest(id, token))
    },
    UnlikeDesignRequest: (id, token) => {
      return dispatch(UnlikeDesignRequest(id, token))
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DesignDetailContainer));
