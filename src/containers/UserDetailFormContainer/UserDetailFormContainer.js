import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import UserDetailForm from "../../components/UserDetailFrom";
import { InsertUserDetailRequest } from "../../actions/Users";
class UpdateUserInfoContainer extends Component {
  render() {
    return (
      <UserDetailForm {...this.props} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.Authentication.status.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    InsertUserDetailRequest: (data, token) => {
      return dispatch(InsertUserDetailRequest(data, token));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UpdateUserInfoContainer));
