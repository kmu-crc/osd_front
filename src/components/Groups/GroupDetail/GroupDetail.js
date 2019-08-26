import React, { Component } from "react"
import styled from 'styled-components'
import GroupInfo from "components/Groups/GroupInfo"
import Design from "components/Designs/Design"
import Group from "components/Groups/Group"
// import { GeneralScrollList } from "components/Commons/ScrollList"
import Loading from 'components/Commons/Loading'
import ScrollList from "components/Commons/ScrollList"

const Tabs = styled.div`
  display: flex;
`
const Tab = styled.div`
  &.selected { 
    color:red; 
  }
`
class GroupDetail extends Component {
  state = { page: 0, uid: undefined, currentTab: "design" }
  switchTab = async(tab) => { 
    await this.setState({ currentTab: tab, page: 0 })
    this.getInitData()
   }

  componentDidMount() {
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
  getGroupList = async (isInit)=>{
    if(!this.state.uid){
      return;
    }
    await this.setState({ page: isInit ? 0 : this.state.page + 1 })
    this.props.GetGroupInGroupRequest(this.state.uid, this.state.page, "update")
  }
  componentWillReceiveProps =async(nextProps)=> {
    if (nextProps.GroupDetail.uid !== this.props.GroupDetail.uid) {
      await this.setState({ uid: nextProps.GroupDetail.uid })
      this.getInitData()
    }
  }

  render() {
    const { GroupDetail, userInfo, DesignList, DesignListAdded, GroupList, GroupListAdded } = this.props
    const DesignProps = { cols: 5, width: "330px", height: "330px", marginRight: "63px", marginBottom: "80px", marginRightLast: "8px", marginBottomLast: "26px"}
    const GroupProps = { cols: 3, width: "902", height: "230px", marginRight: "94px", marginBottom: "60px", marginRightLast: "11px", marginBottomLast: "179px"}
    const { currentTab } = this.state

    return (
      <>
        <GroupInfo GroupInfo={GroupDetail} userInfo={userInfo} />
        <Tabs >
          <Tab onClick={() => this.switchTab("design")} className={currentTab === "design" ? "selected" : ""}>디자인</Tab>
          <Tab onClick={() => this.switchTab("group")} className={currentTab === "group" ? "selected" : ""}>그룹</Tab>
        </Tabs>
         {GroupDetail && currentTab === "group" &&
          <>
            {this.props.status === "INIT" ?
              <Loading /> :
              <ScrollList cols={GroupProps.cols}
                width={GroupProps.width} height={GroupProps.height} marginRight={GroupProps.marginRight} marginBottom={GroupProps.marginBottom} marginRightLast={GroupProps.marginRightLast} marginBottomLast={GroupProps.marginBottomLast}
                page={this.state.page} ListComponent={Group} dataList={GroupList} dataListAdded={GroupListAdded} getListRequest={this.getGroupList} />}
          </>
        }       {GroupDetail && currentTab === "design" &&
          <>
            {this.props.status === "INIT" ?
              <Loading /> :
              <ScrollList cols={DesignProps.cols}
                width={DesignProps.width} height={DesignProps.height} marginRight={DesignProps.marginRight} marginBottom={DesignProps.marginBottom} marginRightLast={DesignProps.marginRightLast} marginBottomLast={DesignProps.marginBottomLast}
                page={this.state.page} ListComponent={Design} dataList={DesignList} dataListAdded={DesignListAdded} getListRequest={this.getDesignList} />}
          </>
        }
        {/* <GeneralScrollList {...DesignProps} page={this.state.page} getListRequest={this.getDesignList} /}*/}
      </>
    )
  }
}

export default GroupDetail