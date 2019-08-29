import React, { Component } from "react";
import { connect } from "react-redux";
import MessageDetail from "components/Messages/MessageDetail";
import { MessageScrollDown,GetMyMsgDetailRequest, GetMyMessageDetailClear} from "redux/modules/message";

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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageDetailContainer);
