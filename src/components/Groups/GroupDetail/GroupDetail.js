import React, { Component } from "react";
import styled from 'styled-components';

import GroupInfo from "components/Groups/GroupInfo";

import WaitingDesignContainer from "containers/Groups/WaitingDesignContainer";
import WaitingGroupContainer from "containers/Groups/WaitingGroupContainer";
import EditGroupListContainer from "containers/Groups/EditGroupListContainer";
import EditDesignListContainer from "containers/Groups/EditDesignListContainer";

import Loading from 'components/Commons/Loading';
import ScrollList from "components/Commons/ScrollList";
import OrderOption from "components/Commons/OrderOption";

import osdstyle from "opendesign_style";
import NumberFormat from "modules/NumberFormat";

const Tabs = styled.div`
  display: flex;
  margin-top: 45px;
  margin-bottom: 25px;
  padding-left: 70px;
`
const Tab = styled.div`
  font-family: Noto Sans KR;
  font-weight: 500;
  font-size: 20px;
  margin-right: ${props => props.marginRight}px;
  width: ${props => props.width}px;
  height: 29px;
  line-height: 29px;
  text-align: left;
  color: #707070;
  cursor: pointer;
  opacity: 0.5;
  &.selected { 
    opacity: 1.0;
  }
`;

class GroupDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      this_order: { text: "최신순", keyword: "update" },
      reload: false,
      uid: undefined,
      currentTab: "group",
      manager: false
    }
  }
  initTab = async () => {
    let tab = "group";
    if (this.props.GroupDetail) {
      const { design, group } = this.props.Count;
      if (design > group && design > 0) tab = "design";
      if (group > design && group > 0) tab = "group";
    }
    await this.setState({ currentTab: tab });
  }
  switchTab = async (tab) => {
    await this.setState({ currentTab: tab, reload: true })
    this.getInitData();
  }
  switchMode = () => {
    this.setState({ manager: !this.state.manager })
    this.getInitData();
  }
  async componentDidMount() {
    this.props.GetGroupCountRequest(this.props.id)
      .then(() => { this.initTab() })
      .then(() => this.props.GetGroupDetailRequest(this.props.id))
      .then(() => (this.props.token) && this.props.GetLikeGroupRequest(this.props.id, this.props.token))
    this.getInitData();
  }
  handleReload = () => {
    this.setState({ reload: false });
  }
  getInitData() {
    if (this.state.currentTab === "design") {
      this.getDesignList(0);
    } else {
      this.getGroupList(0);
    }
  }
  getDesignList = async (page) => {
    if (!this.state.uid) {
      return;
    }
    this.props.GetDesignInGroupRequest(this.state.uid, page, this.state.this_order.keyword)
  }
  getGroupList = async (page) => {
    if (!this.state.uid) {
      return;
    }
    this.props.GetGroupInGroupRequest(this.state.uid, page, this.state.this_order.keyword)
  }
  componentWillReceiveProps = async (nextProps) => {
    if (nextProps.GroupDetail.uid !== this.props.GroupDetail.uid) {
      await this.setState({ uid: nextProps.GroupDetail.uid })
      await this.getInitData();
    }
  }
  handleChangeOrderOps = async (order, getfunc) => {
    await this.setState({ this_order: order });
    getfunc(0);
  }

  render() {
    const { status, GroupDetail, DesignList, DesignListAdded, GroupList, GroupListAdded, Count } = this.props;
    const { currentTab, manager, reload, this_order } = this.state

    return (<React.Fragment>

      <GroupInfo handleSwitchMode={this.switchMode} {...this.props} />
      {manager ?
        <div style={{ marginTop: "32px" }}>
          <WaitingGroupContainer id={this.props.id} sort={this.props.sort} />
          <WaitingDesignContainer id={this.props.id} sort={this.props.sort} />
          <EditDesignListContainer id={this.props.id} sort={this.props.sort} />
          <EditGroupListContainer id={this.props.id} sort={this.props.sort} />
        </div>
        :
        <React.Fragment>
          <Tabs>
            <Tab onClick={() => this.switchTab("group")} marginRight={54} className={currentTab === "group" ? "selected" : ""}>그룹({NumberFormat(Count.group)})</Tab>
            <Tab onClick={() => this.switchTab("design")} className={currentTab === "design" ? "selected" : ""}>디자인({NumberFormat(Count.design)})</Tab>
          </Tabs>

          {(GroupDetail && currentTab === "group") ?
            <React.Fragment>
              {status === "INIT" ? <Loading /> :
                <React.Fragment>
                  <OrderOption style={{ marginBottom: "15px" }} order_clicked={(order) => this.handleChangeOrderOps(order, this.getGroupList)} selected={this_order} />
                  <ScrollList {...osdstyle.group_margin} handleReload={this.handleReload} reloader={reload} type="group" dataList={GroupList} dataListAdded={GroupListAdded} getListRequest={this.getGroupList} />
                </React.Fragment>}
            </React.Fragment> : null
          }

          {(GroupDetail && currentTab === "design") ?
            <React.Fragment>
              {status === "INIT" ? <Loading /> :
                <React.Fragment>
                  <OrderOption style={{ marginBottom: "15px" }} order_clicked={(order) => this.handleChangeOrderOps(order, this.getDesignList)} selected={this_order} />
                  <ScrollList {...osdstyle.design_margin} handleReload={this.handleReload} reloader={reload} type="design" dataList={DesignList} dataListAdded={DesignListAdded} getListRequest={this.getDesignList} />
                </React.Fragment>}
            </React.Fragment> : null
          }
        </React.Fragment>}

    </React.Fragment>)
  }
}

export default GroupDetail
