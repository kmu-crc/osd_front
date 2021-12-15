import React, { Component } from "react";
import { connect } from "react-redux";
import { GetDesignerListRequest } from "redux/modules/designer";
import ScrollList from "components/Commons/ScrollList";
import ScrollList_mobile from "components/Commons/ScrollList_mobile";
import opendesign_style from "opendesign_style";
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
`
class ScrollDesignerListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { reload: false, category1: 0, category2: 0, categoryLevel3:0, orderOption: "update" }
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
      this.props.GetDesignerListRequest(0, this.props.sort, this.props.cate1, this.props.cate2, this.props.cate3, this.props.keyword);
  }
  getList = async (page) => {
    await this.props.GetDesignerListRequest(page, this.props.orderOption.keyword, this.props.cate1, this.props.cate2, this.props.cate3, this.props.keyword);
  };
  handleReload = () => {
    this.setState({ reload: !this.state.reload });
  }

  render() {
    const { dataListAdded } = this.props;
    console.log("designer:",this.props.display);
    return (
      <div>
        {dataListAdded.length <= 0 ?
          <NoDataMsg>{this.props.message || "등록된 디자이너가 없습니다."}</NoDataMsg>
          :
          this.props.isMobile==true?
          this.props.display == false?
          null:
          <ScrollList_mobile
            manual={this.props.manual || false}
            type="designer"
            getListRequest={this.getList}
            dataList={this.props.dataList}
            dataListAdded={this.props.dataListAdded}
            {...opendesign_mobile_style.designer_margin} />
          :
          this.props.display == false?
          null:
          <ScrollList
            manual={this.props.manual || false}
            type="designer"
            getListRequest={this.getList}
            dataList={this.props.dataList}
            dataListAdded={this.props.dataListAdded}
            {...opendesign_style.designer_margin} />
        }
      </div>
    );
  }

}

const mapStateToProps = (state) => ({
  dataList: state.DesignerList.status.DesignerList,
  dataListAdded: state.DesignerList.status.DesignerListAdded
});

const mapDispatchToProps = (dispatch) => ({
  GetDesignerListRequest: (page, sort, categoryLevel1, categoryLevel2, categoryLevel3, keyword) =>
    dispatch(GetDesignerListRequest(page, sort, categoryLevel1, categoryLevel2, categoryLevel3, keyword))
});

export default connect(mapStateToProps, mapDispatchToProps)(ScrollDesignerListContainer);
