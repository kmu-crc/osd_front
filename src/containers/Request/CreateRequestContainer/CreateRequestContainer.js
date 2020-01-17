import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import CreateRequest from 'components/Request/CreateRequest';
import { CreateRequestRequest } from "actions/Request";

class CreateRequestContainer extends Component {
  render() {
    return (<CreateRequest {...this.props} />)
  }
}

const mapStateToProps = (state) => ({
  category1: state.CategoryAll.status.category1,
  category2: state.CategoryAll.status.category2,
  success: state.DesignerBoardList.status.success,
  token: state.Authentication.status.token,
  userInfo: state.Authentication.status.userInfo,
});
const mapDispatchToProps = (dispatch) => ({
  CreateRequestRequest: (data, token) => dispatch(CreateRequestRequest(data, token)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateRequestContainer));
