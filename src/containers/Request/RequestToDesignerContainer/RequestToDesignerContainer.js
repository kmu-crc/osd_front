import React, { Component } from 'react';
import { connect } from "react-redux";
import RequestToDesigner from "components/Request/RequestToDesigner";
import { CreateRequestRequest } from "actions/Request";

class RequestToDesignerContainer extends Component {
  componentDidMount() {
    // alert(this.props.id);
  }
  render() {
    return (<RequestToDesigner {...this.props} />)
  }
}

const mapStateToProps = (state) => ({
  token: state.Authentication.status.token,
});
const mapDispatchToProps = (dispatch) => ({
  CreateRequestRequest: (data, token) => dispatch(CreateRequestRequest(data, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestToDesignerContainer);
