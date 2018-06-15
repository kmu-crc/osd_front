import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    token: state.Authentication.status.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    UpdateGroupRequest: (id, data, token) => {
      return dispatch(UpdateGroupRequest(id, data, token))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModifyGroupInfoContainer);
