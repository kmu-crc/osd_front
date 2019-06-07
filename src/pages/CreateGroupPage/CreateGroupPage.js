import React, { Component } from "react";
import ClientTemplate from "templates/ClientTemplate";
import CreateGroupContainer from "containers/Groups/CreateGroupContainer";

class CreateGroupPage extends Component {
  render() {
    return(
      <ClientTemplate>
        <CreateGroupContainer />
     </ClientTemplate>
    );
  }
}

export default CreateGroupPage;
