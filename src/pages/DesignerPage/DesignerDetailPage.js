import React, { Component } from "react";
import ClientTemplate from "templates/ClientTemplate";
import DesignerDetailContainer from "containers/Designer/DesignerDetailContainer";

export class DesignerDetailPage extends Component {
  render() {
    return(
      <ClientTemplate>
        <DesignerDetailContainer id={this.props.match.params.id}
                                 type={this.props.match.params.type? this.props.match.params.type : null}
                                 history={this.props.history}/>
     </ClientTemplate>
    );
  }
}
