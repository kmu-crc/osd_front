import React, { Component } from "react";
import AdminTemplate from "templates/AdminTemplate";
import HotDesignManager from "../components/HotDesignManager/HotDesignManager";

class HotDesignManagerPage extends Component {
  render() {
    return (
      <AdminTemplate>
        <HotDesignManager {...this.props} />
      </AdminTemplate>
    )
  }
}

export default HotDesignManagerPage;
