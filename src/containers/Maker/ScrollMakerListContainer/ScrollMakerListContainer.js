import React, { Component } from "react";
import { connect } from "react-redux";
import { GetMakerListRequest } from "actions/Maker";
import ScrollList from "components/Commons/ScrollList";
import Expert from "components/Experts/Expert";
import Expert_small from "components/Experts/Expert_small";

class ScrollMakerListContainer extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.sort !== prevProps.sort || this.props.cate1 !== prevProps.cate1 || this.props.cate2 !== prevProps.cate2 || this.props.cate3 !== prevProps.cate3 || this.props.keyword !== prevProps.keyword) {
      this.getList(0);
    }
  }
  componentWillMount() {
    this.getList(0);
  }
  getList = (page) => {
    return this.props.GetMakerListRequest(page, this.props.sort, this.props.cate1, this.props.cate2, this.props.cate3, this.props.keyword);
  }
  render() {
    return (

      <ScrollList
        isSmall={this.props.isSmall}
        getListRequest={this.getList}
        dataList={this.props.dataList}
        dataListAdded={this.props.dataListAdded}
        ListComponent={this.props.isSmall == true ? Expert_small : Expert}
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
    GetMakerListRequest: (page, sort, categoryLevel1, categoryLevel2, categoryLevel3, keyword) => {
      return dispatch(GetMakerListRequest(page, sort, categoryLevel1, categoryLevel2, categoryLevel3, keyword))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScrollMakerListContainer);
