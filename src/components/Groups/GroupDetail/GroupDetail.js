import React, { Component } from "react";
import styled from 'styled-components';

import Design from "components/Designs/Design";
import GroupInfo from "components/Groups/GroupInfo";
import Group from "components/Groups/Group";
import GroupManager from "components/Groups/GroupManager";

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
  state = { page: 0, uid: undefined, currentTab: "design", manager: false }
  switchTab = async (tab) => {
    await this.setState({ currentTab: tab, page: 0 })
    this.getInitData()
  }
  switchMode = () => {
    this.setState({ manager: !this.state.manager })
    // alert(this.state.manager ? "관리모드" : "관리모드 해제")
  }
  componentDidMount() {
    this.props.GetGroupDetailRequest(this.props.id);
    this.getInitData()
  }

  getInitData() {
    if (this.state.currentTab === "design") {
      this.getDesignList(true)
    } else {
      this.getGroupList(true)
    }
  }
  getDesignList = async (isInit) => {
    if (!this.state.uid) {
      return;
    }
    await this.setState({ page: isInit ? 0 : this.state.page + 1 })
    this.props.GetDesignInGroupRequest(this.state.uid, this.state.page, "update")
  }
  getGroupList = async (isInit) => {
    if (!this.state.uid) {
      return;
    }
    await this.setState({ page: isInit ? 0 : this.state.page + 1 })
    this.props.GetGroupInGroupRequest(this.state.uid, this.state.page, "update")
  }
  componentWillReceiveProps = async (nextProps) => {
    if (nextProps.GroupDetail.uid !== this.props.GroupDetail.uid) {
      await this.setState({ uid: nextProps.GroupDetail.uid })
      this.getInitData()
    }
  }

  render() {
    const { GroupDetail, userInfo, DesignList, DesignListAdded, GroupList, GroupListAdded, Count } = this.props;
    const DesignProps = { ...osdstyle.design_margin }
    const GroupProps = { ...osdstyle.group_margin }
    const { currentTab, manager } = this.state
    return (<>
      <GroupInfo handleSwitchMode={this.switchMode} GroupInfo={GroupDetail} userInfo={userInfo} count={Count} />
      {manager ?
        <>
          <div style={{ marginTop: "32px" }}>
            <GroupManager id={this.props.id} sort={this.props.update} />
          </div>
        </> :
        <>
          <Tabs>
            <Tab onClick={() => this.switchTab("design")} marginRight={54} width={56} className={currentTab === "design" ? "selected" : ""}>디자인</Tab>
            <Tab onClick={() => this.switchTab("group")} width={37} className={currentTab === "group" ? "selected" : ""}>그룹</Tab>
          </Tabs>
          {GroupDetail && currentTab === "group" && <>
            {this.props.status === "INIT"
              ? <Loading />
              : <ScrollList cols={GroupProps.cols} {...osdstyle.group_margin} page={this.state.page} ListComponent={Group} dataList={GroupList} dataListAdded={GroupListAdded} getListRequest={this.getGroupList} />}</>}
          {GroupDetail && currentTab === "design" && <>
            {this.props.status === "INIT"
              ? <Loading />
              : <ScrollList cols={DesignProps.cols} {...osdstyle.design_margin} page={this.state.page} ListComponent={Design} dataList={DesignList} dataListAdded={DesignListAdded} getListRequest={this.getDesignList} />}</>}
        </>}

    </>)

  }
}

export default GroupDetail
/* <GeneralScrollList {...DesignProps} page={this.state.page} getListRequest={this.getDesignList} /}*/
