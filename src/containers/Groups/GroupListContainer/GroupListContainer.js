import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetGroupListRequest, GetGroupTotalCountRequest } from "redux/modules/group";
import OrderOption from "components/Commons/OrderOption";
import styled from 'styled-components';
import ScrollList from "components/Commons/ScrollList";
import Loading from "components/Commons/Loading";
import Group from "components/Groups/Group";
import osdstyle from "opendesign_style";

const TextWrapper = styled.div`
    position: relative;
    width: 1920px;
    line-height: 37px;
    text-align: center;
    font-size: 25px;
    font-family: Noto Sans KR;
    font-weight: 700;
    color: red;
    cursor: pointer;
`;
const JoinGroup = styled.div`
    position: relative;
    left:1761px;
    width:115px;
    text-align: left;
    font-size: 20px;
    cursor: pointer;
    font-family: Noto Sans KR;
    font-weight:500;
    color: red;
    line-height: 29px;
    border-bottom: 1.5px solid red;
`;

class GroupListContainer extends Component {
  state = {
    reload: false,
    search: null,
    count: 0,
    this_order: { text: "최신순", keyword: "update" }
  }
  componentDidMount() {
    this.props.GetGroupTotalCountRequest()
      .then(() => { this.setState({ count: this.props.Count }) })
      .then(() => { this.props.GetGroupListRequest(0, null, null) })
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
    const { dataList, dataListAdded } = this.props
    return (
      <React.Fragment>
        <OrderOption order_clicked={this.changeOrderOps} selected={this_order} />

        <TextWrapper>그룹({count})</TextWrapper>

        <div style={{ position: "relative" }}><JoinGroup onClick={() => this.createGroup()}>그룹 등록하기</JoinGroup></div>

        <div id="list" style={{ position: "relative", paddingTop: "100px" }}>
          {this.props.status === "INIT" ?
            <Loading /> :
            <ScrollList{...osdstyle.group_margin} ListComponent={Group} reload={reload} handleReload={this.handleReload}
              dataList={dataList} dataListAdded={dataListAdded} getListRequest={this.getList} />}
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataList: state.GroupList.status.GroupList,
    dataListAdded: state.GroupList.status.GroupListAdded,
    valid: state.Authentication.status.valid,
    userInfo: state.Authentication.status.userInfo,
    Count: state.GroupList.status.GroupCount
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    GetGroupListRequest(page, sort, keyword) {
      return dispatch(GetGroupListRequest(page, sort, keyword))
    },
    GetGroupTotalCountRequest: () => {
      return dispatch(GetGroupTotalCountRequest())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupListContainer)
