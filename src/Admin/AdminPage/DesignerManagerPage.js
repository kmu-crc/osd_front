import React, { Component } from "react";
import AdminTemplate from "templates/AdminTemplate";
import DesignerManager from "../components/DesignerManager/DesignerManager";

class DesignManagerPage extends Component {
  render() {
    return (
      <AdminTemplate>
        <DesignerManager {...this.props} />
      </AdminTemplate>
    )
  }
}

export default DesignManagerPage;
