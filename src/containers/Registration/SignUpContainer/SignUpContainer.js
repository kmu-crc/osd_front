import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import SignUpForm from "components/Registration/SignUpForm"
import { SignUpRequest } from "redux/modules/account"
import { CheckEmailRequest, CheckNickNameRequest } from "redux/modules/auth"

class SignUpContainer extends Component {
  render() {
    return (
      <SignUpForm {...this.props} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    CheckEmail: state.Authentication.checkStatus.checkEmail,
    CheckNickName: state.Authentication.checkStatus.checkNickName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    SignUpRequest: (data) => {
      return dispatch(SignUpRequest(data))
    },
    CheckEmailRequest: (email) => {
      return dispatch(CheckEmailRequest(email))
    },
    CheckNickNameRequest: (NickName) => {
      return dispatch(CheckNickNameRequest(NickName))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUpContainer))
