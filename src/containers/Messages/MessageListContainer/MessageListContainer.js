import React, { Component } from "react";
import { connect } from "react-redux";
import MessageList from "components/Messages/MessageList";
import { GetMyMsgListRequest, SendMessageRequest, CheckConnectedResponse } from "actions/Message";
import { SearchMemberRequest } from "actions/Commons/Search";

class MessageListContainer extends Component {
  render() {
    return (<MessageList {...this.props} />);
  }
}

const mapStateToProps = (state) => ({
  token: state.Authentication.status.token,
  MessageList: state.MessageList.status.MsgList,
  userInfo: state.Authentication.status.userInfo,
  members: state.Search.status.members
});
const mapDispatchToProps = (dispatch) => ({
  GetMyMsgListRequest: (token) => (dispatch(GetMyMsgListRequest(token))),
  SendMessageRequest: (token, data, id) => (dispatch(SendMessageRequest(token, data, id))),
  SearchMemberRequest: (id, data, token) => (dispatch(SearchMemberRequest(id, data, token))),
  CheckConnectedResponse: (token, checkData, id) => (dispatch(CheckConnectedResponse(token, checkData, id)))
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageListContainer);
