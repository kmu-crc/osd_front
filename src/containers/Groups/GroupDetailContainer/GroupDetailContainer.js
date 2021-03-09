import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  DesignInGroupClear, GroupInGroupClear,
  GetGroupDetailRequest, GetGroupCountRequest,
  GetLikeGroupRequest, LikeGroupRequest,
  UnlikeGroupRequest, DeleteGroupRequest,
  GetDesignInGroupRequest, GetGroupInGroupRequest,
  GetTotalCountGroupInGroupRequest,
  GetWaitingDesignRequest,
  GetWaitingGroupRequest,

  //  // group-notice w/o redux 
  // GetLastestGroupNoticeRequest,
} from "redux/modules/group";
import GroupDetail from "components/Groups/GroupDetail";


class GroupDetailContainer extends Component {
  componentWillMount() {
    this.props.GetWaitingDesignRequest(this.props.id, null);
    this.props.GetWaitingGroupRequest(this.props.id, null);

  }
  render() {
    return (
      <GroupDetail
        {...this.props}
        getCountGroup={GetTotalCountGroupInGroupRequest} />
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
    Count: state.Group.status.Count,
    waitingDesign: state.Group.status.waitingDesign,
    waitingGroup: state.Group.status.waitingGroup,

    // GroupNotice: state.Group.status.GroupNotice,
    // GroupMyNotice: state.Group.status.GroupMyNotice,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    GetWaitingDesignRequest: (id, sort) => dispatch(GetWaitingDesignRequest(id, sort)),
    GetWaitingGroupRequest: (id, sort) => dispatch(GetWaitingGroupRequest(id, sort)),
    GetGroupDetailRequest: (id) => dispatch(GetGroupDetailRequest(id)),
    GetLikeGroupRequest: (id, token) => dispatch(GetLikeGroupRequest(id, token)),
    LikeGroupRequest: (id, token) => dispatch(LikeGroupRequest(id, token)),
    UnlikeGroupRequest: (id, token) => dispatch(UnlikeGroupRequest(id, token)),
    GetGroupCountRequest: (id) => dispatch(GetGroupCountRequest(id)),
    DesignInGroupClear: (data) => dispatch(DesignInGroupClear(data)),
    GroupInGroupClear: (data) => dispatch(GroupInGroupClear(data)),
    DeleteGroupRequest: (id, token) => dispatch(DeleteGroupRequest(id, token)),
    GetGroupInGroupRequest: (id, page, sort) => dispatch(GetGroupInGroupRequest(id, page, sort)),
    GetDesignInGroupRequest: (id, page, sort) => dispatch(GetDesignInGroupRequest(id, page, sort)),
    // GetAllNoticeYourGroupRequest: (id) => dispatch(GetAllNoticeYourGroupRequest(id)),
    // GetGroupNoticeYouJoinedRequest: (id, user_id) => dispatch(GetGroupNoticeYouJoinedRequest(id, user_id)),
    // CreateGroupNoticeRequest: (id) => dispatch(CreateGroupNoticeRequest(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupDetailContainer)
