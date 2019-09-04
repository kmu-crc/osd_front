import React, { Component } from "react";
import { connect } from "react-redux";
import { GetDesignListRequest } from "redux/modules/design";
import ScrollList from "components/Commons/ScrollList";
import Design from "components/Designs/Design";

class ScrollDesignListContainer extends Component {
  componentWillMount() {
    this.props.GetDesignListRequest(0, this.props.sort, this.props.cate1, this.props.cate2, this.props.keyword);
    // props가 바뀌면 제일 첫번째 페이지 리스트부터 새로 불러옴
  }

  getList = (page) => {
    return this.props.GetDesignListRequest(page, this.props.sort, this.props.cate1, this.props.cate2, this.props.keyword);
    // ScrollList에서는 그 다음 페이지부터 불러옴
  }

  render() {
    console.log("scroll-design-list-container:",this.props.dataListAdded);
    return (
      <ScrollList getListRequest={this.getList}
        ListComponent={Design}
        dataList={this.props.dataList} dataListAdded={this.props.dataListAdded}
        mobile={16} tablet={5} computer={4} largeScreen={2} widescreen={2} customClass="largeCustom" />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataList: state.DesignList.status.DesignList,
    dataListAdded: state.DesignList.status.DesignListAdded
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetDesignListRequest: (page, sort, categoryLevel1, categoryLevel2, keyword) => {
      return dispatch(GetDesignListRequest(page, sort, categoryLevel1, categoryLevel2, keyword))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScrollDesignListContainer);
