import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ResetPwForm from "components/Registration/ResetPwForm";
import { FindPwRequest } from "redux/modules/account";

class ResetPwContainer extends Component {
  render() {
    return <ResetPwForm {...this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    status: state.Account.FindPw.status,
    message: state.Account.status.message
  };
};

const mapDispatchToProps = dispatch => {
  return {
    FindPwRequest: data => {
      return dispatch(FindPwRequest(data));
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ResetPwContainer)
);
