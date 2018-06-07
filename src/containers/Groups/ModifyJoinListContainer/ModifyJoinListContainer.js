import React, { Component } from 'react';
import { connect } from 'react-redux';
 import { GetWaitingDesignRequest, GetWaitingGroupRequest } from "actions/Group";
 import ModifyJoinList from "components/Groups/ModifyJoinList";

class ModifyJoinListContainer extends Component {
  render() {
    return(
      <div>
        <ModifyJoinList {...this.props}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    waitingDesign: state.GroupWaitingList.status.waitingDesign,
    waitingGroup: state.GroupWaitingList.status.waitingGroup
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetWaitingDesignRequest : (id) => {
      return dispatch(GetWaitingDesignRequest(id))
    },
    GetWaitingGroupRequest : (id) => {
      return dispatch(GetWaitingGroupRequest(id))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModifyJoinListContainer);
