import React, { Component } from 'react';
import ResponseToMakerReq from "components/Makers/ResponseToMakerReq";
import ResponseToMakerReq_mobile from "mobileComponents/ResponseToMakerReq_mobile";
import { connect } from "react-redux";
import { CreateRequestRequest } from "actions/Request";

class ResponseToMakerReqContainer extends Component {
  render() {
    return (
    <React.Fragment>
      {
        window.innerWidth>=500?
        <ResponseToMakerReq {...this.props} />
        :
        <ResponseToMakerReq_mobile {...this.props}/>
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
});
const mapDispatchToProps = (dispatch) => ({
  CreateRequestRequest: (data, token) => dispatch(CreateRequestRequest(data, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResponseToMakerReqContainer);
