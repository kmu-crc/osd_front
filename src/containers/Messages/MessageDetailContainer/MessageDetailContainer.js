import React, { Component } from "react";
import { connect } from "react-redux";
import MessageDetail from "components/Messages/MessageDetail";
import { MessageScrollDown,GetMyMsgDetailRequest, GetMyMessageDetailClear,MsgDetailScrollWait,MsgDetailScrollDown } from "redux/modules/message";

const MessageDetailBox = `
width: 1259px;
height: 602.5px;
`

class MessageDetailContainer extends Component {
  
  render() {
    console.log("------------------------",this.props);
    return(                
        <MessageDetail {...this.props}/>
        
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.Authentication.status.token,
    MessageDetail: state.Message.status.MsgDetail,
    userInfo: state.Authentication.status.userInfo,
    scrollMove:state.Message.scrollMove,
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetMyMsgDetailRequest: (token, id) => {
      return dispatch(GetMyMsgDetailRequest(token, id));
    },
    GetMyMessageDetailClear: () => {
      return dispatch(GetMyMessageDetailClear());
    },
    MsgDetailScrollWait: () => {
      return dispatch(MsgDetailScrollWait());
    },
    MsgDetailScrollDown: () => {
      return dispatch(MsgDetailScrollDown());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageDetailContainer);
