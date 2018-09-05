import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetGroupDetailRequest, UpdateGroupRequest } from "actions/Group";
import ModifyGroupInfo from "components/Groups/ModifyGroupInfo";

class ModifyGroupInfoContainer extends Component {
  componentDidMount(){
    this.props.GetGroupDetailRequest(this.props.id, this.props.token);
  }

  render() {
    return(
      <ModifyGroupInfo {...this.props}/>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.Authentication.status.token,
    GroupDetail: state.GroupDetail.status.GroupDetail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetGroupDetailRequest: (id) => {
      return dispatch(GetGroupDetailRequest(id))
    },
    UpdateGroupRequest: (id, data, token) => {
      return dispatch(UpdateGroupRequest(id, data, token))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModifyGroupInfoContainer);
