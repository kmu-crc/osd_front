import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import AdminHeader from "components/Commons/AdminHeader";
import { AdminSignOutRequest } from "actions/Registration";
import { SetActive } from "actions/OpenDesign";

class AdminHeaderContainer extends Component {
  render() {
    return(
      <AdminHeader {...this.props}/>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    admin_valid: state.Authentication.status.admin_valid,
    admin_token: state.Authentication.status.admin_token,
    userInfo: state.Authentication.status.userInfo,
    isActive: state.OpenDesign.isActive
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    AdminSignOutRequest: () => {
      return dispatch(AdminSignOutRequest());
    },
    SetActive: (active) => {
      return dispatch(SetActive(active))
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminHeaderContainer));
