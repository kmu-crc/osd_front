import React, { Component } from "react";
import ClientTemplate from "templates/ClientTemplate";
import ModifyGroup from "components/Groups/ModifyGroup";

class ModifyGroupPage extends Component {
  render() {
    return(
      <ClientTemplate>
        <ModifyGroup id={this.props.match.params.id}/>
     </ClientTemplate>
    );
  }
}

export default ModifyGroupPage;
