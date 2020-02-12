import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Header from "components/Commons/Header";
import { SignOutRequest } from "actions/Registration";
import { SetActive } from "actions/OpenDesign";
// import {GetNotification} from "actions/Commons/Notification"
// notification: state.Authentication.status.notification,
// GetNotification: ()=>{
// return dispatch(GetNotification())
// },

class HeaderContainer extends Component {
  render() {
    return (<Header {...this.props} />);
  }
}

const mapStateToProps = (state) => ({
  token: state.Authentication.status.token,
  valid: state.Authentication.status.valid,
  userInfo: state.Authentication.status.userInfo,
  isActive: state.OpenDesign.isActive
});
const mapDispatchToProps = (dispatch) => ({
  SignOutRequest: () => dispatch(SignOutRequest()),
  SetActive: (active) => dispatch(SetActive(active))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderContainer));
