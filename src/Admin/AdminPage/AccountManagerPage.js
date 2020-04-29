import React, { Component } from "react";
import AdminTemplate from "templates/AdminTemplate";
import AccountManager from "../components/AccountManager/AccountManager";

class AccountManagerPage extends Component {
  render() {
    return (
      <AdminTemplate>
        <AccountManager {...this.props} />
      </AdminTemplate>
    )
  }
}

export default AccountManagerPage;
