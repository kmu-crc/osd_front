import React, { Component } from "react";
import { connect } from "react-redux";
import MessageDetail from "components/Messages/MessageDetail";
import MessageDetail_mobile from "mobileComponents/MessageDetail_mobile";

import { GetMyMsgDetailRequest, GetMyMessageDetailClear } from "actions/Message";

class MessageDetailContainer extends Component {
  render() {
    return(
      <div>
        {this.props.id === -1 ?
        <p>메시지 내용이 없습니다.</p>
        :
        window.innerWidth>=500?
          <MessageDetail {...this.props}/>
          :
          <MessageDetail_mobile {...this.props}/>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.Authentication.status.token,
    MessageDetail: state.MessageDetail.status.MsgDetail,
    userInfo: state.Authentication.status.userInfo
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetMyMsgDetailRequest: (token, id) => {
      return dispatch(GetMyMsgDetailRequest(token, id));
    },
    GetMyMessageDetailClear: () => {
      return dispatch(GetMyMessageDetailClear());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageDetailContainer);
