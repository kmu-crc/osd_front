import React, { Component } from 'react'
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import SignInForm from "components/Registration/SignInForm"
import { SignInRequest, SignOutRequest, CheckEmailRequest } from "redux/modules/auth"
import { FindPwRequest } from "redux/modules/account";

class SignInContainer extends Component {
  render() {
    return (
      <SignInForm {...this.props} />
    );
  }
}

const mapStateTopProps = (state) => {
  return {
    CheckEmail: state.Authentication.checkStatus.checkEmail,
    status: state.Account.FindPw.status,
    valid: state.Authentication.status.valid,
    userInfo: state.Authentication.status.userInfo,
    isLoggedIn: state.Authentication.status.isLoggedIn
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    SignInRequest: (data) => {
      return dispatch(SignInRequest(data))
    },
    SignOutRequest: () => {
      return dispatch(SignOutRequest())
    },
    FindPwRequest: (data) => {
      return dispatch(FindPwRequest(data))
    },
    CheckEmailRequest: (email) => {
      return dispatch(CheckEmailRequest(email))
    }
  }
}

export default withRouter(connect(mapStateTopProps, mapDispatchToProps)(SignInContainer))
