import React, { Component } from "react";
import AdminTemplate from "templates/AdminTemplate";
import HotGroupManager from "../components/HotGroupManager/HotGroupManager";

class HotGroupManagerPage extends Component {
  render() {
    return (
      <AdminTemplate>
        <HotGroupManager {...this.props} />
      </AdminTemplate>
    )
  }
}

export default HotGroupManagerPage
