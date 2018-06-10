import React, { Component } from "react";
import { connect } from "react-redux";
import { GetDesignIssueDetailRequest } from "actions/Design";
import DesignIssueDetail from "components/Designs/DesignIssue/DesignIssueDetail.js";

class DesignIssueDetailContainer extends Component {
  componentDidMount() {
    this.props.GetDesignIssueDetailRequest(this.props.match.params.id, this.props.match.params.issue_id);
  }

  render() {
    return (
      <div>
        <DesignIssueDetail {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    IssueDetail: state.DesignIssueList.status.IssueDetail
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetDesignIssueDetailRequest: (id, issue_id) => {
      return dispatch(GetDesignIssueDetailRequest(id, issue_id))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DesignIssueDetailContainer);
