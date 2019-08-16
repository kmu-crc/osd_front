import React, { Component } from 'react'
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import SignInForm from "components/Registration/SignInForm"
import { SignInRequest } from "redux/modules/account"

class SignInContainer extends Component {
  render() {
    return (
      <SignInForm {...this.props} />
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    SignInRequest: (data) => {
      return dispatch(SignInRequest(data))
    }
  }
}

export default withRouter(connect(null, mapDispatchToProps)(SignInContainer))
