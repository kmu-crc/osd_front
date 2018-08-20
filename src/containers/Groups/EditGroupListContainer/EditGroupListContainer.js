import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetGroupInGroupRequest, DeleteGroupInGroupRequest } from "actions/Group";
import ContentList from "components/Commons/ContentList";

class EditGroupListContainer extends Component {
  componentWillMount(){
    this.props.GetGroupInGroupRequest(this.props.match.params.id, null, this.props.match.params.sort);
  }

  setOut = (id) => {
    this.props.DeleteGroupInGroupRequest(this.props.match.params.id, id)
    .then(res => {
      if (res.data.success === true) {
        this.props.GetGroupInGroupRequest(this.props.match.params.id, null, this.props.match.params.sort);
      }
    }).catch(err=>{
      console.log(err);
    });
  }

  render() {
    return(
      <ContentList data={this.props.EditGroupList} type="group" handleClick={this.setOut}/>
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
