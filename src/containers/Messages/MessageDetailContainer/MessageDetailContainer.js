import React, { Component } from "react";
import { connect } from "react-redux";
import MessageDetail from "components/Messages/MessageDetail";
//import { MessageScrollDown,GetMyMsgDetailRequest, GetMyMessageDetailClear} from "redux/modules/message";
import { GetMyMsgDetailRequest, GetMyMessageDetailClear } from "redux/modules/message";


class MessageDetailContainer extends Component {
  render() {
    return (<MessageDetail {...this.props} />);
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
    GetMyMsgDetailRequest: (token, id, page) => {
      return dispatch(GetMyMsgDetailRequest(token, id, page));
    },
    GetMyMessageDetailClear: () => {
      return dispatch(GetMyMessageDetailClear());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageDetailContainer);
