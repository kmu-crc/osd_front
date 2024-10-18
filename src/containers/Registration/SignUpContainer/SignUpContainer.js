import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { SignUpRequest } from "redux/modules/account"
import { CheckEmailRequest, CheckNickNameRequest } from "redux/modules/auth"
import SignUp from "components/Registration/SignUp"
import SignUpMobile from "components/Registration/SignUpMobile"
import { isMobile } from "constant";

class SignUpContainer extends Component {
  render() {
    return (
      isMobile()
        ? <SignUpMobile {...this.props} />
        : <SignUp {...this.props} />
    );
  };
};

const mapStateToProps = (state) => ({
  CheckEmail: state.Authentication.checkStatus.checkEmail,
  CheckNickName: state.Authentication.checkStatus.checkNickName
});

const mapDispatchToProps = (dispatch) => ({
  SignUpRequest: (data) => dispatch(SignUpRequest(data)),
  CheckEmailRequest: (email) => dispatch(CheckEmailRequest(email)),
  CheckNickNameRequest: (NickName) => dispatch(CheckNickNameRequest(NickName))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUpContainer));
