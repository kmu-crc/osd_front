import React, { Component } from "react";
import ClientTemplate from "templates/ClientTemplate";
import ModifyDesign from "components/Designs/ModifyDesign";

class ModifyDesignPage extends Component {
  render() {
    return(
      <ClientTemplate>
        <ModifyDesign id={this.props.match.params.id} history={this.props.match.params.history}/>
     </ClientTemplate>
    );
  }
}

export default ModifyDesignPage;
