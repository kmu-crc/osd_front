import React, { Component } from 'react';
import { connect } from 'react-redux';
import MyExistGroup from "components/Groups/MyExistGroup";
import { DeleteGroupInGroupRequest, GetMyExistGroupListRequest, GetGroupInGroupRequest, GetGroupCountRequest } from "actions/Group";

class MyExistGroupListContainer extends Component {
  render(){
    return(
      <MyExistGroup {...this.props}/>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.Authentication.status.token,
    MyGroupList: state.MyExistList.status.MyExistGroupList
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    DeleteGroupInGroupRequest: (id, groupId) => {
      return dispatch(DeleteGroupInGroupRequest(id, groupId))
    },
    GetMyExistGroupListRequest: (token, id) => {
      return dispatch(GetMyExistGroupListRequest(token, id))
    },
    GetGroupInGroupRequest: (id, page, sort) => {
      return dispatch(GetGroupInGroupRequest(id, page, sort))
    },
    GetGroupCountRequest: (id) => {
      return dispatch(GetGroupCountRequest(id))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyExistGroupListContainer);
