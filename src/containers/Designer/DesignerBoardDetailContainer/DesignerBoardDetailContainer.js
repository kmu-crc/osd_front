import React, { Component } from "react";
import { connect } from "react-redux";
import DesignerBoardDetail from "components/Designers/DesignerBoardDetail";
import { GetDesignerDetailRequest, GetDesignerCountRequest, } from "actions/Designer";

class DesignerBoardDetailContainer extends Component {
  render() {
    return (<DesignerBoardDetail {...this.props} />);
  }
}

const mapStateToProps = (state) => {
  return {
    DesignerBoardDetail: state.DesignerBoardDetail.status.DesignerBoardDetail,
    Count: state.DesignerBoardDetail.status.Count,
    userInfo: state.Authentication.status.userInfo,
    token: state.Authentication.status.token,
    like: state.DesignerLike.status.like,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetDesignerDetailRequest: (id) => dispatch(GetDesignerDetailRequest(id)),
    GetDesignerCountRequest: (id) => dispatch(GetDesignerCountRequest(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DesignerBoardDetailContainer);
