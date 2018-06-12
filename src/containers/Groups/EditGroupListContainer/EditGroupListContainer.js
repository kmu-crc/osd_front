import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetGroupInGroupRequest } from "actions/Group";
import ContentList from "components/Commons/ContentList";

class EditGroupListContainer extends Component {
  componentWillMount(){
    this.props.GetGroupInGroupRequest(this.props.match.params.id, null, this.props.match.params.sort);
  }

  shouldComponentUpdate(nextProps) {
    if (JSON.stringify(this.props) !== JSON.stringify(nextProps)) {
      this.props.GetGroupInGroupRequest(this.props.match.params.id, null, this.props.match.params.sort);
      return true;
    } else {
      return false;
    }
  }

  setOut = (id) => {
    console.log(id);
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
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditGroupListContainer);
