import React, { Component } from "react";
import { connect } from "react-redux";
import SearchMember from "components/Commons/SearchMember";
import { SearchMemberRequest } from "redux/modules/search";


class SearchMemberContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { addMemberItem: null }
  }
  render() {
    return (<SearchMember {...this.props} />);
  }
}


const mapStateToProps = (state) => {
  return {
    members: state.Search.status.members,
    token: state.Authentication.status.token,
    MessageList: state.Message.status.MsgList,
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
