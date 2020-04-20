import React, { Component } from "react";
import AdminTemplate from "templates/AdminTemplate";
import DesignManager from "../components/DesignManager/DesignManager";

class DesignManagerPage extends Component {
  render() {
    return (
      <AdminTemplate>
        <DesignManager {...this.props} />
      </AdminTemplate>
    )
  }
}

export default DesignManagerPage;
