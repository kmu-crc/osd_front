import React, { Component } from "react"
import { connect } from "react-redux"
import Chat from "components/Chat/Chat"
import { GetDesignDetailRequest, } from "redux/modules/design";

class ChatContainer extends Component {
  componentDidMount() {
    // if (this.props.userInfo == null) {
    // alert("유저정보가 올바르지 않습니다.");
    // window.history.back();
    // }

    // design basic info request
    this.props.GetDesignDetailRequest(this.props.id, this.props.token)
  }
  render() {
    return (
      <Chat {...this.props} />
    )
  }
}

const mapStateToProps = (state) => ({
  token: state.Authentication.status.token,
  userInfo: state.Authentication.status.userInfo,
  DesignDetail: state.Design.status.DesignDetail,
});

const mapDispatchToProps = (dispatch) => ({
  GetDesignDetailRequest: (id, token) => {
    return dispatch(GetDesignDetailRequest(id, token))
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);
