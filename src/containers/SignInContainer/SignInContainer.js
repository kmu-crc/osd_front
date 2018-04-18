import React, { Component } from 'react';
import { connect } from "react-redux";
import SignInPage from "../../pages/SignInPage";
import { SignInRequest, FBSignInRequest } from "../../actions/Authentication";

class SignInContainer extends Component {
  render() {
    return (
      <SignInPage {...this.props}/>
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

export default connect(null, mapDispatchToProps)(SignInContainer);
