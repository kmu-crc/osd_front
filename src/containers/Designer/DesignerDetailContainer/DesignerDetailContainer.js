import React, { Component } from "react"
import { connect } from "react-redux"
import { GetDesignerDetailRequest, GetDesignerCountRequest, GetLikeDesignerRequest, LikeDesignerRequest, UnlikeDesignerRequest } from "redux/modules/designer"

import DesignerPageHeader from "components/Designers/DesignerPageHeader"
import DesignerPageBody from "components/Designers/DesignerPageBody"
class DesignerDetailContainer extends Component {
  render() {
     // return <DesignerDetail {...this.props}/>
    return (
      <React.Fragment>
        <DesignerPageHeader {...this.props}/>
        <DesignerPageBody {...this.props}/>
      </React.Fragment>
    );
    }
}

const mapStateToProps = (state) => {
  return {
    DesignerDetail: state.Designer.status.DesignerDetail,
    userInfo: state.Authentication.status.userInfo,
    token: state.Authentication.status.token,
    like: state.Designer.status.like,
    //Count: state.Designer.status.Count
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

export default connect(mapStateToProps, mapDispatchToProps)(DesignerDetailContainer);
