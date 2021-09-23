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

import Category from "components/Commons/Category";

const Wrapper = styled.div`
  // margin-top: 90px;
  // margin-left: 100px;
  // max-width: 1740px;
  min-width: 1000px;

  flex-direction: column;
  display:flex;

  .content{
    // width:100%;
    // padding:27px 41px 38px 27px;
  }
  .scroll_wrapper{
    overflow-y:scroll;
  }
  .orderBox{
    width:100%;
    padding-right:85px;
  }
`;
const BodyWrapper = styled.div`
  padding-top: 28px;
  padding-left: 38px;
  padding-right: 38px;
  .menu-container {
    max-width: 1737px;
    min-width: 1000px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;
const TabMenu = styled.div`
    display: flex;
    justify-content: space-start;

    .tab {
        text-align: center;
        font-weight: medium;
        font-size: 20px;
        line-height: 40px;
        font-family: Spoqa Han Sans Neo;
        letter-spacing: 0px;
        cursor: pointer;
        color: #000000;
        
        margin-left: 43px;
        :first-child{
            margin-left: 21px;
        }
    }
    .selected { 
        color: #1E9B79; 
    }
`;
// const Tabs = styled.div`
//   max-width: 1737px;
//   min-width: 1000px;
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;

//   .menu{
//     display:flex;
//   }
// `;
// const Tab = styled.div`
//   font-family: Spoqa Han Sans Neo;
//   font-weight: 500;
//   font-size: 28px;
//   width: ${props => props.width}px;
//   height: 29px;
//   line-height: 29px;
//   text-align: left;
//   color: black;
//   cursor: pointer;
//   padding-left:20px;
//   padding-right:10px;
//   margin-right:10px;
//   &.selected { 
//     color:;
//   }
//   @media only screen and (min-width: ${osdstyle.resolutions.SmallMinWidth}px) 
//   and (max-width: ${osdstyle.resolutions.SmallMaxWidth}px) {
//     font-size: 15px;
//     width: max-content;
//     margin: 0px;
//     padding: 13px;
//   }
// `;
// const BlankDiv = styled.div`
//   padding-top: 50px;
// `;
// const OrderBox = styled.div`
//   max-width:1466px;
//   width:100%;
//   border:1px solid black;
// `;
const ScrollWrapper = styled.div`
  margin-top: 15px;
  width: 100%;
`;
class GroupDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      this_order: { text: "최신순", keyword: "update" },
      reload: false,
      uid: undefined,
      currentTab: "group",
      managerMode: false
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
    this.setState({ managerMode: !this.state.managerMode })
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
    const { currentTab, managerMode, reload, this_order } = this.state
    return (<React.Fragment>

      {this.state.loading ? <Loading /> : null}

      <Wrapper>

        <GroupInfo handleSwitchMode={this.switchMode} {...this.props} loading={(status) => this.setState({ loading: status })} />

        {/* <GroupDetail {...this.props} getCountGroup={GetTotalCountGroupInGroupRequest} /> */}

        <BodyWrapper>
          {managerMode ?
            <div style={{ marginTop: "32px" }}>
              <WaitingGroupContainer id={this.props.id} sort={this.props.sort} />
              <WaitingDesignContainer id={this.props.id} sort={this.props.sort} />
              <EditDesignListContainer id={this.props.id} sort={this.props.sort} />
              <EditGroupListContainer id={this.props.id} sort={this.props.sort} />
            </div>
            :
            <React.Fragment>
              <div className="menu-container">
                <TabMenu>
                  <a onClick={() => this.switchTab("group")}> <div className={`tab ${currentTab === "group" ? "selected" : ""}`}>그룹({NumberFormat(Count.group)})</div></a>
                  <a onClick={() => this.switchTab("design")}><div className={`tab ${currentTab === "design" ? "selected" : ""}`}>디자인({NumberFormat(Count.design)})</div></a>
                </TabMenu>
                <OrderOption style={{ marginBottom: "15px" }} order_clicked={(order) => this.handleChangeOrderOps(order, currentTab === "group" ? this.getGroupList : this.getDesignList)} selected={this_order} />
              </div>
              <ScrollWrapper>
                {(GroupDetail && currentTab === "group")
                  ? status === "INIT"
                    ? <Loading />
                    : <ScrollList {...osdstyle.group_margin}
                      handleReload={this.handleReload}
                      reloader={reload}
                      type="group"
                      dataList={GroupList}
                      dataListAdded={GroupListAdded}
                      getListRequest={this.getGroupList} />
                  : null}

                {(GroupDetail && currentTab === "design")
                  ? status === "INIT"
                    ? <Loading />
                    : <ScrollList {...osdstyle.design_margin}
                      handleReload={this.handleReload}
                      reloader={reload}
                      type="design"
                      dataList={DesignList}
                      dataListAdded={DesignListAdded}
                      getListRequest={this.getDesignList} />
                  : null}

              </ScrollWrapper>
            </React.Fragment>}

        </BodyWrapper>
        {/*<div className="content"><BlankDiv/></div>*/}

      </Wrapper>
    </React.Fragment>);
  }
}

export default GroupDetail;
