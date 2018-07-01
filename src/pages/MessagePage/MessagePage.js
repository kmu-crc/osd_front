import React, { Component } from "react";
import ClientTemplate from "templates/ClientTemplate";
import MessageListContainer from "containers/Messages/MessageListContainer";

class MessagePage extends Component {
  render() {
    return(
      <ClientTemplate>
        <MessageListContainer history={this.props.history}/>
     </ClientTemplate>
    );
  }
}

export default MessagePage;
