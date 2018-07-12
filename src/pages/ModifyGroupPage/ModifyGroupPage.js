import React, { Component } from "react";
import ClientTemplate from "templates/ClientTemplate";
import ModifyGroup from "components/Groups/ModifyGroup";

class ModifyGroupPage extends Component {
  render() {
    return(
      <ClientTemplate>
        <ModifyGroup id={this.props.match.params.id} history={this.props.history}/>
     </ClientTemplate>
    );
  }
}

export default ModifyGroupPage;
