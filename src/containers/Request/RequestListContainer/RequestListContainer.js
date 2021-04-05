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
  category3: state.CategoryAll.status.category3,
});
const mapDispatchToProps = (dispatch) => ({
  CreateRequestRequest: (data, token) => dispatch(CreateRequestRequest(data, token)),
  GetRequestListRequest: (type, page, cate1, cate2, cate3, sort, keyword) => dispatch(GetRequestListRequest(type, page, cate1, cate2, cate3, sort, keyword)),
  GetRequestTotalCountRequest: (category1, category2, category3) => dispatch(GetRequestTotalCountRequest(category1, category2, category3))
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestListContainer);
