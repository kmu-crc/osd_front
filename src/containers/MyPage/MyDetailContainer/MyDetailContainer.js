import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetMyDetailRequest, GetMyDesignListRequest } from "actions/Users/MyDetail";
import MyDetail from "components/Users/MyDetail";
import {getOrderListRequest} from "actions/Product";

class MyDetailContainer extends Component {
  componentWillMount() {
    // console.log(this.props.token);
    this.props.GetMyDetailRequest(this.props.token);
  }

  render() {
    return(<MyDetail {...this.props}/>);
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.Authentication.status.userInfo,
    MyDetail: state.MyDetail.status.MyDetail,
    OrderList: state.OrderList.status.OrderList,
  };
}; 

const mapDispatchToProps = (dispatch) => {
  return {
    GetMyDetailRequest: (token) => {
      return dispatch(GetMyDetailRequest(token));
    },
    GetMyDesignListRequest: (token, page) => {
      return dispatch(GetMyDesignListRequest(token, page));
    },
    getOrderListRequest: (id) => {
      return dispatch(getOrderListRequest(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyDetailContainer);
