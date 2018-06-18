import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DeleteGroupRequest, UpdateGroupRequest } from "actions/Group";
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
    token: state.Authentication.status.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    DeleteGroupRequest: (id, token) => {
      return dispatch(DeleteGroupRequest(id, token))
    },
    UpdateGroupRequest: (id, data, token) => {
      return dispatch(UpdateGroupRequest(id, data, token))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModifyGroupInfoContainer);
