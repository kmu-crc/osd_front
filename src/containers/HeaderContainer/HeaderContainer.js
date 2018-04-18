import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Header from "../../components/Header";
import { SignOutRequest } from "../../actions/Authentication";

class HeaderContainer extends Component {
  render() {
    return(
      <Header {...this.props}/>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    valid: state.Authentication.status.valid
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    SignOutRequest: () => {
      return dispatch(SignOutRequest());
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderContainer));
