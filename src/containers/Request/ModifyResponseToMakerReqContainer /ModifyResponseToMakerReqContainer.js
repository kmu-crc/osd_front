import React, { Component } from 'react';
import ModifyResponseToMakerReq from "components/Makers/ModifyResponseToMakerReq/ModifyResponseToMakerReq.js";
import ModifyResponseToMakerReq_mobile from "mobileComponents/ModifyResponseToMakerReq_mobile";
import { connect } from "react-redux";
import { UpdateRequestRequest,GetRequestDetailRequest } from "actions/Request";

class ModifyResponseToMakerReqContainer  extends Component {
  componentDidMount() {
    this.props.GetRequestDetailRequest(this.props.id);
  }
  render() {
    return (
      <React.Fragment>
        {
          window.innerWidth>=500?
          <ModifyResponseToMakerReq {...this.props} />
          :
          <ModifyResponseToMakerReq_mobile {...this.props} />
        }
      </React.Fragment>
    )
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
