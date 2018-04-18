import React, { Component } from "react";
import { connect } from "react-redux";
import SignUpPage from "../../pages/SignUpPage";
import { SignUpRequest, FBSignUpRequest } from "../../actions/Authentication";

class SignUpContainer extends Component {
  render() {
    return(
      <SignUpPage {...this.props}/>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    DesignList: state.DesignList.status.DesignList
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      SignUpRequest: (data) => {
        return dispatch(SignUpRequest(data));
      },
      FBSignUpRequest: (data) => {
        return dispatch(FBSignUpRequest(data))
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpContainer);
