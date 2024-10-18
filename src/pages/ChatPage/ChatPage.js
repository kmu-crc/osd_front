import React, { Component } from 'react';
import ChatContainer from "containers/Chat/ChatContainer";
import CheckAuth from "containers/Commons/CheckAuth";

class ChatPage extends Component {
  componentDidMount() {
    if (this.props.match.params.id == null) {
      alert("올바른 접근이 아닙니다.");
      // window.open('', '_self').close();
      // var pop = window.open("","pop");
      // alert("!");
      // pop.close();
    }
  }
  render() {
    return (
      <ChatContainer id={this.props.match.params.id} />
    );
  }
}
export default CheckAuth(ChatPage);
