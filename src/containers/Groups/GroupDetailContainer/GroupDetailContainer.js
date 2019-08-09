import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DesignInGroupClear, GroupInGroupClear, GetGroupDetailRequest, GetGroupCountRequest, GetLikeGroupRequest, LikeGroupRequest, UnlikeGroupRequest, CreateGroupIssueRequest, DeleteGroupIssueRequest, DeleteGroupRequest } from "actions/Group";
// import GroupDetail from "components/Groups/GroupDetail";
import GroupDetailNew from "components/Groups/GroupDetailNew";

class GroupDetailContainer extends Component {
  render() {
    return(
      <GroupDetailNew {...this.props}/>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    GroupDetail: state.GroupDetail.status.GroupDetail,
    userInfo: state.Authentication.status.userInfo,
    token: state.Authentication.status.token,
    like: state.GroupLike.status.like,
    Count: state.GroupDetail.status.Count
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      GetGroupDetailRequest: (id) => {
        return dispatch(GetGroupDetailRequest(id))
      },
      GetLikeGroupRequest: (id, token) => {
        return dispatch(GetLikeGroupRequest(id, token))
      },
      LikeGroupRequest: (id, token) => {
        return dispatch(LikeGroupRequest(id, token))
      },
      UnlikeGroupRequest: (id, token) => {
        return dispatch(UnlikeGroupRequest(id, token))
      },
      GetGroupCountRequest: (id) => {
        return dispatch(GetGroupCountRequest(id))
      },
      CreateGroupIssueRequest: (data, id, token) => {
        return dispatch(CreateGroupIssueRequest(data, id, token))
      },
      DeleteGroupIssueRequest: (id, issue_id, token) => {
        return dispatch(DeleteGroupIssueRequest(id, issue_id, token))
      },
      DesignInGroupClear: (data) => {
        return dispatch(DesignInGroupClear(data))
      },
      GroupInGroupClear: (data) => {
        return dispatch(GroupInGroupClear(data))
      },
      DeleteGroupRequest: (id, token) => {
        return dispatch(DeleteGroupRequest(id, token))
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupDetailContainer);
