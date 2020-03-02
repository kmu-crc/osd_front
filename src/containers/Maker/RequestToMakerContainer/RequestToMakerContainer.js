import React, { Component } from 'react';
import { connect } from "react-redux";
import RequestToMaker from "components/Makers/RequestToMaker";
import { CreateRequestRequest } from "actions/Request";

class RequestToMakerContainer extends Component {
  componentDidMount() {
    // alert(this.props.id);
  }
  render() {
    return (<RequestToMaker {...this.props} />)
  }
}

const mapStateToProps = (state) => ({
  token: state.Authentication.status.token,
  category1: state.CategoryAll.status.category1,
  category2: state.CategoryAll.status.category2,
});
const mapDispatchToProps = (dispatch) => ({
  CreateRequestRequest: (data, token) => dispatch(CreateRequestRequest(data, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestToMakerContainer);
