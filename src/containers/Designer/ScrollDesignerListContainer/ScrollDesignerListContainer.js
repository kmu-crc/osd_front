import React, { Component } from "react";
import { connect } from "react-redux";
import { GetDesignerListRequest } from "actions/Designer";
import ScrollList from "components/Commons/ScrollList";
import Designer from "components/Designers/Designer";

class ScrollDesignerListContainer extends Component {
  componentWillMount(){
    this.props.GetDesignerListRequest(0, this.props.sort, this.props.cate1, this.props.cate2, this.props.keyword);
    // props가 바뀌면 제일 첫번째 페이지 리스트부터 새로 불러옴
  }

  getList = (page) => {
    return this.props.GetDesignerListRequest(page, this.props.sort, this.props.cate1, this.props.cate2, this.props.keyword);
  }

  render() {
    return(
      <ScrollList getListRequest={this.getList}
                  ListComponent={Designer}
                  userInfo={this.props.userInfo}
                  type="Designer"
                  dataList={this.props.dataList} dataListAdded={this.props.dataListAdded}
                  mobile={16} tablet={5} computer={4} largeScreen={2} widescreen={2} customClass="largeCustom"/>
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
