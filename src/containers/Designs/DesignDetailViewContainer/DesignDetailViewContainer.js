import React, { Component } from "react";
import { connect } from "react-redux";
import DetailView from "components/Designs/DetailView";
import DetailViewMobile from "components/Designs/DetailViewMobile";
import { isMobile } from "constant";

import { GetDesignDetailViewRequest, UpdateDesignTime, ChangeToProjectRequest, DesignDetailViewResetRequest, GetCardCommentRequest, CreateCardCommentRequest, DeleteCardCommentRequest } from "redux/modules/design";

class DesignDetailViewContainer extends Component {
  render() {
    return (isMobile()
      ? <DetailViewMobile {...this.props} />
      : <DetailView {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    DesignDetailView: state.Design.status.DesignDetailView,
    token: state.Authentication.status.token,
    userInfo: state.Authentication.status.userInfo,
    Comment: state.DesignComment.status.Comment,
    isTeam: state.Design.status.DesignDetail.is_team
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetDesignDetailViewRequest: (id, token) => {
      return dispatch(GetDesignDetailViewRequest(id, token))
    },
    ChangeToProjectRequest: (id, token) => {
      return dispatch(ChangeToProjectRequest(id, token))
    },
    GetCardCommentRequest: (design_id, card_id) => {
      return dispatch(GetCardCommentRequest(design_id, card_id))
    },
    CreateCardCommentRequest: (data, design_id, card_id, token) => {
      return dispatch(CreateCardCommentRequest(data, design_id, card_id, token))
    },
    DeleteCardCommentRequest: (design_id, card_id, comment_id, token) => {
      return dispatch(DeleteCardCommentRequest(design_id, card_id, comment_id, token))
    },
    DesignDetailViewResetRequest: () => {
      return dispatch(DesignDetailViewResetRequest())
    },
    UpdateDesignTime: (id, token) => {
      return dispatch(UpdateDesignTime(id, token))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DesignDetailViewContainer);
