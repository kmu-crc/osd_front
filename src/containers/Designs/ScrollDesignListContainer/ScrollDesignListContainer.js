import React, { Component } from "react";
import { connect } from "react-redux";
import { GetDesignListRequest } from "redux/modules/design";
import ScrollList from "components/Commons/ScrollList";
import ScrollList_mobile from "components/Commons/ScrollList_mobile";

import opendesign_style from 'opendesign_style';
import opendesign_mobile_style from "opendesign_mobile_style";

import styled from "styled-components";

const NoDataMsg = styled.div`
  width: 100%;
  height: 250px; // 500px;
  padding: 50px; // 100px;
  font-size: 30px;
  color: #707070;
  font-family: Noto Sans KR;
  text-align: center;
`;

class ScrollDesignListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { reload: false, category1: 0, category2: 0, category3:0, orderOption: "update" };
    this.getList = this.getList.bind(this);
    this.getInitList = this.getInitList.bind(this);
    this.handleReload = this.handleReload.bind(this);
  }
  componentDidMount() {
    this.getInitList();
  }
  componentDidUpdate(prevProps) {
    if (this.props.keyword !== prevProps.keyword) {
      this.getInitList();
    }
    if (this.props.cate1 !== prevProps.cate1 || this.props.cate2 !== prevProps.cate2 || this.props.cate3 !== prevProps.cate3) {
      this.setState({ category1: this.props.cate1, category2: this.props.cate2, category3: this.props.cate3 });
      this.getList(0);
    }
    if (this.props.orderOption !== prevProps.orderOption && this.props.orderOption !== undefined) {
      this.setState({ orderOption: this.props.orderOption })
      this.getList(0);
    }
  }
  getInitList = () => {
    this.props.keyword &&
      this.props.keyword.length &&
      this.props.GetDesignListRequest(0, this.props.sort, this.props.cate1, this.props.cate2, this.props.cate3, this.props.keyword);
  }
  async getList(page) {
    this.props.GetDesignListRequest(page, this.props.orderOption.keyword, this.props.cate1, this.props.cate2, this.props.cate3, this.props.keyword);
  }
  handleReload() {
    this.setState({ reload: !this.state.reload });
  }
  render() {
    const { dataListAdded } = this.props;
    console.log("design:",this.props.display);
    return (
      <React.Fragment>
        {dataListAdded.length <= 0 ?
          <NoDataMsg>{this.props.message || "등록된 디자인이 없습니다."}</NoDataMsg>
          :
          this.props.isMobile==true?
          this.props.display == false?
          null:
          <ScrollList_mobile
            manual={this.props.manual || false}
            {...opendesign_mobile_style.design_margin}
            getListRequest={this.getList}
            reload={this.state.reload}
            type="design"
            handleReload={this.handleReload}
            dataList={this.props.dataList}
            dataListAdded={this.props.dataListAdded} />
          :
          this.props.display == false?
          null:
          <ScrollList
            manual={this.props.manual || false}
            {...opendesign_style.design_margin}
            getListRequest={this.getList}
            reload={this.state.reload}
            type="design"
            handleReload={this.handleReload}
            dataList={this.props.dataList}
            dataListAdded={this.props.dataListAdded} />
        }
      </React.Fragment>
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
    GetDesignListRequest: (page, sort, categoryLevel1, categoryLevel2, categoryLevel3, keyword) => {
      return dispatch(GetDesignListRequest(page, sort, categoryLevel1, categoryLevel2, categoryLevel3, keyword))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScrollDesignListContainer);