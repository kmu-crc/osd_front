import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { GetDesignDetailRequest, DesignDetailResetRequest, UpdateDesignViewRequest, GetDesignCountRequest, GetLikeDesignRequest, LikeDesignRequest, UnlikeDesignRequest } from "actions/Design";
import { DeleteDesignRequest } from "actions/Designs/DeleteDesign";
import DesignDetail from "components/Designs/DesignDetail";
import { JoinDesignRequest, GetoutDesignRequest } from "actions/Designs/JoinDesign";

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
    like: state.DesignLike.status.like,
    Count: state.DesignDetail.status.Count
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
    },
    GetDesignCountRequest: (id) => {
      return dispatch(GetDesignCountRequest(id))
    },
    UpdateDesignViewRequest: (id) => {
      return dispatch(UpdateDesignViewRequest(id))
    },
    DeleteDesignRequest: (id, token) => {
      return dispatch(DeleteDesignRequest(id, token))
    },
    JoinDesignRequest: (id, data, flag, token) => {
      return dispatch(JoinDesignRequest(id, data, flag, token))
    },
    GetoutDesignRequest: (id, token) => {
      return dispatch(GetoutDesignRequest(id, token))
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DesignDetailContainer));
