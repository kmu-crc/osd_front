import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { SignUpRequest } from "redux/modules/account"
import { CheckEmailRequest, CheckNickNameRequest } from "redux/modules/auth"
import SignUp from "components/Registration/SignUp"

class SignUpContainer extends Component {
  render() {
    return (
      <SignUp {...this.props} />
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
