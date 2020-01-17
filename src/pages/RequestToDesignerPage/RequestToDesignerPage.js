import React, { Component } from "react";
import RequestToDesignerContainer from "containers/Request/RequestToDesignerContainer";

class RequestToDesignerPage extends Component {
  render() {
    return (<RequestToDesignerContainer id={this.props.match.params.id} />);
  }
}

export default RequestToDesignerPage;
