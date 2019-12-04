import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetGroupListRequest, GetGroupTotalCountRequest } from "redux/modules/group";
import OrderOption from "components/Commons/OrderOption";
import styled from 'styled-components';
import ScrollList from "components/Commons/ScrollList";
import Loading from "components/Commons/Loading";
import osdstyle from "opendesign_style";

const TextWrapper = styled.div`
      top: 25px;
      font-size: 25px;
      font-family: Noto Sans KR;
      font-weight: 700;
      color: red;
      cursor: pointer;
      margin-top:100px;
      @media only screen and (max-width : 900px) {
        margin-top:150px;
        
      }
    .title{
      width:300px;
      text-align:center;
      position:absolute;
      @media only screen {
        right:${props=>(props.centerPos-300)/2}px;
      }
    }
`;
const JoinGroupContainer = styled.div`
    // border: 1px solid red;
    width: max-content;
    margin-left: auto;
    margin-right: 45px;
`;
const JoinGroup = styled.div`
    position: relative;
    width: 115px;
    text-align: left;
    font-size: 20px;
    cursor: pointer;
    font-family: Noto Sans KR;
    font-weight: 500;
    color: red;
    line-height: 29px;
    border-bottom: 1.5px solid red;
`;
const ScrollListContainer = styled.div`
    position: relative;
    padding-top: 100px;
`;

class GroupListContainer extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      screenWidth:window.innerWidth,
      reload: false,
      search: null,
      count: 0,
      this_order: { text: "최신순", keyword: "update" }
    }
    this.handleResize = this.handleResize.bind(this);
  }
  
  componentDidMount(){
    this.props.GetGroupTotalCountRequest()
      .then(() => { this.setState({ count: this.props.Count }) })
      .then(() => { this.props.GetGroupListRequest(0, null, null) });
    window.addEventListener("resize", this.handleResize, false);

    }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize, false);
  };
  handleResize(){
    console.log(window.innerWidth);
    this.setState({screenWidth:window.innerWidth})
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
        <div style={{width:"100%",height:"1px",position:"relative"}}>
        <OrderOption order_clicked={this.changeOrderOps} selected={this_order} />
        </div>
        <TextWrapper centerPos={this.state.screenWidth}><div className="title">그룹({count})</div></TextWrapper>

        <JoinGroupContainer><JoinGroup onClick={() => this.createGroup()}>그룹 등록하기</JoinGroup></JoinGroupContainer>

        <ScrollListContainer id="list">
          {this.props.status === "INIT" ?
            <Loading /> :
            <ScrollList {...osdstyle.group_margin} type="group" reload={reload} handleReload={this.handleReload}
              dataList={dataList} dataListAdded={dataListAdded} getListRequest={this.getList} />}
        </ScrollListContainer>
s      </React.Fragment>
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
