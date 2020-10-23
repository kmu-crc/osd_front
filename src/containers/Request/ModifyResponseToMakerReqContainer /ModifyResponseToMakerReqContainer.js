import React, { Component } from 'react';
import ModifyResponseToMakerReq from "components/Makers/ModifyResponseToMakerReq/ModifyResponseToMakerReq.js";
import { connect } from "react-redux";
import { UpdateRequestRequest,GetRequestDetailRequest } from "actions/Request";

class ModifyResponseToMakerReqContainer  extends Component {
  componentDidMount() {
    this.props.GetRequestDetailRequest(this.props.id);
  }
  render() {
    return (<ModifyResponseToMakerReq {...this.props} />)
  }
};

const mapStateToProps = (state) => ({
  token: state.Authentication.status.token,
  userInfo: state.Authentication.status.userInfo,
  category1: state.CategoryAll.status.category1,
  category2: state.CategoryAll.status.category2,
  detail: state.RequestDetail.status.Detail,
});
const mapDispatchToProps = (dispatch) => ({
  UpdateRequestRequest: (id, data, token) => dispatch(UpdateRequestRequest(id, data, token)),
  GetRequestDetailRequest: (id) => dispatch(GetRequestDetailRequest(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModifyResponseToMakerReqContainer);
