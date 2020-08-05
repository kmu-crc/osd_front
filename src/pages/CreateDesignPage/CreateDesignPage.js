import React, { Component } from "react";
import CreateDesignContainer from "containers/Designs/CreateDesignContainer";
import ClientTemplate from "templates/ClientTemplate";

class CreateDesignPage extends Component {
  render() {
    return (
      <ClientTemplate>
        <CreateDesignContainer />
      </ClientTemplate>
    );
  }
}

export default CreateDesignPage;
