import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetGroupListRequest, GetGroupTotalCountRequest } from "redux/modules/group";
import OrderOption_mobile from "components/Commons/OrderOption_mobile";
import styled from 'styled-components';
import ScrollList_mobile from "components/Commons/ScrollList_mobile";
import Loading from "components/Commons/Loading";
import osdstyle from "opendesign_mobile_style";
import Category from "components/Commons/Category"

const Wrapper = styled.div`
  width:360px;
  margin-left:auto;
  margin-right:auto;
  display:flex;
  .contentBox{
    max-width:354px;
  }
  .header_box{
    width:100%;
    padding-right:10px;
    display:flex;
    justify-content:space-between;
    margin-bottom:5px;
    .category_name{
      font-family:Spoqa Han Sans Neo;
      font-size:12px;
      font-weight:500;
      color:#1E9B79;
    }
  }
  .scroll_wrapper{
    width:100%;
  }
`;

class GroupListContainer_mobile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      screenWidth: window.innerWidth,
      reload: false,
      search: null,
      count: 0,
      this_order: this.props.sort == "like" ? { text: "인기순", keyword: "like" } : { text: "최신순", keyword: "update" }
    }
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    this.props.GetGroupTotalCountRequest()
      .then(() => { this.setState({ count: this.props.Count }) })
      .then(() => { this.props.GetGroupListRequest(0, null, null) });
    window.addEventListener("resize", this.handleResize, false);

  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize, false);
  };
  handleResize() {
    console.log(window.innerWidth);
    this.setState({ screenWidth: window.innerWidth })
  }
  handleReload = () => {
    this.setState({ reload: !this.state.reload });
  }
  createGroup = () => {
    window.location.href = "/createGroup"
  }
  changeOrderOps = async (order) => {
    await this.setState({ this_order: order });
    this.handleReload();
    this.getList(0);
    const orderkeyword = order.keyword == null ? "update" : `${order.keyword}`;
    window.location.href = "/group/" + orderkeyword;
  }
  getList = async (page) => {
    const keyword = this.state.search
    const sort = this.state.this_order.keyword
    return this.props.GetGroupTotalCountRequest()
      .then(() => { this.setState({ count: this.props.Count }) })
      .then(() => { this.props.GetGroupListRequest(page, sort, keyword) })
  }

  render() {
    const { this_order, count, reload } = this.state;
    const { dataList, dataListAdded } = this.props;

    return (<Wrapper>
      <div className="contentBox">
        <div className="header_box">
          <div style={{ width: "67px" }} />
          <div className="category_name">그룹({count})</div>
          <OrderOption_mobile type="group" order_clicked={this.handleChangeOrderOps} selected={this_order} />
        </div>
        <div className="scroll_wrapper">
          {this.props.status === "INIT"
            ? <Loading />
            : <ScrollList_mobile
              {...osdstyle.group_margin}
              type="group"
              reload={reload}
              handleReload={this.handleReload}
              dataList={dataList}
              dataListAdded={dataListAdded}
              getListRequest={this.getList} />}
        </div>
      </div>
    </Wrapper>)
  }
}

const mapStateToProps = (state) => ({
  dataList: state.GroupList.status.GroupList,
  dataListAdded: state.GroupList.status.GroupListAdded,
  valid: state.Authentication.status.valid,
  userInfo: state.Authentication.status.userInfo,
  Count: state.GroupList.status.GroupCount
});

const mapDispatchToProps = (dispatch) => ({
  GetGroupListRequest: (page, sort, keyword) => dispatch(GetGroupListRequest(page, sort, keyword)),
  GetGroupTotalCountRequest: () => dispatch(GetGroupTotalCountRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupListContainer_mobile);
