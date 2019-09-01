import React, { Component } from "react";
import { connect } from "react-redux";
import MyGroupList from "components/Groups/JoinGroup/MyGroupList";
import { GetMyGroupListRequest, GroupJoinGroupRequest } from "redux/modules/group";
import { withRouter } from "react-router-dom";

class MyGroupListContainer extends Component {
  render() {
    return (
      <MyGroupList {...this.props} />
    );
  }
};

const mapStateToProps = (state) => {
  return {
    token: state.Authentication.status.token,
    groupList: state.Group.status.MyGroupList
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetMyGroupListRequest: (token, id) => {
      return dispatch(GetMyGroupListRequest(token, id));
    },
    GroupJoinGroupRequest: (data, token, id) => {
      return dispatch(GroupJoinGroupRequest(data, token, id));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyGroupListContainer));
