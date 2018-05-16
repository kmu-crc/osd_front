import React, { Component } from "react";
import ClientTemplate from "templates/ClientTemplate";
import CreateGroup from "components/Groups/CreateGroup";

class CreateGroupPage extends Component {
  render() {
    return(
      <ClientTemplate>
        <CreateGroup />
     </ClientTemplate>
    );
  }
}

export default CreateGroupPage;
