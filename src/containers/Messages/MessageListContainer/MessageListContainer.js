import React, { Component } from "react"
import { connect } from "react-redux"
import MessageList from "components/Messages/MessageList"
import { GetMyMsgListRequest, SendMessageRequest,MsgDetailScrollWait,MsgDetailScrollDown } from "redux/modules/message"
import { SearchMemberRequest } from "redux/modules/search"

class MessageListContainer extends Component {
  render() {

    console.log("+++++++++++++++++",this.props);
    return (<MessageList {...this.props} />)
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.Authentication.status.token,
    MessageList: state.Message.status.MsgList,
    userInfo: state.Authentication.status.userInfo,
    members: state.Search.status.members,
    scrollMove:state.Message.scrollMove,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetMyMsgListRequest: (token) => {
      return dispatch(GetMyMsgListRequest(token));
    },
    SendMessageRequest: (token, data, id) => {
      return dispatch(SendMessageRequest(token, data, id));
    },
    SearchMemberRequest: (id, data, token) => {
      return dispatch(SearchMemberRequest(id, data, token));
    },
    MsgDetailScrollWait: () => {
      return dispatch(MsgDetailScrollWait());
    },
    MsgDetailScrollDown: () => {
      return dispatch(MsgDetailScrollDown());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageListContainer);
