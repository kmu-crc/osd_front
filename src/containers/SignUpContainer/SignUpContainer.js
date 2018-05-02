import React, { Component } from "react";
import { connect } from "react-redux";
import SignUpForm from "../../components/SignUpForm";
import { SignUpRequest, FBSignUpRequest, CheckEmailRequest } from "../../actions/Authentication";

class SignUpContainer extends Component {
  render() {
    return(
      <SignUpForm {...this.props}/>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    CheckEmail: state.Authentication.checkStatus.checkEmail
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      SignUpRequest: (data) => {
        return dispatch(SignUpRequest(data));
      },
      FBSignUpRequest: (data) => {
        return dispatch(FBSignUpRequest(data));
      },
      CheckEmailRequest: (email) => {
        return dispatch(CheckEmailRequest(email));
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpContainer);
