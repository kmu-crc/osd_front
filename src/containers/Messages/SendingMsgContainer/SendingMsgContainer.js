import React, { Component } from "react";
import { connect } from "react-redux";
import SendingMessage from "components/Messages/SendingMessage";
import { SendMessageRequest } from "actions/Message";

class SendingMsgContainer extends Component {
  render() {
    return(
      <SendingMessage {...this.props}/>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.Authentication.status.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    SendMessageRequest: (token, data, id) => {
      return dispatch(SendMessageRequest(token, data, id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SendingMsgContainer);
