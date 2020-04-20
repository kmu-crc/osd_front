import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetGroupListRequest, GetGroupTotalCountRequest } from "actions/Group";
import GroupList from "../../components/GroupList";


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
    Count: state.GroupList.status.Count
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      GetGroupListRequest: (sort) => {
        return dispatch(GetGroupListRequest(sort))
      },
      GetGroupTotalCountRequest: () => {
        return dispatch(GetGroupTotalCountRequest())
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupListContainer);
