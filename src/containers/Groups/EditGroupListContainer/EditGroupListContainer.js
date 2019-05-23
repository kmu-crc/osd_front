import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetGroupInGroupRequest, DeleteGroupInGroupRequest } from "actions/Group";
import ContentList from "components/Commons/ContentList";
import StyleGuide from 'StyleGuide';
import styled from 'styled-components';

const GroupBox = styled.div`
  margin-bottom: 1rem;
  & .boxTitle {
    padding-bottom: 1rem;
    font-size: ${StyleGuide.font.size.heading4};
  }
`;

class EditGroupListContainer extends Component {
  componentWillMount(){
    this.props.GetGroupInGroupRequest(this.props.id, null, null);
  }

  setOut = (id) => {
    const confirm = window.confirm("이 그룹을 탈퇴시키겠습니까?")
    if (!confirm) return
    this.props.DeleteGroupInGroupRequest(this.props.id, id)
    .then(res => {
      if (res.data.success === true) {
        this.props.GetGroupInGroupRequest(this.props.id, null, null);
      }
    }).catch(err=>{
      console.log(err);
    });
  }

  render() {
    return(
      <GroupBox>
        <div className="boxTitle">등록된 그룹 ({this.props.EditGroupList.length})</div>
        <ContentList data={this.props.EditGroupList} rerender={true} type="group" handleClick={this.setOut}/>
      </GroupBox>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    EditGroupList: state.GroupDetail.status.GroupInGroup,
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
