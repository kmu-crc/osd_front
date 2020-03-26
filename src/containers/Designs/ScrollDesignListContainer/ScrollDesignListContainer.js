import React, { Component } from "react";
import { connect } from "react-redux";
import { GetDesignListRequest } from "redux/modules/design";

import ScrollList from "components/Commons/ScrollList";
import opendesign_style from 'opendesign_style';
import Loading from "../../Designer/DesignerListContainer/DesignerListContainer";
import styled from "styled-components";
const NoDataMsg = styled.div`
  width: 100%;
  height: 250px; // 500px;
  padding: 50px; // 100px;
  font-size: 30px;
  color: #707070;
  font-family: Noto Sans KR;
  text-align: center;
`
class ScrollDesignListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { reload: false, category1: 0, category2: 0, orderOption: "update" };
    this.getList = this.getList.bind(this);
    this.handleReload = this.handleReload.bind(this);
  }
  componentDidMount() {
    this.props.keyword && this.props.keyword.length > 0 && this.props.GetDesignListRequest(0, this.props.sort, this.props.cate1, this.props.cate2, this.props.keyword);
  }
  componentDidUpdate(nextProps) {
    if (this.props.cate1 !== nextProps.cate1 || this.props.cate2 !== nextProps.cate2) {
      this.getList(0);
    }
  }
  async getList(page) {
    this.props.GetDesignListRequest(page, this.props.orderOption.keyword, this.props.cate1, this.props.cate2, this.props.keyword);
  }
  handleReload() {
    this.setState({ reload: !this.state.reload });
  }

  render() {
    const { cate1, cate2, orderOption, dataListAdded } = this.props;
    if (cate1 !== undefined || cate2 !== undefined) {
      if (this.state.category1 !== cate1) {
        this.setState({ category1: cate1 });
        this.getList(0);
      }
    }
    if (orderOption !== undefined) {
      if (this.state.orderOption !== orderOption) {
        this.setState({ orderOption: orderOption })
        this.getList(0);
      }
    }
    return (
      dataListAdded.length <= 0 ?
        <NoDataMsg>{this.props.message || "등록된 디자인이 없습니다."}</NoDataMsg> :

        this.props.status === "INIT" ?
          <Loading /> :

          <ScrollList
            manual={this.props.manual || false}
            {...opendesign_style.design_margin}
            getListRequest={this.getList}
            reload={this.state.reload}
            type="design"
            handleReload={this.handleReload}
            dataList={this.props.dataList}
            dataListAdded={this.props.dataListAdded} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataList: state.DesignList.status.DesignList,
    dataListAdded: state.DesignList.status.DesignListAdded,

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