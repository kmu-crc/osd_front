import React, { Component } from "react";
import AdminTemplate from "templates/AdminTemplate";
import RequestManager from "../components/RequestManager/RequestManager";

class RequestManagerPage extends Component {
  render() {
    return (
      <AdminTemplate>
        <RequestManager {...this.props} />
      </AdminTemplate>
    )
  }
}

export default RequestManagerPage;
