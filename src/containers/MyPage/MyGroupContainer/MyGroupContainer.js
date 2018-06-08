import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetMyGroupListRequest } from "actions/Users/MyDetail";
import ScrollList from "components/Commons/ScrollList";
import Group from "components/Groups/Group";

class MyGroupContainer extends Component {

  getList = (page) => {
    return this.props.GetMyGroupListRequest(this.props.location.state.token, page);
  }

  render() {
    return(
      <div>
        <ScrollList getListRequest={this.getList} 
                    ListComponent={Group} 
                    dataList={this.props.dataList} dataListAdded={this.props.dataListAdded} 
                    mobile={8} tablet={8} computer={5} largeScreen={4} widescreen={4} customClass="largeCustom"/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataList: state.MyDetail.status.MyGroup,
    dataListAdded: state.MyDetail.status.MyGroupAdded
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetMyGroupListRequest: (token, page) => {
      return dispatch(GetMyGroupListRequest(token, page));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyGroupContainer);
