import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetGroupListRequest } from "../../actions/Group";
import GroupList from "../../components/GroupList";

class GroupListContainer extends Component {

  componentWillMount(){
    this.props.GetGroupListRequest(null);
  }

  render() {
    return(
      <div>
        <GroupList GroupList={this.props.GroupList}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    GroupList: state.GroupList.status.GroupList
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      GetGroupListRequest: (sort) => {
        return dispatch(GetGroupListRequest(sort))
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupListContainer);
