import React, { Component } from "react";
import { connect } from "react-redux";
import { GetDesignerListRequest } from "actions/Designer";
import ScrollList from "components/Commons/ScrollList";
import Expert from "components/Experts/Expert";
import Expert_small from "components/Experts/Expert_small";

class ScrollDesignerListContainer extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.sort !== prevProps.sort || this.props.cate1 !== prevProps.cate1 || this.props.cate2 !== prevProps.cate2 || this.props.cate3 !== prevProps.cate3 || this.props.keyword !== prevProps.keyword) {
      this.getList(0);
    }
  }
  componentWillMount() {
    this.getList(0);
  }
  getList = (page) => {
    return this.props.GetDesignerListRequest(page, this.props.sort, this.props.cate1, this.props.cate2, this.props.cate3, this.props.keyword);
  }

  render() {
    console.log(this.props.sort, this.props.cate1, this.props.cate2, this.props.cate3, this.props.keyword);
    return (
      <ScrollList
        isSmall={this.props.isSmall}
        getListRequest={this.getList}
        ListComponent={this.props.isSmall == true ? Expert_small : Expert}
        type="designer"
        dataList={this.props.dataList} 
        dataListAdded={this.props.dataListAdded}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataList: state.DesignerList.status.DesignerList,
    dataListAdded: state.DesignerList.status.DesignerListAdded
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetDesignerListRequest: (page, sort, categoryLevel1, categoryLevel2, categoryLevel3, keyword) => {
      return dispatch(GetDesignerListRequest(page, sort, categoryLevel1, categoryLevel2, categoryLevel3, keyword))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScrollDesignerListContainer);
