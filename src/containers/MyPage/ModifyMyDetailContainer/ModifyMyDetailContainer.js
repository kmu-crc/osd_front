import React, { Component } from 'react'
import { connect } from 'react-redux'
import { GetMyDetailRequest, UpdateUserDetailRequest, DeleteUserRequest } from "redux/modules/personal"
import { GetCategoryAllRequest } from "redux/modules/category"
import { CheckNickNameRequest, SignOutRequest } from "redux/modules/auth"

import ModifyMyDetail from "components/Users/ModifyMyDetail"

class ModifyMyDetailContainer extends Component {
  componentDidMount() {
    this.props.GetCategoryAllRequest();
    this.props.GetMyDetailRequest(this.props.token);
  }
  render() {
    console.log("MYDETAIL::::::", this.props);
    return (<ModifyMyDetail {...this.props} />)
  }
}

const mapStateToProps = (state) => {
  return {
    Count: state.Designer.status.Count,
    userInfo: state.Authentication.status.userInfo,
    MyDetail: state.Personal.status.MyDetail,
    token: state.Authentication.status.token,
    category1: state.Category.status.category1,
    category2: state.Category.status.category2,
    category3: state.Category.status.category3,
    CheckNickName: state.Authentication.checkStatus.checkNickName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    GetMyDetailRequest: (token) => {
      return dispatch(GetMyDetailRequest(token))
    },
    GetCategoryAllRequest: () => {
      return dispatch(GetCategoryAllRequest())
    },
    UpdateUserDetailRequest: (data, token) => {
      return dispatch(UpdateUserDetailRequest(data, token))
    },
    CheckNickNameRequest: (NickName) => {
      return dispatch(CheckNickNameRequest(NickName))
    },
    DeleteUserRequest: (token) => {
      return dispatch(DeleteUserRequest(token))
    },
    SignOutRequest: () => {
      return dispatch(SignOutRequest())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModifyMyDetailContainer)
