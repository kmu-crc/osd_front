import React, { Component } from 'react';
import { connect } from 'react-redux';
 import { GetWaitingGroupRequest, DeleteGroupInGroupRequest, UpdateGroupInGroupRequest, GetGroupInGroupRequest } from "actions/Group";
 import ContentList from "components/Commons/ContentList";

class WaitingGroupContainer extends Component {
  componentWillMount(){
    this.props.GetWaitingGroupRequest(this.props.id, null)
    .then(res => {
      if (res.waitingGroup) {
        const num = res.waitingGroup.length;
        this.props.getCount(num);
      } else {
        this.props.getCount(0);
      }
    });
  }

  setOut = (id) => {
    this.props.DeleteGroupInGroupRequest(this.props.id, id)
    .then(res => {
      if (res.data.success === true) {
        this.props.GetWaitingGroupRequest(this.props.id, null)
        .then(res => {
          if (res.waitingGroup) {
            const num = res.waitingGroup.length;
            this.props.getCount(num);
          } else {
            this.props.getCount(0);
          }
        });
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
        .then(res => {
          if (res.waitingGroup) {
            const num = res.waitingGroup.length;
            this.props.getCount(num);
          } else {
            this.props.getCount(0);
          }
        })
        .then(this.props.GetGroupInGroupRequest(this.props.id, null, null));
      }
    }).then((data) => {console.log(data)}).catch(err => {
      console.log(err);
    });
  }

  render() {
    return(
      <ContentList data={this.props.waitingGroup} type="group" rerender={true}
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
    },
    GetGroupInGroupRequest: (id, page, sort) => {
      return dispatch(GetGroupInGroupRequest(id, page, sort))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WaitingGroupContainer);
