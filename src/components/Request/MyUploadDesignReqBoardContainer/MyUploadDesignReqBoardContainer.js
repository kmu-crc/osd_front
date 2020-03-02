import React, { Component } from 'react';
import { connect } from "react-redux";
import { GetMyDesignerRequestListRequest } from "actions/Request";
import DesignerRequestBoard from "components/Request/DesignerRequestBoard";

class MyUploadDesignReqBoardContainer extends Component {
  componentDidMount() {
    this.props.GetMyDesignerRequestListRequest(this.props.id, 0);
  }
  getList = page =>
    this.props.GetMyDesignerRequestListRequest(this.props.id, page);
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
  GetMyDesignerRequestListRequest: (id, page) => dispatch(GetMyDesignerRequestListRequest(id, page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyUploadDesignReqBoardContainer);
