import React, { Component } from "react";
import ModifyGroupContainer from "containers/Groups/ModifyGroupInfoContainer"

class ModifyGroupPage extends Component {
  render() {
    return(
        <ModifyGroupContainer id={this.props.match.params.id} {...this.props}/>
    );
  }
}

export default ModifyGroupPage;
