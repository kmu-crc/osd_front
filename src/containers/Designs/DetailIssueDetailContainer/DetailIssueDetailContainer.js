import React, { Component } from "react";
import { connect } from "react-redux";
import { GetDesignDetailIssueDetailRequest } from "actions/Design";
import DetailIssueDetail from "components/Designs/DetailIssue/DetailIssueDetail.js";

class DetailIssueDetailContainer extends Component {
  componentDidMount() {
    this.props.GetDesignDetailIssueDetailRequest(this.props.location.state.id, this.props.location.state.issue_id);
  }

  render() {
    return (
      <div>
        <DetailIssueDetail {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    IssueDetail: state.DesignDetailIssue.status.IssueDetail
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetDesignDetailIssueDetailRequest: (id, issue_id) => {
      return dispatch(GetDesignDetailIssueDetailRequest(id, issue_id))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailIssueDetailContainer);
