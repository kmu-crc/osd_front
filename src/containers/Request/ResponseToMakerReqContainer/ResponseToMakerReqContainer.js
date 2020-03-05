import React, { Component } from 'react';
import ResponseToMakerReq from "components/Makers/ResponseToMakerReq";
import { connect } from "react-redux";
import { CreateRequestRequest } from "actions/Request";

class ResponseToMakerReqContainer extends Component {
  render() {
    return (<ResponseToMakerReq {...this.props} />)
  }
};

const mapStateToProps = (state) => ({
  token: state.Authentication.status.token,
  userInfo: state.Authentication.status.userInfo,
  category1: state.CategoryAll.status.category1,
  category2: state.CategoryAll.status.category2,
});
const mapDispatchToProps = (dispatch) => ({
  CreateRequestRequest: (data, token) => dispatch(CreateRequestRequest(data, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResponseToMakerReqContainer);
