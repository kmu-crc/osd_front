import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetGroupDetailRequest, GetLikeGroupRequest, LikeGroupRequest, UnlikeGroupRequest } from "actions/Group";
import GroupDetail from "components/Groups/GroupDetail";

class GroupDetailContainer extends Component {
  render() {
    return(
      <div>
        <GroupDetail {...this.props}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    GroupDetail: state.GroupDetail.status.GroupDetail,
    userInfo: state.Authentication.status.userInfo,
    token: state.Authentication.status.token,
    like: state.GroupLike.status.like
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
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupDetailContainer);
