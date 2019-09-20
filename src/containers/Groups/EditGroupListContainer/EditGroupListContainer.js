import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetGroupInGroupRequest, DeleteGroupInGroupRequest } from "redux/modules/group";
import ScrollList from "components/Commons/ScrollList";
import opendesign_style from 'opendesign_style';
import styled from 'styled-components';
import Group from "components/Groups/Group";
import osdstyle from "opendesign_style";
import Loading from 'components/Commons/Loading';

const GroupBox = styled.div`
  margin-bottom: 1rem;
  & .boxTitle {
    margin-left: 1rem;
    padding-bottom: 1rem;
    font-size: ${opendesign_style.font.size.heading4};
  }
`;

class EditGroupListContainer extends Component {
  state = { reload: false };
  componentWillMount() {
    this.props.GetGroupInGroupRequest(this.props.id, null, null);
  }
  handleReload = () => {
    this.setState({ reload: !this.state.reload });
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
    const { reload } = this.state;
    return (
      <GroupBox>
        <div className="boxTitle">등록된 그룹 ({this.props.EditGroupList.length})</div>
        {this.props.status === "INIT" ?
          <Loading /> : <ScrollList
            {...osdstyle.group_margin}
            reload={reload}
            handleReload={this.handleReload}
            ListComponent={Group}
            dataListAdded={this.props.EditGroupList}
            getListRequest={null}
            handleReject={this.setOut} />}
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
