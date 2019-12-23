import React, { Component } from "react";
import { connect } from "react-redux";
import { GetDesignerDetailRequest, GetDesignerCountRequest, GetLikeDesignerRequest, LikeDesignerRequest, UnlikeDesignerRequest } from "actions/Designer";
import MakerDetail from "components/Makers/MakerDetail";

class MakerDetailContainer extends Component {
  render() {
    return(
      <MakerDetail {...this.props}/>
    );
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
      },
      GetDesignerCountRequest: (id) => {
        return dispatch(GetDesignerCountRequest(id))
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MakerDetailContainer);
