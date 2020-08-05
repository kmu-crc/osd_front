import React, { Component } from "react";
import DesignDetailContainer from "containers/Designs/DesignDetailContainer";
import ClientTemplate from "templates/ClientTemplate";

export class DesignDetailPage extends Component {
  render() {
    return (<ClientTemplate>
      <DesignDetailContainer id={this.props.match.params.id} />
    </ClientTemplate>);
  }
}
