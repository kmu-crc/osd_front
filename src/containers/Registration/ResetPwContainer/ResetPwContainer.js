import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ResetPwForm from "components/Registration/ResetPwForm";
import { FindPwRequest } from "actions/Registration";


class ResetPwContainer extends Component {
  render() {
    return (
          <ResetPwForm {...this.props} />
    )
  }
}

const mapStateToProps = state => {
  return {
    status: state.FindPw.FindPw.status,
    message: state.FindPw.status.message
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
