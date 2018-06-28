import React, { Component } from "react";
import { connect } from "react-redux";
import MessageDetail from "components/Messages/MessageDetail";

class MessageDetailContainer extends Component {
  render() {
    return(
      <MessageDetail {...this.props}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(MessageDetailContainer);
