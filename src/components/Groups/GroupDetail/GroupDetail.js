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
  max-width:1466px;
  width:100%;
  display: flex;
  justify-content:space-between;
  align-items:center;
  margin-top: 17px;
  margin-bottom: 30px;
  .menu{
    display:flex;
  }
`
const Tab = styled.div`
  font-family: Spoqa Han Sans Neo;
  font-weight: 500;
  font-size: 28px;
  width: ${props => props.width}px;
  height: 29px;
  line-height: 29px;
  text-align: left;
  color: black;
  cursor: pointer;
  padding-left:20px;
  padding-right:10px;
  margin-right:10px;
  &.selected { 
    color:#1E9B79;
  }
  @media only screen and (min-width: ${osdstyle.resolutions.SmallMinWidth}px) 
  and (max-width: ${osdstyle.resolutions.SmallMaxWidth}px) {
    font-size: 15px;
    width: max-content;
    margin: 0px;
    padding: 13px;
  }
`;
const BlankDiv = styled.div`
  padding-top: 50px;
`;
const OrderBox = styled.div`
  max-width:1466px;
  width:100%;
  border:1px solid black;
`
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
      if (group == 0) tab = "design";
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
      {this.state.loading ?<Loading />:null}
      <GroupInfo handleSwitchMode={this.switchMode} {...this.props} loading={(status)=>this.setState({loading:status})}/>
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
            <div className="menu">
            <Tab onClick={() => this.switchTab("group")}  className={currentTab === "group" ? "selected" : ""}>그룹({NumberFormat(Count.group)})</Tab>
            <Tab onClick={() => this.switchTab("design")} className={currentTab === "design" ? "selected" : ""}>디자인({NumberFormat(Count.design)})</Tab>
            </div>
            <OrderOption style={{ width:"240px",height:"41px" }} order_clicked={(order) => this.handleChangeOrderOps(order, this.getGroupList)} selected={this_order} />
          </Tabs>

          {(GroupDetail && currentTab === "group") ?
            <React.Fragment>
              {status === "INIT" ? <Loading /> :
                <React.Fragment>
                  {/* <OrderBox>
                    <OrderOption style={{ marginBottom: "15px" }} order_clicked={(order) => this.handleChangeOrderOps(order, this.getGroupList)} selected={this_order} />
                  </OrderBox> */}
                  <ScrollList {...osdstyle.group_margin} handleReload={this.handleReload} reloader={reload} type="group" dataList={GroupList} dataListAdded={GroupListAdded} getListRequest={this.getGroupList} />
                </React.Fragment>}
            </React.Fragment> : null
          }

          {(GroupDetail && currentTab === "design") ?
            <React.Fragment>
              {status === "INIT" ? <Loading /> :
                <React.Fragment>
                  {/* <OrderBox>
                  <OrderOption style={{ marginBottom: "15px" }} order_clicked={(order) => this.handleChangeOrderOps(order, this.getDesignList)} selected={this_order} />
                  </OrderBox> */}
                  <ScrollList {...osdstyle.design_margin} handleReload={this.handleReload} reloader={reload} type="design" dataList={DesignList} dataListAdded={DesignListAdded} getListRequest={this.getDesignList} />
                </React.Fragment>}
            </React.Fragment> : null
          }
        </React.Fragment>}
      <BlankDiv />
    </React.Fragment>)
  }
}

export default GroupDetail
