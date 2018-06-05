import React, { Component } from "react";
import { connect } from "react-redux";
import { GetGroupListRequest } from "actions/Group";
// import ScrollGroupList from "components/Groups/ScrollGroupList";
import ScrollList from "components/Commons/ScrollList";
import Group from "components/Groups/Group";

class ScrollGroupListContainer extends Component {
  getList = (page) => {
    return this.props.GetGroupListRequest(page, this.props.sort);
  }

  render() {
    return(
      <div>
        <ScrollList getListRequest={this.getList} ListComponent={Group} dataList={this.props.dataList} dataListAdded={this.props.dataListAdded} columns={6}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataList: state.GroupList.status.GroupList,
    dataListAdded: state.GroupList.status.GroupListAdded
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
