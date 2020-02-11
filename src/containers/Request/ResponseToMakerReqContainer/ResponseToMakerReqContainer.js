import React, { Component } from 'react';
import ResponseToMakerReq from "components/Makers/ResponseToMakerReq";
import { connect } from "react-redux";

class ResponseToMakerReqContainer extends Component {
  render() {
    return (<ResponseToMakerReq {...this.props}/>)
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.Authentication.status.token,
    userInfo: state.Authentication.status.userInfo,
    category1: state.CategoryAll.status.category1,
    category2: state.CategoryAll.status.category2,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResponseToMakerReqContainer);
