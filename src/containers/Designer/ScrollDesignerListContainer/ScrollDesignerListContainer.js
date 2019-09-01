import React, { Component } from "react";
import { connect } from "react-redux";
import { GetDesignerListRequest } from "redux/modules/designer";
import ScrollList from "components/Commons/ScrollList";
import Designer from "components/Designers/Designer";
import opendesign_style from "opendesign_style";

class ScrollDesignerListContainer extends Component {
  componentWillMount() {
    this.props.GetDesignerListRequest(0, this.props.sort, this.props.cate1, this.props.cate2, this.props.keyword);
    // props가 바뀌면 제일 첫번째 페이지 리스트부터 새로 불러옴
  }

  getList = (page) => {
    return this.props.GetDesignerListRequest(page, this.props.sort, this.props.cate1, this.props.cate2, this.props.keyword);
  }

  render() {
    return (
      <ScrollList getListRequest={this.getList}
        ListComponent={Designer}
        dataList={this.props.dataList} dataListAdded={this.props.dataListAdded}
        {...opendesign_style.designer_margin}
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
    GetDesignerListRequest: (page, sort, categoryLevel1, categoryLevel2, keyword) => {
      return dispatch(GetDesignerListRequest(page, sort, categoryLevel1, categoryLevel2, keyword))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScrollDesignerListContainer);
