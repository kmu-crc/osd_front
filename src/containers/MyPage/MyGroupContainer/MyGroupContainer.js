import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetMyGroupListRequest } from "redux/modules/personal";
import ScrollList from "components/Commons/ScrollList";
import Group from "components/Groups/Group";

class MyGroupContainer extends Component {
  componentWillMount(){
    this.props.GetMyGroupListRequest(this.props.token, 0);
  }

  getList = (page) => {
    return this.props.GetMyGroupListRequest(this.props.token, page);
  }

  render() {
    return(
      <ScrollList getListRequest={this.getList}
                  ListComponent={Group}
                  type="Group"
                  dataList={this.props.dataList} dataListAdded={this.props.dataListAdded}
                  mobile={16} tablet={8} computer={8} largeScreen={5} widescreen={2} customClass="largeCustom"/>
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
