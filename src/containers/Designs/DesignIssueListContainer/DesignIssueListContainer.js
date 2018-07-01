import React, { Component } from "react";
import { connect } from "react-redux";
import { GetDesignIssueListRequest } from "actions/Design";
import DesignIssueList from "components/Designs/DesignIssue/DesignIssueList";
import { SearchIssueRequest } from "actions/Commons/Search";

class DesignIssueListContainer extends Component {

  componentDidMount() {
    this.props.GetDesignIssueListRequest(this.props.match.params.id);
  }

  render() {
    return (
      <DesignIssueList {...this.props} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    DesignIssueList: state.DesignIssueList.status.DesignIssueList,
    SearchIssue: state.SearchIssue.status.SearchIssue,
    token: state.Authentication.status.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetDesignIssueListRequest: (id) => {
      return dispatch(GetDesignIssueListRequest(id))
    },
    SearchIssueRequest: (id, keyword) => {
      return dispatch(SearchIssueRequest(id, keyword))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DesignIssueListContainer);
