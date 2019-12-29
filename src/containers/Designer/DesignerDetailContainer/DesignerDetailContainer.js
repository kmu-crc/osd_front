import React, { Component } from "react";
import { connect } from "react-redux";
import DesignerDetail from "components/Designers/DesignerDetail";
import {
  GetDesignerDetailRequest, GetDesignerCountRequest, GetLikeDesignerRequest,
  LikeDesignerRequest, UnlikeDesignerRequest
} from "actions/Designer";

class GroupDetailContainer extends Component {
  render() {
    return (<DesignerDetail {...this.props} />);
  }
}

const mapStateToProps = (state) => {
  return {
    DesignerDetail: state.DesignerDetail.status.DesignerDetail,
    userInfo: state.Authentication.status.userInfo,
    token: state.Authentication.status.token,
    like: state.DesignerLike.status.like,
    Count: state.DesignerDetail.status.Count
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetLikeDesignerRequest: (id, token) => dispatch(GetLikeDesignerRequest(id, token)),
    UnlikeDesignerRequest: (id, token) => dispatch(UnlikeDesignerRequest(id, token)),
    LikeDesignerRequest: (id, token) => dispatch(LikeDesignerRequest(id, token)),
    GetDesignerDetailRequest: (id) => dispatch(GetDesignerDetailRequest(id)),
    GetDesignerCountRequest: (id) => dispatch(GetDesignerCountRequest(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupDetailContainer);
