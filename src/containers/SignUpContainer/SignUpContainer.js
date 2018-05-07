import React, { Component } from "react";
import {withRouter} from "react-router-dom";
import { connect } from "react-redux";
import SignUpForm from "../../components/SignUpForm";
import { SignUpRequest, FBSignUpRequest } from "../../actions/Registration";
import { CheckEmailRequest, CheckNickNameRequest } from "../../actions/Authentication";

class SignUpContainer extends Component {
  render() {
    return(
      <SignUpForm {...this.props}/>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    CheckEmail: state.Authentication.checkStatus.checkEmail,
    CheckNickName: state.Authentication.checkStatus.checkNickName
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
      },
      CheckNickNameRequest: (NickName) => {
        return dispatch(CheckNickNameRequest(NickName));
      }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUpContainer));
