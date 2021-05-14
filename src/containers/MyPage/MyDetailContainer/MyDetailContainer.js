import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetMyDetailRequest, GetMyDesignListRequest, ModifyUserDetailRequest } from "actions/Users/MyDetail";
import MyDetail from "components/Users/MyDetail";
import MyDetail_mobile from "mobileComponents/MyDetail_mobile"
import { getOrderListRequest } from "actions/Product";
import { SignOutRequest } from "actions/Registration";

class MyDetailContainer extends Component {
  componentWillMount() {
    this.props.GetMyDetailRequest(this.props.token);
  }
  render() {
    return (
      <React.Fragment>
        {
          window.innerWidth>=500?
          <MyDetail {...this.props} />
          :
          <MyDetail_mobile {...this.props}/>
        }
      </React.Fragment>

    );
  }
}

const mapStateToProps = (state) => ({
  token: state.Authentication.status.token,
  valid: state.Authentication.status.valid,
  userInfo: state.Authentication.status.userInfo,
  MyDetail: state.MyDetail.status.MyDetail,
  OrderList: state.OrderList.status.OrderList,
  isActive: state.OpenDesign.isActive,
  signed: state.SignIn.status.success,
});

const mapDispatchToProps = (dispatch) => ({
  GetMyDetailRequest: (token) => dispatch(GetMyDetailRequest(token)),
  GetMyDesignListRequest: (token, page) => dispatch(GetMyDesignListRequest(token, page)),
  getOrderListRequest: (id) => dispatch(getOrderListRequest(id)),
  ModifyUserDetailRequest: (id, data, token) => dispatch(ModifyUserDetailRequest(id, data, token)),
  SignOutRequest: () => dispatch(SignOutRequest()),

});

export default connect(mapStateToProps, mapDispatchToProps)(MyDetailContainer);
