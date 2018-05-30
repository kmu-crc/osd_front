import React, { Component } from "react";
import { connect } from "react-redux";
import { GetDesignDetailIssueRequest, GetDesignDetailIssueDetailRequest } from "actions/Design";
import DetailIssue from "components/Designs/DetailIssue";

class DesignDetailIssueContainer extends Component {

  componentDidMount() {
    this.props.GetDesignDetailIssueRequest(this.props.id);
  }

  render() {
    return (
      <div>
        <DetailIssue {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    DesignDetailIssue: state.DesignDetailIssue.status.DesignDetailIssue,
    IssueDetail: state.DesignDetailIssue.status.IssueDetail
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetDesignDetailIssueRequest: (id) => {
      return dispatch(GetDesignDetailIssueRequest(id))
    },
    GetDesignDetailIssueDetailRequest: (id, issue_id) => {
      return dispatch(GetDesignDetailIssueDetailRequest(id, issue_id))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DesignDetailIssueContainer);
