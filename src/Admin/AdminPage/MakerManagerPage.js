import React, { Component } from "react";
import AdminTemplate from "templates/AdminTemplate";
import MakerManager from "../components/MakerManager/MakerManager";

class MakerManagerPage extends Component {
  render() {
    return (
      <AdminTemplate>
        <MakerManager {...this.props} />
      </AdminTemplate>
    )
  }
}

export default MakerManagerPage;
