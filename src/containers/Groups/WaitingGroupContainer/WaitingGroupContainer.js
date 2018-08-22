import React, { Component } from 'react';
import { connect } from 'react-redux';
 import { GetWaitingGroupRequest, DeleteGroupInGroupRequest, UpdateGroupInGroupRequest } from "actions/Group";
 import ContentList from "components/Commons/ContentList";

class WaitingGroupContainer extends Component {
  componentWillMount(){
    this.props.GetWaitingGroupRequest(this.props.id, null);
  }

  setOut = (id) => {
    this.props.DeleteGroupInGroupRequest(this.props.id, id)
    .then(res => {
      if (res.data.success === true) {
        this.props.GetWaitingGroupRequest(this.props.id, null)
      }
    }).catch(err=>{
      console.log(err);
    });
  }

  setAccept = (id) => {
    this.props.UpdateGroupInGroupRequest(this.props.id, id)
    .then(res => {
      if (res.data.success === true) {
        this.props.GetWaitingGroupRequest(this.props.id, null)
      }
    }).then((data) => {console.log(data)}).catch(err => {
      console.log(err);
    });
  }

  render() {
    return(
      <ContentList data={this.props.waitingGroup} type="group"
                   handleClick={this.setOut} handleAccept={this.setAccept}/>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    waitingGroup: state.GroupWaitingList.status.waitingGroup
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetWaitingGroupRequest : (id, sort) => {
      return dispatch(GetWaitingGroupRequest(id, sort))
    },
    DeleteGroupInGroupRequest: (id, groupId) => {
      return dispatch(DeleteGroupInGroupRequest(id, groupId))
    },
    UpdateGroupInGroupRequest: (id, groupId) => {
      return dispatch(UpdateGroupInGroupRequest(id, groupId))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WaitingGroupContainer);
