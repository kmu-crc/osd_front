import React, { Component } from "react";
import DesignerDetailContainer from "containers/Designer/DesignerDetailContainer";

export class DesignerDetailPage extends Component {
  render() {
    return(
        <DesignerDetailContainer id={this.props.match.params.id}
                                 type={this.props.match.params.type? this.props.match.params.type : null}
                                 history={this.props.history}/>
    );
  }
}
