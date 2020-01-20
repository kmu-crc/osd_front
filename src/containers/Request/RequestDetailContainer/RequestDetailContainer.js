import React, { Component } from "react";
import { connect } from "react-redux";
import RequestDetail from "components/Request/RequestDetail";
import { GetRequestDetailRequest } from "actions/Request";

class RequestDetailContainer extends Component {
  componentDidMount() {
    this.props.GetRequestDetailRequest(this.props.id)
      .then(data => {
        if (data.private === 1 && data.writer !== this.props.userInfo.uid) {
          alert("비공개글입니다.");
          window.history.go(-1);
        }
      })
  }
  render() {
    return (<RequestDetail {...this.props} />)
  }
}

const mapStateToProps = (state) => {
  return {
    Detail: state.RequestDetail.status.Detail,
    userInfo: state.Authentication.status.userInfo,
    token: state.Authentication.status.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetRequestDetailRequest: (id) => dispatch(GetRequestDetailRequest(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestDetailContainer);
