import React, { Component } from "react";
import { connect } from "react-redux";
import MyGroupList from "components/Groups/JoinGroup/MyGroupList";
import { GetMyGroupListRequest, GroupJoinGroupRequest, GetWaitingGroupRequest } from "redux/modules/group";
import { withRouter } from "react-router-dom";

class MyGroupListContainer extends Component {
  componentDidMount() {
    this.props.GetMyGroupListRequest(this.props.token, this.props.match.params.id);
    this.props.GetWaitingGroupRequest(this.props.match.params.id, "update");
  }
  render() {
    return (
      <MyGroupList {...this.props} />
    );
  }
};

const mapStateToProps = (state) => {
  return {
    token: state.Authentication.status.token,
    groupList: state.Group.status.MyGroupList,
    waitingGroup: state.Group.status.waitingGroup,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetMyGroupListRequest: (token, id) => dispatch(GetMyGroupListRequest(token, id)),
    GroupJoinGroupRequest: (data, token, id) => dispatch(GroupJoinGroupRequest(data, token, id)),
    GetWaitingGroupRequest: (id, sort) => dispatch(GetWaitingGroupRequest(id, sort)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyGroupListContainer));
