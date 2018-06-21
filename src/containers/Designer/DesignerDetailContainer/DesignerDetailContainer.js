import React, { Component } from "react";
import { connect } from "react-redux";
import { GetDesignerDetailRequest, GetLikeDesignerRequest, LikeDesignerRequest, UnlikeDesignerRequest } from "actions/Designer";
import DesignerDetail from "components/Designers/DesignerDetail";

class GroupDetailContainer extends Component {
  render() {
    return(
      <DesignerDetail {...this.props}/>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    DesignerDetail: state.DesignerDetail.status.DesignerDetail,
    userInfo: state.Authentication.status.userInfo,
    token: state.Authentication.status.token,
    like: state.DesignerLike.status.like
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      GetDesignerDetailRequest: (id) => {
        return dispatch(GetDesignerDetailRequest(id))
      },
      GetLikeDesignerRequest: (id, token) => {
        return dispatch(GetLikeDesignerRequest(id, token))
      },
      LikeDesignerRequest: (id, token) => {
        return dispatch(LikeDesignerRequest(id, token))
      },
      UnlikeDesignerRequest: (id, token) => {
        return dispatch(UnlikeDesignerRequest(id, token))
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupDetailContainer);
