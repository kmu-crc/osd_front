import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Header from "components/Commons/Header";
import { SignOutRequest } from "actions/Registration";
import { SetActive } from "actions/OpenDesign";

class HeaderContainer extends Component {
  render() {
    return(
      <Header {...this.props}/>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    valid: state.Authentication.status.valid,
    userInfo: state.Authentication.status.userInfo,
    isActive: state.OpenDesign.isActive
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    SignOutRequest: () => {
      return dispatch(SignOutRequest());
    },
    SetActive: (active) => {
      return dispatch(SetActive(active))
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderContainer));
