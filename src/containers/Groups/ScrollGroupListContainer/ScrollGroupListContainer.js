import React, { Component } from "react";
import { connect } from "react-redux";
import { GetGroupListRequest } from "actions/Group";
import ScrollList from "components/Commons/ScrollList";
import Group from "components/Groups/Group";

class ScrollGroupListContainer extends Component {
  componentWillMount(){
    console.log("scrollListContainer");
    this.props.GetGroupListRequest(0, this.props.sort);
    // props가 바뀌면 제일 첫번째 페이지 리스트부터 새로 불러옴
  }
  getList = (page) => {
    return this.props.GetGroupListRequest(page, this.props.sort);
    // ScrollList에서는 그 다음 페이지부터 불러옴
  }

  render() {
    return(
      <div>
        <ScrollList getListRequest={this.getList} 
                    ListComponent={Group} 
                    dataList={this.props.dataList} dataListAdded={this.props.dataListAdded} 
                    mobile={16} tablet={5} computer={4} largeScreen={2} widescreen={2} customClass="largeCustom"/>
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
