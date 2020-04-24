import React, { Component } from "react";
import AdminTemplate from "templates/AdminTemplate";
import HotExpertManager from "Admin/components/HotExpertManager";

class HotExpertManagerPage extends Component {
  render() {
    return (
      <AdminTemplate>
        <HotExpertManager {...this.props} />
      </AdminTemplate>
    )
  }
}

export default HotExpertManagerPage;
