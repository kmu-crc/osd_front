import React, { Component } from "react";
import MessageListContainer from "containers/Messages/MessageListContainer";
import ClientTemplate from "templates/ClientTemplate";
import { isMobile } from "constant";

class MessagePage extends Component {
  render() {
    return (
      <ClientTemplate hideheader={isMobile()}>
        <MessageListContainer
          history={this.props.history}
          id={this.props.match.params.id ? this.props.match.params.id : null}
          name={this.props.match.params.name ? this.props.match.params.name : null} />
      </ClientTemplate>
    );
  }
}

export default MessagePage;
