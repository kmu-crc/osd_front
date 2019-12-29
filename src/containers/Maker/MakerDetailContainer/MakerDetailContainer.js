import React, { Component } from "react";
import { connect } from "react-redux";
import { GetDesignerDetailRequest, GetDesignerCountRequest, GetLikeDesignerRequest, LikeDesignerRequest, UnlikeDesignerRequest } from "actions/Designer";
import MakerDetail from "components/Makers/MakerDetail";

class MakerDetailContainer extends Component {
  render() {
    return (<MakerDetail {...this.props} />);
  }
}

const mapStateToProps = (state) => {
  return {
    MakerDetail: state.DesignerDetail.status.DesignerDetail,
    userInfo: state.Authentication.status.userInfo,
    token: state.Authentication.status.token,
    like: state.DesignerLike.status.like,
    Count: state.DesignerDetail.status.Count
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetDesignerDetailRequest: (id) => dispatch(GetDesignerDetailRequest(id)),
    GetLikeDesignerRequest: (id, token) => dispatch(GetLikeDesignerRequest(id, token)),
    LikeDesignerRequest: (id, token) => dispatch(LikeDesignerRequest(id, token)),
    UnlikeDesignerRequest: (id, token) => dispatch(UnlikeDesignerRequest(id, token)),
    GetDesignerCountRequest: (id) => dispatch(GetDesignerCountRequest(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MakerDetailContainer);
