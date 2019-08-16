import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import Header from "components/Header"
import { SignInRequest, SignOutRequest } from "redux/modules/account"
import { SetActive } from "redux/modules/auth"

class HeaderContainer extends Component {
  render() {
    return (
      <Header {...this.props} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.Authentication.status.token,
    valid: state.Authentication.status.valid,
    isLoggedIn: state.Authentication.status.isLoggedIn,
    // notification: state.Authentication.status.notification,
    userInfo: state.Authentication.status.userInfo,
    isActive: state.Authentication.isActive
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // GetNotification: ()=>{
    // return dispatch(GetNotification())
    // },
    SignInRequest: (data) => {
      return dispatch(SignInRequest(data))
    },
    SignOutRequest: () => {
      return dispatch(SignOutRequest());
    },
    SetActive: (active) => {
      return dispatch(SetActive(active))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderContainer))
