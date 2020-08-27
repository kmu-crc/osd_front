import React, { Component } from "react";
import { connect } from "react-redux";
import { GetMakerListRequest } from "actions/Maker";
import ScrollList from "components/Commons/ScrollListNew";
import Expert from "components/Experts/Expert";

class ScrollMakerListContainer extends Component {
  componentWillMount() {
    this.props.GetMakerListRequest(0, this.props.sort, this.props.cate1, this.props.cate2, this.props.keyword);
  }
  getList = (page) =>
    this.props.GetMakerListRequest(page, this.props.sort, this.props.cate1, this.props.cate2, this.props.keyword);

  render() {
    return (
      <ScrollList
        getListRequest={this.getList}
        dataList={this.props.dataList}
        dataListAdded={this.props.dataListAdded}
        ListComponent={Expert}
        type="maker" />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataList: state.MakerList.status.List,
    dataListAdded: state.MakerList.status.ListAdded
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetMakerListRequest: (page, sort, categoryLevel1, categoryLevel2, keyword) => {
      return dispatch(GetMakerListRequest(page, sort, categoryLevel1, categoryLevel2, keyword))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScrollMakerListContainer);
