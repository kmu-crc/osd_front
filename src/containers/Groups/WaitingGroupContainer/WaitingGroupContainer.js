import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetWaitingGroupRequest, DeleteGroupInGroupRequest, UpdateGroupInGroupRequest, GetGroupInGroupRequest } from "redux/modules/group";
import opendesign_style from 'opendesign_style';
import styled from 'styled-components';
import ScrollList from 'components/Commons/ScrollList';
import osdstyle from "opendesign_style";
import Loading from 'components/Commons/Loading';

const GroupBox = styled.div`
margin-bottom: 5px;
& .boxTitle {
  margin-bottom:5px;
  font-size: 20px;
}
.boxContent{
  margin-top:22px;
}
`;

class WaitingGroupContainer extends Component {
  state = { reload: false };
  componentWillMount() {
    this.props.GetWaitingGroupRequest(this.props.id, null);
  }
  handleReload = () => {
    this.setState({ reload: !this.state.reload });
  }
  setOut = (id) => {
    this.props.DeleteGroupInGroupRequest(this.props.id, id)
      .then(res => {
        if (res.data.success === true) {
          this.props.GetWaitingGroupRequest(this.props.id, null)
            .then(() => { this.handleReload(); })
        }
      }).catch(err => {
        console.error(err);
      });
  }
  setAccept = (id) => {
    this.props.UpdateGroupInGroupRequest(this.props.id, id)
      .then(res => {
        if (res.data.success === true) {
          this.props.GetWaitingGroupRequest(this.props.id, null)
            // .then(this.props.GetGroupInGroupRequest(this.props.id, null, null))
            .then(() => { this.handleReload(); })
        }
      }).then((data) => { console.log(data) }).catch(err => {
        console.error(err);
      });
  }

  render() {
    const { reload } = this.state;
    return (
      <GroupBox style={{marginBottom:`${this.props.waitingGroup&&this.props.waitingGroup.length==0?"0px":"75px"}`}}>
        <div className="boxTitle">가입 신청중인 그룹 ({this.props.waitingGroup.length})</div>
        {this.props.status === "INIT" ?
          <Loading /> :
          <div className="boxContent">
          <ScrollList
            height={"max-content"}
            {...osdstyle.group_margin}
            reload={reload}
            handleReload={this.handleReload}
            type="group"
            dataListAdded={this.props.waitingGroup}
            getListRequest={null}
            rejectText={"거절"}
            handleReject={this.setOut} 
            handleAccept={this.setAccept} />
            </div>
        }
      </GroupBox>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    waitingGroup: state.Group.status.waitingGroup
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetWaitingGroupRequest: (id, sort) => {
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
