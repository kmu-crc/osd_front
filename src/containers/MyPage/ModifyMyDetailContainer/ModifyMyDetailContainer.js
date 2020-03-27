import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetMyDetailRequest, ModifyUserDetailRequest } from "actions/Users/MyDetail";
import ModifyMyDetail from "components/Users/ModifyMyDetail";

class ModifyMyDetailContainer extends Component {
  componentWillMount() {
    this.props.GetMyDetailRequest(this.props.token)
  }
  render() {
    return (
      <ModifyMyDetail {...this.props} />
    );
  }
}

const mapStateToProps = (state) => ({
  MyDetail: state.MyDetail.status.MyDetail,
  token: state.Authentication.status.token,
  category1: state.CategoryAll.status.category1,
  category2: state.CategoryAll.status.category2
});

const mapDispatchToProps = (dispatch) => ({
  GetMyDetailRequest: (token) => dispatch(GetMyDetailRequest(token)),
  ModifyUserDetailRequest: (id, data, token) => dispatch(ModifyUserDetailRequest(id, data, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModifyMyDetailContainer);
