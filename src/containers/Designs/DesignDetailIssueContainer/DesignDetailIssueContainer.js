import React, { Component } from "react";
import { connect } from "react-redux";
import { GetDesignDetailIssueRequest } from "actions/Design";
import DetailIssue from "components/Designs/DetailIssue";

class DesignDetailIssueContainer extends Component {

  componentDidMount() {
    this.props.GetDesignDetailIssueRequest(this.props.location.state.id);
  }

  render() {
    return (
      <div>
        <DetailIssue id={this.props.location.state.id} {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    DesignDetailIssue: state.DesignDetailIssue.status.DesignDetailIssue
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetDesignDetailIssueRequest: (id) => {
      return dispatch(GetDesignDetailIssueRequest(id))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DesignDetailIssueContainer);
