import React, { Component } from "react";
import RequestToMakerContainer from "containers/Maker/RequestToMakerContainer";

class RequestToMakerPage extends Component {
  render() {
    return (<RequestToMakerContainer id={this.props.match.params.id} />);
  }
}

export default RequestToMakerPage;
