import React, { Component } from "react";
import SearchMember from "components/Commons/SearchMember";
import { connect } from "react-redux";
import { SearchMemberRequest } from "redux/modules/search";

class SearchMemberContainer extends Component {
  render() {
    console.log("this.props:",this.props)
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
    SearchMemberRequest: (id, data, token) => {
      return dispatch(SearchMemberRequest(id, data, token));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchMemberContainer);
