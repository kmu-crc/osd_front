import React, { Component } from 'react';
import VChatContainer from "containers/VChat/VChatContainer";

class VChatPage extends Component {
  render() {
    return (<VChatContainer
      opt={this.props.match.params.opt || "create"}
      id={this.props.match.params.id || null}
    />)
  }
}

export default VChatPage;
