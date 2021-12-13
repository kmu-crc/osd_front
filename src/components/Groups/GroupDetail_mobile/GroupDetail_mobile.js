import React, { Component } from "react";
import styled from 'styled-components';

import GroupInfo_mobile from "components/Groups/GroupInfo_mobile";

import WaitingDesignContainer from "containers/Groups/WaitingDesignContainer";
import WaitingGroupContainer from "containers/Groups/WaitingGroupContainer";
import EditGroupListContainer from "containers/Groups/EditGroupListContainer";
import EditDesignListContainer from "containers/Groups/EditDesignListContainer";

import Loading from 'components/Commons/Loading';
import ScrollList_mobile from "components/Commons/ScrollList_mobile"
import OrderOption_mobile from "components/Commons/OrderOption_mobile";

import opendesign_mobile_style from 'opendesign_mobile_style';
import NumberFormat from "modules/NumberFormat";

import Category from "components/Commons/Category";

const Wrapper = styled.div`
  width:100%;
  display:flex;
  justify-content:center;

  .content{
    width:100%;
  }
`
const Info = styled.div`
  width:100%;
  display:flex;
  justify-content:center;
  .order{
    display:flex;
    justify-content:center;
    margin-top:7px;
  }
  .content{
    width:360px;
  }
  .list{margin-top:5px;}
`
const MenuBox = styled.div`
    width:100%;
    height:35px;
    padding:6px 17px;
    display:flex;
    justify-content:space-around;
    align-items:center;
    .tab{
        font-family:Spoqa Han Sans;
        font-size:15px;
        color:#7A7A7A;
    }
    .selected{color:#1E9B79;}
`
const HrLine = styled.div`
    width:100%;
    display:flex;
    justify-content:center;
    .line{
        border-top:1px solid #7a7a7a;
        width:50%;
    }
`
class GroupDetail_mobile extends Component {
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

      {/* {this.state.loading ? <Loading /> : null} */}
      <Wrapper>
        <div className="content">
          <GroupInfo_mobile handleSwitchMode={this.switchMode} {...this.props} loading={(status) => this.setState({ loading: status })} />
        </div>
      </Wrapper>
      <Info>
        <div className="content">
       {managerMode ?
         <div style={{ marginTop: "32px" }}>
           <WaitingGroupContainer id={this.props.id} sort={this.props.sort} />
           <WaitingDesignContainer id={this.props.id} sort={this.props.sort} />
           <EditDesignListContainer id={this.props.id} sort={this.props.sort} />
           <EditGroupListContainer id={this.props.id} sort={this.props.sort} />
         </div>
         :
         <React.Fragment>
            <MenuBox>
              <a onClick={() => this.switchTab("group")}> <div className={`tab ${currentTab === "group" ? "selected" : ""}`}>그룹({NumberFormat(Count.group)})</div></a>
              <a onClick={() => this.switchTab("design")}><div className={`tab ${currentTab === "design" ? "selected" : ""}`}>디자인({NumberFormat(Count.design)})</div></a>
            </MenuBox>
            <HrLine><div className="line"/></HrLine>
            <div className="order">
            <OrderOption_mobile type="group" style={{ marginBottom: "15px" }} order_clicked={(order) => this.handleChangeOrderOps(order, currentTab === "group" ? this.getGroupList : this.getDesignList)} selected={this_order} />
            </div>
            <div className="list">
            {(GroupDetail && currentTab === "group")
              ? status === "INIT"
                ? <Loading />
                : <ScrollList_mobile {...opendesign_mobile_style.group_margin}
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
                : <ScrollList_mobile {...opendesign_mobile_style.design_margin}
                  handleReload={this.handleReload}
                  reloader={reload}
                  type="design"
                  dataList={DesignList}
                  dataListAdded={DesignListAdded}
                  getListRequest={this.getDesignList} />
              : null}
             </div>
         </React.Fragment>
       }
       </div>
      </Info>
    </React.Fragment>);
  }
}

