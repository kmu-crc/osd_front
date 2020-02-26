import React, { Component } from 'react';
import { connect } from "react-redux";
import { GetMakerRequestListRequest } from "actions/Request";
import MakerRequestBoard from "components/Request/MakerRequestBoard";

class MakerRequestBoardContainer extends Component {
  componentDidMount() {
    this.props.GetMakerRequestListRequest(this.props.id, 0);
  }
  getList = page =>
    this.props.GetMakerRequestListRequest(this.props.id, page);

  render() {
    return (<MakerRequestBoard getList={this.getList} {...this.props} />)
  }
}

const mapStateToProps = (state) => ({
  token: state.Authentication.status.token,
  userInfo: state.Authentication.status.userInfo,
  dataList: state.RequestList.status.List,
  Count: state.RequestList.status.Total
});
const mapDispatchToProps = (dispatch) => ({
  GetMakerRequestListRequest: (id, page) => dispatch(GetMakerRequestListRequest(id, page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MakerRequestBoardContainer);
