import React, { Component } from "react";
import RequestDetailContainer from "containers/Request/RequestDetailContainer";

export class RequestDetailPage extends Component {
  render() {
    return (
      <RequestDetailContainer
        id={this.props.match.params.id}
        type={this.props.match.params.type ? this.props.match.params.type : null}
        history={this.props.history} />
    );
  }
}
