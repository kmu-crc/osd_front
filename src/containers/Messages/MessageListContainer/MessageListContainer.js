import React, { Component } from "react";
import { connect } from "react-redux";
import { GetMyMsgListRequest, SendMessageRequest, CheckConnectedResponse } from "actions/Message";
import { SearchMemberRequest } from "actions/Commons/Search";

import MessageList from "components/Messages/MessageList";
import MessageList_mobile from "mobileComponents/MessageList_mobile"

class MessageListContainer extends Component {
  render() {
    return (
      <React.Fragment>
        {
          window.innerWidth>=500?
          <MessageList {...this.props} />:
          <MessageList_mobile {...this.props} />
        }
      </React.Fragment>
    );
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
  SearchMemberRequest: (id, data,  token) => (dispatch(SearchMemberRequest(id, data, token))),
  CheckConnectedResponse: (token, checkData, id) => (dispatch(CheckConnectedResponse(token, checkData, id)))
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageListContainer);
