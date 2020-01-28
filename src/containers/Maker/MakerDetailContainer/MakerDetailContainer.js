import React, { Component } from "react";
import { connect } from "react-redux";
import { GetMakerDetailRequest } from "actions/Maker";
import MakerDetail from "components/Makers/MakerDetail";

class MakerDetailContainer extends Component {
  render() {
    return (<MakerDetail {...this.props} />);
  }
}

const mapStateToProps = (state) => ({
  MakerDetail: state.MakerDetail.status.MakerDetail,
  userInfo: state.Authentication.status.userInfo,
  token: state.Authentication.status.token,
});

const mapDispatchToProps = (dispatch) => ({
  GetMakerDetailRequest: (id) => dispatch(GetMakerDetailRequest(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MakerDetailContainer);
