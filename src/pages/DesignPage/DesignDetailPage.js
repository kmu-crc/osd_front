import React, { Component } from "react";
import ClientTemplate from "../../templates/ClientTemplate";
import DesignDetailContainer from "../../containers/DesignDetailContainer";

export class DesignDetailPage extends Component {
  render() {
    return(
      <ClientTemplate>
        <DesignDetailContainer id={this.props.match.params.id}/>
     </ClientTemplate>
    );
  }
}
