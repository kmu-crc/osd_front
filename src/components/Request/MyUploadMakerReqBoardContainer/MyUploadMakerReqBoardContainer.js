import React, { Component } from 'react';
import { connect } from "react-redux";
import { GetMyMakerRequestListRequest } from "actions/Request";
import DesignerRequestBoard from "components/Request/DesignerRequestBoard";

class MyUploadMakerReqBoardContainer extends Component {
  componentDidMount() {
    this.props.GetMyMakerRequestListRequest(this.props.id, 0);
  }
  getList = page =>
    this.props.GetMyMakerRequestListRequest(this.props.id, page);
  render() {
    return (<DesignerRequestBoard getList={this.getList} {...this.props} />)
  }
}

const mapStateToProps = (state) => ({
  token: state.Authentication.status.token,
  userInfo: state.Authentication.status.userInfo,
  dataList: state.RequestList.status.List,
  Count: state.RequestList.status.Total
});
const mapDispatchToProps = (dispatch) => ({
  GetMyMakerRequestListRequest: (id, page) => dispatch(GetMyMakerRequestListRequest(id, page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyUploadMakerReqBoardContainer);
