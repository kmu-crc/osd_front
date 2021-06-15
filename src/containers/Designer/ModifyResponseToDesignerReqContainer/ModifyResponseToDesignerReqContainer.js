import React, { Component } from 'react';
import ModifyResponseToDesignerReq from "components/Request/ModifyResponseToDesignerReq/ModifyResponseToDesignerReq.js";
import ModifyResponseToDesignerReq_mobile from "mobileComponents/ModifyResponseToDesignerReq_mobile";
import { connect } from "react-redux";
import { UpdateRequestRequest,GetRequestDetailRequest } from "actions/Request";

class ModifyResponseToDesignerReqContainer extends Component {
  componentDidMount() {
    this.props.GetRequestDetailRequest(this.props.id);
  }
  render() {
    return (
      <React.Fragment>
        {
          window.innerWidth>=500?
          <ModifyResponseToDesignerReq {...this.props} />
          :
          <ModifyResponseToDesignerReq_mobile {...this.props} />
        }
      </React.Fragment>
    )
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(ModifyResponseToDesignerReqContainer);
