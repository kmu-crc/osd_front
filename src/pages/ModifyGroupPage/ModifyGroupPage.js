import React, { Component } from "react";
import ModifyGroupContainer from "containers/Groups/ModifyGroupInfoContainer"
import ClientTemplate from "templates/ClientTemplate";

class ModifyGroupPage extends Component {
  render() {
    return(
      <ClientTemplate>
        <ModifyGroupContainer id={this.props.match.params.id} {...this.props}/>
      </ClientTemplate>
    );
  }
}

export default ModifyGroupPage;
