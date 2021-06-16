import React, { Component } from 'react';
import { connect } from "react-redux";
import RequestToDesigner from "components/Request/RequestToDesigner";
import RequestToDesigner_mobile from "mobileComponents/RequestToDesigner_mobile";
import { CreateRequestRequest } from "actions/Request";

class RequestToDesignerContainer extends Component {
  render() {
    return (
    <React.Fragment>
      {
        window.innerWidth>=500?
        <RequestToDesigner {...this.props} />
        :
        <RequestToDesigner_mobile {...this.props}/>
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
});
const mapDispatchToProps = (dispatch) => ({
  CreateRequestRequest: (data, token) => dispatch(CreateRequestRequest(data, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestToDesignerContainer);
