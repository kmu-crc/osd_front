import React, { Component } from "react";
import { connect } from "react-redux";
import { GetDesignerListRequest } from "redux/modules/designer";
import ScrollList from "components/Commons/ScrollList";
import opendesign_style from "opendesign_style";

class ScrollDesignerListContainer extends Component {
  state = {
    reload: false,
    category1:0,
    category2:0,
    orderOption:"update"
  }

  componentDidMount() {
    this.props.GetDesignerListRequest(0, this.props.sort, this.props.cate1, this.props.cate2, this.props.keyword);
    // props가 바뀌면 제일 첫번째 페이지 리스트부터 새로 불러옴
  }
  getList = async (page) => {
    this.props.GetDesignerListRequest(page, this.props.orderOption.keyword, this.props.cate1, this.props.cate2, this.props.keyword);
  };
  handleReload = () => {
    this.setState({ reload: !this.state.reload });
  }

  render() {
    const {cate1, cate2, orderOption} = this.props;
    if(cate1 !== undefined || cate2 !== undefined){
      if(this.state.category1 !== cate1){
        this.getList(0);
        this.setState({category1:cate1});
      }
    }
    console.log(orderOption);
    if(orderOption !== undefined){
      if(this.state.orderOption !== orderOption){
        this.getList(0);
        this.setState({orderOption:orderOption})
      }
    }
    return (
      
      <ScrollList
        getListRequest={this.getList}
        type="designer"
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