export default GroupDetail_mobile;


// <Wrapper>

// <GroupInfo handleSwitchMode={this.switchMode} {...this.props} loading={(status) => this.setState({ loading: status })} />

// <BodyWrapper>
//   {managerMode ?
//     <div style={{ marginTop: "32px" }}>
//       <WaitingGroupContainer id={this.props.id} sort={this.props.sort} />
//       <WaitingDesignContainer id={this.props.id} sort={this.props.sort} />
//       <EditDesignListContainer id={this.props.id} sort={this.props.sort} />
//       <EditGroupListContainer id={this.props.id} sort={this.props.sort} />
//     </div>
//     :
//     <React.Fragment>
//       <div className="menu-container">
//         <TabMenu>
//           <a onClick={() => this.switchTab("group")}> <div className={`tab ${currentTab === "group" ? "selected" : ""}`}>그룹({NumberFormat(Count.group)})</div></a>
//           <a onClick={() => this.switchTab("design")}><div className={`tab ${currentTab === "design" ? "selected" : ""}`}>디자인({NumberFormat(Count.design)})</div></a>
//         </TabMenu>
//         <OrderOption style={{ marginBottom: "15px" }} order_clicked={(order) => this.handleChangeOrderOps(order, currentTab === "group" ? this.getGroupList : this.getDesignList)} selected={this_order} />
//       </div>
//       <ScrollWrapper>
//         {(GroupDetail && currentTab === "group")
//           ? status === "INIT"
//             ? <Loading />
//             : <ScrollList {...osdstyle.group_margin}
//               handleReload={this.handleReload}
//               reloader={reload}
//               type="group"
//               dataList={GroupList}
//               dataListAdded={GroupListAdded}
//               getListRequest={this.getGroupList} />
//           : null}

//         {(GroupDetail && currentTab === "design")
//           ? status === "INIT"
//             ? <Loading />
//             : <ScrollList {...osdstyle.design_margin}
//               handleReload={this.handleReload}
//               reloader={reload}
//               type="design"
//               dataList={DesignList}
//               dataListAdded={DesignListAdded}
//               getListRequest={this.getDesignList} />
//           : null}

//       </ScrollWrapper>
//     </React.Fragment>}

// </BodyWrapper>
// </Wrapper>


// const Wrapper = styled.div`
//   // margin-top: 90px;
//   // margin-left: 100px;
//   // max-width: 1740px;
//   min-width: 1000px;

//   flex-direction: column;
//   display:flex;

//   .content{
//     // width:100%;
//     // padding:27px 41px 38px 27px;
//   }
//   .scroll_wrapper{
//     overflow-y:scroll;
//   }
//   .orderBox{
//     width:100%;
//     padding-right:85px;
//   }
// `;
// const BodyWrapper = styled.div`
//   padding-top: 28px;
//   padding-left: 38px;
//   padding-right: 38px;
//   .menu-container {
//     max-width: 1737px;
//     min-width: 1000px;
//     display: flex;
//     flex-direction: row;
//     justify-content: space-between;
//   }
//   max-width:1740px;
//   @media only screen and (max-width: 1000px) {
//     width: 100vw;
//   }
//   @media only screen and (min-width: 1920px) {
//       width:100vw;
//   }
// `;
// const TabMenu = styled.div`
//     display: flex;
//     justify-content: space-start;

//     .tab {
//         text-align: center;
//         font-weight: medium;
//         font-size: 20px;
//         line-height: 40px;
//         font-family: Spoqa Han Sans Neo;
//         letter-spacing: 0px;
//         cursor: pointer;
//         color: #000000;
        
//         margin-left: 43px;
//         :first-child{
//             margin-left: 21px;
//         }
//     }
//     .selected { 
//         color: #1E9B79; 
//     }
// `;
// const ScrollWrapper = styled.div`
//   margin-top: 15px;
//   width: 100%;
// `;