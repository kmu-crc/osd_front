import React, { Component } from "react";
import DesignerBoardDetailContainer from "containers/Designer/DesignerBoardDetailContainer";

export class DesignerBoardDetailPage extends Component {
  render() {
    return (
      <DesignerBoardDetailContainer
        id={this.props.match.params.id}
        type={this.props.match.params.type ? this.props.match.params.type : null}
        history={this.props.history} />
    );
  }
}
