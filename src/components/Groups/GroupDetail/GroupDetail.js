import React, { Component } from "react";
import styled from 'styled-components';

import Design from "components/Designs/Design";
import GroupInfo from "components/Groups/GroupInfo";
import Group from "components/Groups/Group";

import WaitingDesignContainer from "containers/Groups/WaitingDesignContainer";
import WaitingGroupContainer from "containers/Groups/WaitingGroupContainer";
import EditGroupListContainer from "containers/Groups/EditGroupListContainer";
import EditDesignListContainer from "containers/Groups/EditDesignListContainer";

import Loading from 'components/Commons/Loading';
import ScrollList from "components/Commons/ScrollList";
import osdstyle from "opendesign_style";

const Tabs = styled.div`
  display: flex;
  margin-top: 65px;
  margin-bottom: 15px;
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
  state = { reload: false, uid: undefined, currentTab: "design", manager: false }
  switchTab = async (tab) => {
    await this.setState({ currentTab: tab, reload: true })
    this.getInitData()
  }
  switchMode = () => {
    this.setState({ manager: !this.state.manager })
  }
  componentDidMount() {
    this.props.GetGroupDetailRequest(this.props.id)
      .then(() => { this.props.GetLikeGroupRequest(this.props.id, this.props.token) })
    this.getInitData()
  }
  handleReload = () => {
    this.setState({ reload: false })
  }
  getInitData() {
    if (this.state.currentTab === "design") {
      this.getDesignList(0)
    } else {
      this.getGroupList(0)
    }
  }
  getDesignList = async (page) => {
    if (!this.state.uid) {
      return;
    }
    this.props.GetDesignInGroupRequest(this.state.uid, page, "update")
  }
  getGroupList = async (page) => {
    if (!this.state.uid) {
      return;
    }
    this.props.GetGroupInGroupRequest(this.state.uid, page, "update")
  }
  componentWillReceiveProps = async (nextProps) => {
    if (nextProps.GroupDetail.uid !== this.props.GroupDetail.uid) {
      await this.setState({ uid: nextProps.GroupDetail.uid })
      this.getInitData()
    }
  }

  render() {
    const { GroupDetail, userInfo, DesignList, DesignListAdded, GroupList, like, GroupListAdded, Count } = this.props;
    const { currentTab, manager, reload } = this.state
    console.log("reload:", reload)
    return (<>
      <GroupInfo handleSwitchMode={this.switchMode} GroupInfo={GroupDetail} {...this.props} />
      {manager ?
        <div style={{ marginTop: "32px" }}>
          <WaitingGroupContainer id={this.props.id} sort={this.props.sort} />
          <WaitingDesignContainer id={this.props.id} sort={this.props.sort} />
          <EditDesignListContainer id={this.props.id} sort={this.props.sort} />
          <EditGroupListContainer id={this.props.id} sort={this.props.sort} />
        </div>
        :
        <>
          <Tabs>
            <Tab onClick={() => this.switchTab("design")} marginRight={54} width={56} className={currentTab === "design" ? "selected" : ""}>디자인</Tab>
            <Tab onClick={() => this.switchTab("group")} width={37} className={currentTab === "group" ? "selected" : ""}>그룹</Tab>
          </Tabs>
          {GroupDetail && currentTab === "group" && <>
            {this.props.status === "INIT"
              ? <Loading />
              : <ScrollList {...osdstyle.group_margin} handleReload={this.handleReload} reloader={reload} ListComponent={Group} dataList={GroupList} dataListAdded={GroupListAdded} getListRequest={this.getGroupList} />}</>}
          {GroupDetail && currentTab === "design" && <>
            {this.props.status === "INIT"
              ? <Loading />
              : <ScrollList {...osdstyle.design_margin} handleReload={this.handleReload} reloader={reload} ListComponent={Design} dataList={DesignList} dataListAdded={DesignListAdded} getListRequest={this.getDesignList} />}</>}
        </>}

    </>)

  }
}

export default GroupDetail
