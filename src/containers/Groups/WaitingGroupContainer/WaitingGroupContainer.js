import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetWaitingGroupRequest, DeleteGroupInGroupRequest, UpdateGroupInGroupRequest, GetGroupInGroupRequest } from "redux/modules/group";
import StyleGuide from 'StyleGuide';
import styled from 'styled-components';
import ScrollList from 'components/Commons/ScrollList';
import Group from "components/Groups/Group";
import osdstyle from "opendesign_style";

const GroupBox = styled.div`
  margin-bottom: 1rem;
  & .boxTitle {
    margin-left: 1rem;
    padding-bottom: 1rem;
    font-size: ${StyleGuide.font.size.heading4};
  }
`;

class WaitingGroupContainer extends Component {
  componentWillMount() {
    this.props.GetWaitingGroupRequest(this.props.id, null);
  }

  setOut = (id) => {
    this.props.DeleteGroupInGroupRequest(this.props.id, id)
      .then(res => {
        if (res.data.success === true) {
          this.props.GetWaitingGroupRequest(this.props.id, null);
        }
      }).catch(err => {
        console.log(err);
      });
  }

  setAccept = (id) => {
    this.props.UpdateGroupInGroupRequest(this.props.id, id)
      .then(res => {
        if (res.data.success === true) {
          this.props.GetWaitingGroupRequest(this.props.id, null)
            .then(this.props.GetGroupInGroupRequest(this.props.id, null, null));
        }
      }).then((data) => { console.log(data) }).catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <GroupBox>
        <div className="boxTitle">가입 신청중인 그룹 ({this.props.waitingGroup.length})</div>
        <ScrollList
          {...osdstyle.group_margin}
          ListComponent={Group}
          dataListAdded={this.props.waitingGroup}
          getListRequest={null}
          handleReject={this.setOut} handleAccept={this.setAccept} />
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
