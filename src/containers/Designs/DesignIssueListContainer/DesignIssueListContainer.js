import React, { Component } from "react";
import { connect } from "react-redux";
import { GetDesignIssueListRequest } from "actions/Design";
import DesignIssueList from "components/Designs/DesignIssue/DesignIssueList";

class DesignIssueListContainer extends Component {

  componentDidMount() {
    this.props.GetDesignIssueListRequest(this.props.match.params.id);
  }

  render() {
    return (
      <div>
        <DesignIssueList {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    DesignIssueList: state.DesignIssueList.status.DesignIssueList
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetDesignIssueListRequest: (id) => {
      return dispatch(GetDesignIssueListRequest(id))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DesignIssueListContainer);
