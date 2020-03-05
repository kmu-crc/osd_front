import React, { Component } from "react";
import ResponseToMakerReqContainer from "containers/Request/ResponseToMakerReqContainer";

class ResponseToMakerReqPage extends Component {
  render() {
    return (<ResponseToMakerReqContainer
      detail={this.props.location.state && this.props.location.state.detail}
      expert={this.props.location.state && this.props.location.state.expert}
      id={this.props.match.params.id} />);
  }
}

export default ResponseToMakerReqPage;
