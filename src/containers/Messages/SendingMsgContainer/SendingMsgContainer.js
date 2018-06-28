import React, { Component } from "react";
import { connect } from "react-redux";
import SendingMessage from "components/Messages/SendingMessage";

class SendingMsgContainer extends Component {
  render() {
    return(
      <SendingMessage {...this.props}/>
    );
  }
}

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // GetCategoryLevel2Request: (id) => {
    //   return dispatch(GetCategoryLevel2Request(id));
    // }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SendingMsgContainer);
