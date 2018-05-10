import React, { Component } from "react";
import ClientTemplate from "../../templates/ClientTemplate";
import GroupDetailContainer from "../../containers/GroupDetailContainer";

export class GroupDetailPage extends Component {
  render() {
    return(
      <ClientTemplate>
        <GroupDetailContainer id={this.props.match.params.id} history={this.props.history}/>
     </ClientTemplate>
    );
  }
}

