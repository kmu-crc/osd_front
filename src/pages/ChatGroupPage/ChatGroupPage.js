import React, { Component } from 'react';
import ChatGroupContainer from "containers/Chat/ChatGroupContainer";
import CheckAuth from "containers/Commons/CheckAuth";

class ChatPage extends Component {
  componentDidMount() {
    if (this.props.match.params.id == null) {
      this.close("올바른 접근이 아닙니다.");
    }
  }
  close = (msg) => {
    msg && alert(msg)
    window.open('', '_self').close();
    window.history.go(-1); // 주소 입력창으로 접근 시 뒤로가기 해야하기 때문에 추가됨.
  }
  render() {
    return (
      <ChatGroupContainer id={this.props.match.params.id} />
    );
  }
}
export default CheckAuth(ChatPage);
