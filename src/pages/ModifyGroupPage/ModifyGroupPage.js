import React, { Component } from "react";
import ModifyGroup from "components/Groups/ModifyGroup";

class ModifyGroupPage extends Component {
  render() {
    return(
        <ModifyGroup id={this.props.match.params.id} history={this.props.history}/>
    );
  }
}

export default ModifyGroupPage;
