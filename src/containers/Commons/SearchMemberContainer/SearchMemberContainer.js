import React, { Component } from "react";
import SearchMember from "components/Commons/SearchMember";
import { connect } from "react-redux";
import { SearchMemberRequest } from "actions/Commons/Search";

class SearchMemberContainer extends Component {
  render() {
    return(
      <SearchMember {...this.props}/>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    members: state.Search.status.members,
    token: state.Authentication.status.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    SearchMemberRequest: (data, token) => {
      return dispatch(SearchMemberRequest(data, token));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchMemberContainer);
