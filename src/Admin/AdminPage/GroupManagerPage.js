import React, { Component } from "react";
import AdminTemplate from "templates/AdminTemplate";
import GroupManager from "../components/GroupManager/GroupManager";

class GroupManagerPage extends Component {
  render() {
    return (
      <AdminTemplate>
        <GroupManager {...this.props} />
      </AdminTemplate>
    )
  }
}

export default GroupManagerPage
