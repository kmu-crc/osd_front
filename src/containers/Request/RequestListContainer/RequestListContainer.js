import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CreateRequestRequest, GetRequestListRequest, GetRequestTotalCountRequest } from "actions/Request";
import RequestList from "components/Request/RequestList";


class RequestListContainer extends Component {
  render() {
    return (<RequestList {...this.props} />);
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
  GetRequestListRequest: (page, sort) => dispatch(GetRequestListRequest(page, sort)),
  GetRequestTotalCountRequest: (category1, category2) => dispatch(GetRequestTotalCountRequest(category1, category2))
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestListContainer);
