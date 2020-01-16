import React, { Component } from "react";
import { connect } from "react-redux";
import DesignerBoardDetail from "components/Designers/DesignerBoardDetail";
import { GetBoardDetailRequest } from "actions/Designer";

class DesignerBoardDetailContainer extends Component {
  componentDidMount() {
    this.props.GetBoardDetailRequest(this.props.id)
      .then(data => {
        if (data.private === 1) {
          alert("비공개글입니다.");
          window.history.go(-1);
        }
      })
  }
  render() {
    return (<DesignerBoardDetail {...this.props} />)
  }
}

const mapStateToProps = (state) => {
  return {
    Detail: state.DesignerBoardDetail.status.DesignerBoardDetail,
    Count: state.DesignerBoardDetail.status.Count,
    userInfo: state.Authentication.status.userInfo,
    token: state.Authentication.status.token,
    like: state.DesignerLike.status.like,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetBoardDetailRequest: (id) => dispatch(GetBoardDetailRequest(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DesignerBoardDetailContainer);
