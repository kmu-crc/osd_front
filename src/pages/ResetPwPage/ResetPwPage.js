import React, { Component } from "react";
import ResetPwContainer from "containers/Registration/ResetPwContainer";
import ClientTemplate from "templates/ClientTemplate"

class ResetPwPage extends Component {
  render() {
    return (
      <ClientTemplate>
        <ResetPwContainer />
      </ClientTemplate>
    );
  }
}

export default ResetPwPage;
