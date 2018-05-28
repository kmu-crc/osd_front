import React, { Component } from "react";
import { connect } from "react-redux";
import { GetGroupListRequest } from "actions/Group";
import ScrollGroupList from "components/Groups/ScrollGroupList";

class ScrollGroupListContainer extends Component {
  render() {
    return(
      <div>
        <ScrollGroupList {...this.props}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    GroupList: state.GroupList.status.GroupList,
    GroupListAdded: state.GroupList.status.GroupListAdded
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      GetGroupListRequest: (page, sort) => {
        return dispatch(GetGroupListRequest(page, sort))
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScrollGroupListContainer);
