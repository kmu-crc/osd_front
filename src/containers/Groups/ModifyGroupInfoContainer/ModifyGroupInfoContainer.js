import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { GetGroupDetailRequest } from "actions/Group";
import { UpdateGroupRequest } from "actions/Group";
import ModifyGroupInfo from "components/Groups/ModifyGroupInfo";

class ModifyGroupInfoContainer extends Component {
  render() {
    return(
      <ModifyGroupInfo {...this.props}/>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    GroupDetail: state.GroupDetail.status.GroupDetail,
    token: state.Authentication.status.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      // GetGroupDetailRequest: (id) => {
      //   return dispatch(GetGroupDetailRequest(id))
      // }
      UpdateGroupRequest: (data, token) => {
        return dispatch(UpdateGroupRequest(data, token))
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModifyGroupInfoContainer);
