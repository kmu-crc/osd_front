import React, { Component } from "react";
import ResponseToMakerReqContainer from "containers/Request/ResponseToMakerReqContainer";

class ResponseToMakerReqPage extends Component {
  render() {
    return (<ResponseToMakerReqContainer id={this.props.match.params.id} />);
  }
}

export default ResponseToMakerReqPage;
