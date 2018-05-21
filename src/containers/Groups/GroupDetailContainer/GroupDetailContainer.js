import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetGroupDetailRequest } from "actions/Group";
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
    GroupDetail: state.GroupDetail.status.GroupDetail
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      GetGroupDetailRequest: (id) => {
        return dispatch(GetGroupDetailRequest(id))
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupDetailContainer);
