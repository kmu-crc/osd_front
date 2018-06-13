import React, { Component } from 'react';
import { connect } from 'react-redux';
 import { GetWaitingGroupRequest, DeleteGroupInGroupRequest } from "actions/Group";
 import ContentList from "components/Commons/ContentList";

class WaitingGroupContainer extends Component {
  componentWillMount(){
    this.props.GetWaitingGroupRequest(this.props.match.params.id, this.props.match.params.sort);
  }

  shouldComponentUpdate(nextProps) {
    if (JSON.stringify(this.props) !== JSON.stringify(nextProps)) {
      this.props.GetWaitingGroupRequest(this.props.match.params.id, null, this.props.match.params.sort);
      return true;
    } else {
      return false;
    }
  }

  setOut = (id) => {
    alert("그룹을 삭제하시겠습니까?");
    this.props.DeleteGroupInGroupRequest(this.props.match.params.id, id)
    .then(this.props.GetWaitingGroupRequest(this.props.match.params.id, this.props.match.params.sort))
    .catch(err=>{
      console.log(err);
    });
  }

  setAccept = (id) => {
    console.log(id);
  }

  render() {
    return(
      <ContentList data={this.props.waitingGroup} type="group" handleClick={this.setOut} handleAccept={this.setAccept}/>
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WaitingGroupContainer);
