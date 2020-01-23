import React, { Component } from "react";
import { connect } from "react-redux";
import MessageList from "components/Messages/MessageList";
import { GetMyMsgListRequest, SendMessageRequest, CheckConnectedResponse } from "actions/Message";
import { SearchMemberRequest } from "actions/Commons/Search";

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
    MessageList: state.MessageList.status.MsgList,
    userInfo: state.Authentication.status.userInfo,
    members: state.Search.status.members
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetMyMsgListRequest: (token) => {
      return dispatch(GetMyMsgListRequest(token));
    },
    SendMessageRequest: (token, data, id) => {
      console.log("container");
      return dispatch(SendMessageRequest(token, data,id));
    },
    SearchMemberRequest: (id, data, token) => {
      return dispatch(SearchMemberRequest(id, data, token));
    },
    CheckConnectedResponse :(token, checkData)=>{
      return dispatch(CheckConnectedResponse(token, checkData));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageListContainer);
