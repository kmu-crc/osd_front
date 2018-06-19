import React, { Component } from "react";
import { connect } from "react-redux";
import { GetDesignIssueDetailRequest } from "actions/Design";
import { UpdateDesignIssueRequest } from "actions/Designs/DesignIssue";
import ModifyIssue from "components/Designs/DesignIssue/ModifyIssue.js";

class ModifyIssueDetailContainer extends Component {
  componentWillMount() {
    this.props.GetDesignIssueDetailRequest(this.props.match.params.id, this.props.match.params.issue_id);
  }
  
  render() {
    return (
      <div>
        <ModifyIssue {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.Authentication.status.token,
    IssueDetail: state.DesignIssueList.status.IssueDetail
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetDesignIssueDetailRequest: (id, issue_id) => {
      return dispatch(GetDesignIssueDetailRequest(id, issue_id))
    },
    UpdateDesignIssueRequest: (data, design_id, issue_id, token) => {
      return dispatch(UpdateDesignIssueRequest(data, design_id, issue_id, token))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModifyIssueDetailContainer);
