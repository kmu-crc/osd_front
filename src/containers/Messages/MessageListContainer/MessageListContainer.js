import React, { Component } from "react";
import { connect } from "react-redux";
import MessageList from "components/Messages/MessageList";
import { GetMyMsgListRequest } from "actions/Message";

class MessageListContainer extends Component {
  render() {
    return(
      <MessageList {...this.props}/>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.Authentication.status.token,
    MessageList: state.MessageList.status.MsgList
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetMyMsgListRequest: (token) => {
      return dispatch(GetMyMsgListRequest(token));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageListContainer);
