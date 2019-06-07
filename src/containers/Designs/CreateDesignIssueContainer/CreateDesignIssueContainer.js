import React, { Component } from "react";
import { connect } from "react-redux";
import { CreateDesignIssueRequest } from "actions/Designs/DesignIssue";
import CreateIssue from "components/Designs/DesignIssue/CreateIssue.js";

class DesignIssueDetailContainer extends Component {
  render() {
    return (
      <div>
        <CreateIssue {...this.props} />
      </div>
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
    CreateDesignIssueRequest: (data, design_id, token) => {
      return dispatch(CreateDesignIssueRequest(data, design_id, token))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DesignIssueDetailContainer);
