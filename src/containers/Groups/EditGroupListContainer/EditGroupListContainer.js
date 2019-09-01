import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetGroupInGroupRequest, DeleteGroupInGroupRequest } from "redux/modules/group";
import ScrollList from "components/Commons/ScrollList";
import StyleGuide from 'StyleGuide';
import styled from 'styled-components';
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

class EditGroupListContainer extends Component {
  componentWillMount() {
    this.props.GetGroupInGroupRequest(this.props.id, null, null);
  }

  setOut = (id) => {
    this.props.DeleteGroupInGroupRequest(this.props.id, id)
      .then(res => {
        if (res.data.success === true) {
          this.props.GetGroupInGroupRequest(this.props.id, null, null);
        }
      }).catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <GroupBox>
        <div className="boxTitle">등록된 그룹 ({this.props.EditGroupList.length})</div>
        <ScrollList
          {...osdstyle.group_margin}
          ListComponent={Group}
          dataListAdded={this.props.EditGroupList}
          getListRequest={null}
          handleReject={this.setOut} />
      </GroupBox>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    EditGroupList: state.Group.status.GroupInGroup,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetGroupInGroupRequest: (id, page, sort) => {
      return dispatch(GetGroupInGroupRequest(id, page, sort))
    },
    DeleteGroupInGroupRequest: (id, groupId) => {
      return dispatch(DeleteGroupInGroupRequest(id, groupId))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditGroupListContainer);
