import React, { Component } from "react";
import GroupDetailContainer from "containers/Groups/GroupDetailContainer";
import ClientTemplate from "templates/ClientTemplate";

export class GroupDetailPage extends Component {
  render() {
    return (
      <ClientTemplate>
        <GroupDetailContainer
          id={this.props.match.params.id}
          type={this.props.match.params.type ? this.props.match.params.type : null}
          sort={this.props.match.params.sorting ? this.props.match.params.sorting : null}
          history={this.props.history} />
      </ClientTemplate>
    );
  }
}

