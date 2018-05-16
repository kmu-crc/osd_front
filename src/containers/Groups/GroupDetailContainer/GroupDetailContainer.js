import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetGroupDetailRequest, GetDesignInGroupRequest, GetGroupInGroupRequest } from "actions/Group";
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
    DesignInGroup: state.GroupDetail.status.DesignInGroup,
    GroupInGroup: state.GroupDetail.status.GroupInGroup
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      GetGroupDetailRequest: (id) => {
        return dispatch(GetGroupDetailRequest(id))
      },
      GetDesignInGroupRequest: (id, sort) => {
        return dispatch(GetDesignInGroupRequest(id, sort))
      },
      GetGroupInGroupRequest: (id, sort) => {
        return dispatch(GetGroupInGroupRequest(id, sort))
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupDetailContainer);
