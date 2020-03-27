import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetMyDetailRequest, GetMyDesignListRequest, ModifyUserDetailRequest } from "actions/Users/MyDetail";
import MyDetail from "components/Users/MyDetail";
import { getOrderListRequest } from "actions/Product";

class MyDetailContainer extends Component {
  componentWillMount() {
    this.props.GetMyDetailRequest(this.props.token);
  }
  render() {
    return (<MyDetail {...this.props} />);
  }
}

const mapStateToProps = (state) => ({
  token: state.Authentication.status.token,
  userInfo: state.Authentication.status.userInfo,
  MyDetail: state.MyDetail.status.MyDetail,
  OrderList: state.OrderList.status.OrderList,
});

const mapDispatchToProps = (dispatch) => ({
  GetMyDetailRequest: (token) => dispatch(GetMyDetailRequest(token)),
  GetMyDesignListRequest: (token, page) => dispatch(GetMyDesignListRequest(token, page)),
  getOrderListRequest: (id) => dispatch(getOrderListRequest(id)),
  ModifyUserDetailRequest: (id, data, token) => dispatch(ModifyUserDetailRequest(id, data, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyDetailContainer);
