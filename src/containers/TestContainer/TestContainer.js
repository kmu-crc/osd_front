import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TestForm2 from "components/TestForm2";
import { SearchMemberRequest } from "actions/Commons/Search";

class TestContainer extends Component {
  render() {
    return (
      <TestForm2 {...this.props}/>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    members: state.Search.status.members,
    token: state.Authentication.status.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    SearchMemberRequest: (data, token) => {
      return dispatch(SearchMemberRequest(data, token));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TestContainer));
