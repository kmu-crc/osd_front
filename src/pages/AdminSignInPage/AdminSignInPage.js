import React, { Component } from "react";
import AdminTemplate from "templates/AdminTemplate";
import AdminSignInContainer from "containers/Registration/AdminSignInContainer";


class AdminSignInPage extends Component {
  render() {
    return (
      <AdminTemplate>
        <AdminSignInContainer />
      </AdminTemplate>
    );
  }
}

export default AdminSignInPage;
