import React, { Component } from "react";
import CreateGroupContainer from "containers/Groups/CreateGroupContainer";
import ClientTemplate from "templates/ClientTemplate";

class CreateGroupPage extends Component {
  render() {
    return (<ClientTemplate>
      <CreateGroupContainer />
    </ClientTemplate>);
  }
}

export default CreateGroupPage;
