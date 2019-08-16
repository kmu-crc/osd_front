import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DesignInGroupClear, GroupInGroupClear, GetGroupDetailRequest, GetGroupCountRequest, GetLikeGroupRequest, LikeGroupRequest, UnlikeGroupRequest, DeleteGroupRequest } from "redux/modules/group"
import GroupDetail from "components/Groups/GroupDetail"

class GroupDetailContainer extends Component {
  render() {
    return (
      <GroupDetail {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    GroupDetail: state.GroupDetail.status.GroupDetail,
    userInfo: state.Authentication.status.userInfo,
    token: state.Authentication.status.token,
    like: state.GroupLike.status.like,
    Count: state.GroupDetail.status.Count
  }
}

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
    DesignInGroupClear: (data) => {
      return dispatch(DesignInGroupClear(data))
    },
    GroupInGroupClear: (data) => {
      return dispatch(GroupInGroupClear(data))
    },
    DeleteGroupRequest: (id, token) => {
      return dispatch(DeleteGroupRequest(id, token))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupDetailContainer)
