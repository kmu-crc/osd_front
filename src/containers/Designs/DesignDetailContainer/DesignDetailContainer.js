import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import DesignDetail from "components/Designs/DesignDetail";
import {
  ForkDesignRequest, ForkDesignListRequest, JoinDesignRequest, GetoutDesignRequest,
  DesignWaitingListRequest, GetCountDesignCommentRequest,
  GetDesignDetailRequest, DesignDetailResetRequest, UpdateDesignViewRequest,
  GetDesignCountRequest, GetLikeDesignRequest, LikeDesignRequest, UnlikeDesignRequest
} from "redux/modules/design";

class DesignDetailContainer extends Component {
  render() {
    return (<DesignDetail {...this.props} />)
  }
};

const mapStateToProps = (state) => {
  return {
    DesignForked: state.Design.status.DesignForked,
    status: state.Design.DesignDetail.status,
    new_design_id: state.Design.status.new_design_id,
    forkDesignList: state.Design.status.list,
    DesignDetail: state.Design.status.DesignDetail,
    Count: state.Design.status.Count,
    userInfo: state.Authentication.status.userInfo,
    valid: state.Authentication.status.valid,
    token: state.Authentication.status.token,
    like: state.Design.status.like,
    WaitingList: state.Design.status.WaitingList,
    CountDesignComment: state.DesignComment.status.CountDesignComment,
  }
};

const mapDispatchToProps = (dispatch) => ({
  GetDesignDetailRequest: (id, token) => {
    return dispatch(GetDesignDetailRequest(id, token))
  },
  GetCountDesignCommentRequest: (id) => {
    return dispatch(GetCountDesignCommentRequest(id))
  },
  DesignWaitingListRequest: (id, token) => {
    return dispatch(DesignWaitingListRequest(id, token))
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
  JoinDesignRequest: (id, data, flag, token) => {
    return dispatch(JoinDesignRequest(id, data, flag, token))
  },
  GetoutDesignRequest: (id, token) => {
    return dispatch(GetoutDesignRequest(id, token))
  },
  ForkDesignRequest: (designId, userId, token) => {
    return dispatch(ForkDesignRequest(designId, userId, token))
  },
  ForkDesignListRequest: (id, token) => {
    return dispatch(ForkDesignListRequest(id, token))
  }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DesignDetailContainer));
