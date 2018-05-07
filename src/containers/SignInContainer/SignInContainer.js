import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import SignInForm from "../../components/SignInForm";
import { SignInRequest, FBSignInRequest } from "../../actions/Registration";

class SignInContainer extends Component {
  render() {
    return (
      <SignInForm {...this.props}/>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    SignInRequest: (data) => {
      return dispatch(SignInRequest(data));
    },
    FBSignInRequest: (data) => {
      return dispatch(FBSignInRequest(data));
    }
  };
};

export default withRouter(connect(null, mapDispatchToProps)(SignInContainer));
