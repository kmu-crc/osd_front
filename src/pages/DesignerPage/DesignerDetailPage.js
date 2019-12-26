import React, { Component } from "react";
import DesignerDetailContainer from "containers/Designer/DesignerDetailContainer";

export class DesignerDetailPage extends Component {
  render() {
    return (
      <DesignerDetailContainer
        history={this.props.history}
        id={this.props.match.params.id}
        type={this.props.match.params.type ? this.props.match.params.type : null} />
    );
  }
}
