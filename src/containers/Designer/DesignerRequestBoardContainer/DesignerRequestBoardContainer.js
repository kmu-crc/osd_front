import React, { Component } from 'react';
import { connect } from "react-redux";
import { GetDesignerRequestListRequest } from "actions/Request";
import DesignerRequestBoard from "components/Request/DesignerRequestBoard";

class DesignerRequestBoardContainer extends Component {
  componentDidMount() {
    this.props.GetDesignerRequestListRequest(this.props.id, 0);
  }
  getList = page =>
    this.props.GetDesignerRequestListRequest(this.props.id, page);
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
  GetDesignerRequestListRequest: (id, page) => dispatch(GetDesignerRequestListRequest(id, page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DesignerRequestBoardContainer);
