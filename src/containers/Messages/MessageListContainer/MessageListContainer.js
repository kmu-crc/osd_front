import React, { Component } from "react"
import { connect } from "react-redux"
import MessageList from "components/Messages/MessageList"
import {
  GetMyChatRoomsListRequest, GetMyMsgListRequest, SendMessageRequest
} from "redux/modules/message"
import { SearchMemberRequest } from "redux/modules/search"

class MessageListContainer extends Component {
  componentDidMount() {
    this.props.userInfo && this.props.GetMyChatRoomsListRequest(this.props.token);
  }
  render() {
    return (<MessageList {...this.props} />)
  }
}

const mapStateToProps = (state) => ({
  MyDetail: state.Personal.status.MyDetail,
  Count: state.DesignerList.status.Count,
  ChatRooms: state.Message.status.Rooms,
  token: state.Authentication.status.token,
  MessageList: state.Message.status.MsgList,
  userInfo: state.Authentication.status.userInfo,
  members: state.Search.status.members,
});

const mapDispatchToProps = (dispatch) => ({
  GetMyChatRoomsListRequest: (token) => dispatch(GetMyChatRoomsListRequest(token)),
  GetMyMsgListRequest: (token) => dispatch(GetMyMsgListRequest(token)),
  SendMessageRequest: (token, data, id) => dispatch(SendMessageRequest(token, data, id)),
  SearchMemberRequest: (id, data, token) => dispatch(SearchMemberRequest(id, data, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageListContainer);
