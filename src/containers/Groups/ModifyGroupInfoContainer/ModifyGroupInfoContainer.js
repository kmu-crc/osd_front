import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetGroupDetailRequest } from "actions/Group";
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
    userInfo: state.Authentication.status.userInfo
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      GetGroupDetailRequest: (id) => {
        return dispatch(GetGroupDetailRequest(id))
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModifyGroupInfoContainer);
