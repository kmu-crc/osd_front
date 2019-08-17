import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  DesignInGroupClear, GroupInGroupClear,
  GetGroupDetailRequest, GetGroupCountRequest,
  GetLikeGroupRequest, LikeGroupRequest,
  UnlikeGroupRequest, DeleteGroupRequest,
  GetDesignInGroupRequest, GetGroupInGroupRequest,
} from "redux/modules/group"
import GroupDetail from "components/Groups/GroupDetail"

class GroupDetailContainer extends Component {
  componentDidMount() {
    this.props.GetGroupDetailRequest(this.props.id)
  }

  render() {
    return (
      <GroupDetail {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    GroupDetail: state.Group.status.GroupDetail,
    GroupList: state.Group.status.GroupInGroup,
    GroupListAdded: state.Group.status.GroupInGroupAdded,
    DesignList: state.Group.status.DesignInGroup,
    DesignListAdded: state.Group.status.DesignInGroupAdded,
    userInfo: state.Authentication.status.userInfo,
    token: state.Authentication.status.token,
    like: state.Group.status.like,
    Count: state.Group.status.Count
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
    },
    GetGroupInGroupRequest: (id, page, sort) => {
      return dispatch(GetGroupInGroupRequest(id, page, sort))
    },
    GetDesignInGroupRequest: (id, page, sort) => {
      return dispatch(GetDesignInGroupRequest(id, page, sort))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupDetailContainer)
