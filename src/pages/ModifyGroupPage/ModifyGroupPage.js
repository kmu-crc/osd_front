import React, { Component } from "react";
import ModifyGroup from "components/Groups/ModifyGroup";
import ModifyGroupContainer from "containers/Groups/ModifyGroupInfoContainer"

class ModifyGroupPage extends Component {
  render() {
    return(
        <ModifyGroupContainer id={this.props.match.params.id} {...this.props}/>
        //<ModifyGroup id={this.props.match.params.id} history={this.props.history}/>
    );
  }
}

export default ModifyGroupPage;
