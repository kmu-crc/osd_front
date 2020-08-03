import React, { Component } from "react";
import ModifyDesignContainer from "containers/Designs/ModifyDesignInfoContainer/ModifyDesignInfoContainer";
import ClientTemplate from "templates/ClientTemplate";

class ModifyDesignPage extends Component {
  render() {
    return (
      <ClientTemplate>
        <ModifyDesignContainer id={this.props.match.params.id} />
      </ClientTemplate>
    );
  }
}

export default ModifyDesignPage;
