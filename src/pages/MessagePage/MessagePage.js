import React, { Component } from "react";
import MessageListContainer from "containers/Messages/MessageListContainer";

class MessagePage extends Component {
  render() {
    return (
      <MessageListContainer
        history={this.props.history}
        group_id={this.props.match.params.group_id ? this.props.match.params.group_id : null}
        />
    );
  }
}

export default MessagePage;
