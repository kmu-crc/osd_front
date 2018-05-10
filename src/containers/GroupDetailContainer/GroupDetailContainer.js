import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetGroupDetailRequest, GetDesignInGroupRequest } from "../../actions/Group";
import GroupDetail from "../../components/GroupDetail";

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
    DesignInGroup: state.GroupDetail.status.DesignInGroup
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      GetGroupDetailRequest: (id) => {
        return dispatch(GetGroupDetailRequest(id))
      },
      GetDesignInGroupRequest: (id, sort) => {
        return dispatch(GetDesignInGroupRequest(id, sort))
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupDetailContainer);
