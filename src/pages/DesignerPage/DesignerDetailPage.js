import React, { Component } from "react";
import ClientTemplate from "templates/ClientTemplate";
import DesignerDetailContainer from "containers/Designs/DesignerDetailContainer";

export class DesignerDetailPage extends Component {
  render() {
    return(
      <ClientTemplate>
        <DesignerDetailContainer id={this.props.match.params.id}/>
     </ClientTemplate>
    );
  }
}
