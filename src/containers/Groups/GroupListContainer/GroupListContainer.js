import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetGroupListRequest } from "actions/Group";
import GroupList from "components/Groups/GroupList";

class GroupListContainer extends Component {
  render() {
    return(
      <div>
        <GroupList {...this.props}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    GroupList: state.GroupList.status.GroupList,
    GroupListAdded: state.GroupList.status.GroupListAdded,
    valid: state.Authentication.status.valid,
    userInfo: state.Authentication.status.userInfo
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      GetGroupListRequest: (sort) => {
        return dispatch(GetGroupListRequest(sort))
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupListContainer);
