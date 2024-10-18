import React, { Component } from 'react';
import VChatGroupContainer from "containers/VChat/VChatGroupContainer";

class VChatGroupPage extends Component {
  render() {
    return (<VChatGroupContainer
      opt={this.props.match.params.opt}
      id={this.props.match.params.id || null}
    />)
  }
}

export default VChatGroupPage;
