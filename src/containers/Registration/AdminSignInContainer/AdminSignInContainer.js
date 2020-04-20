import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import AdminSignInForm from "components/Registration/AdminSignInForm";
import { AdminSignInRequest } from "actions/Registration";

class AdminSignInContainer extends Component {
  render() {
    return (<AdminSignInForm {...this.props}/>);
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    AdminSignInRequest: ( data) => {
      return dispatch(AdminSignInRequest( data));
    }
  };
};

export default withRouter(connect(null, mapDispatchToProps)(AdminSignInContainer));
