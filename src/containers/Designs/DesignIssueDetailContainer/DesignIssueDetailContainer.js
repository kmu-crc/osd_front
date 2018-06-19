import React, { Component } from "react";
import { connect } from "react-redux";
import { GetDesignIssueDetailRequest } from "actions/Design";
import DesignIssueDetail from "components/Designs/DesignIssue/DesignIssueDetail.js";
import { DeleteDesignIssueRequest, UpdateIssueStatusRequest } from "actions/Designs/DesignIssue";

class DesignIssueDetailContainer extends Component {
  componentDidMount() {
    this.props.GetDesignIssueDetailRequest(this.props.match.params.id, this.props.match.params.issue_id);
  }

  render() {
    return (
      <DesignIssueDetail {...this.props} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    IssueDetail: state.DesignIssueList.status.IssueDetail,
    userInfo: state.Authentication.status.userInfo,
    token: state.Authentication.status.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetDesignIssueDetailRequest: (id, issue_id) => {
      return dispatch(GetDesignIssueDetailRequest(id, issue_id))
    },
    DeleteDesignIssueRequest: (design_id, issue_id, token) => {
      return dispatch(DeleteDesignIssueRequest(design_id, issue_id, token))
    },
    UpdateIssueStatusRequest: (data, design_id, issue_id, token) => {
      return dispatch(UpdateIssueStatusRequest(data, design_id, issue_id, token))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DesignIssueDetailContainer);
