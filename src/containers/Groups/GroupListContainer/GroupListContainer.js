import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetGroupListRequest, GetGroupTotalCountRequest } from "redux/modules/group";
import OrderOption from "components/Commons/OrderOption";
import styled from 'styled-components';
import ScrollList from "components/Commons/ScrollList";
import Loading from "components/Commons/Loading";
import osdstyle from "opendesign_style";
import Category from "components/Commons/Category"

const Wrapper = styled.div`
  // margin-left:100px;
  margin-top:90px;
  .category_wrapper{
    padding-left:24px;
    padding-top:19px;
  }
  .content{
    padding-left:24px;
    width:100%;
  }
  .scroll_wrapper{
    margin-top:12px;
    margin-bottom:100px;
  }
  .header_box{
    width:100%;
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-top:32px;
    padding-right:39px;
    .category_title{
      min-width:200px;
      height:32px;
      font-family:Spoqa Han Sans Neo;
      font-weight:Medium;
      font-size:24px;
      color:#1E9B79;
      display:flex;
      align-items:center;
    }
  }
`
class GroupListContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      screenWidth: window.innerWidth,
      reload: false,
      search: null,
      count: 0,
      this_order: this.props.sort=="like"?{text:"인기순",keyword:"like"}:{ text: "최신순", keyword: "update" }
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
    const orderkeyword = order.keyword==null?"update":`${order.keyword}`;
    window.location.href = "/group/"+orderkeyword;
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
        <Wrapper>
        <div className="category_wrapper">
            <Category/>
        </div>
        <div className="content">
            <div className="header_box">
                <div className="category_title">그룹({count})</div>
                <OrderOption order_clicked={this.changeOrderOps} selected={this_order} />
            </div>
            <div className="scroll_wrapper">
                {this.props.status === "INIT"
                ? <Loading />
                : <ScrollList
                  {...osdstyle.group_margin}
                  type="group"
                  reload={reload}
                  handleReload={this.handleReload}
                  dataList={dataList}
                  dataListAdded={dataListAdded}
                  getListRequest={this.getList} />}
              </div>
          </div>
        </Wrapper>
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
{/* <Wrapper>
<WrapperSub>
<JoinGroupContainer>
  <div className="joinGroup" onClick={() => this.createGroup()}>그룹 등록하기</div>
</JoinGroupContainer>
<TextWrapper centerPos={this.state.screenWidth}>
  <div className="title">그룹({count})</div>
</TextWrapper>
<div className="orderBox">
  <OrderOption order_clicked={this.changeOrderOps} selected={this_order} />
</div>
</WrapperSub>
<ScrollListContainer id="list">
  {this.props.status === "INIT"
    ? <Loading />
    : <ScrollList
      {...osdstyle.group_margin}
      type="group"
      reload={reload}
      handleReload={this.handleReload}
      dataList={dataList}
      dataListAdded={dataListAdded}
      getListRequest={this.getList} />}
</ScrollListContainer>
<BlankDiv />
</Wrapper> */}

// const Wrapper = styled.div`

//   position:relative;
//   .orderBox{
//     width:max-content;
//     height:max-content;
//   }
//   // margin-top:100px;
//   margin-top:71px;
//   @media only screen and (max-width : 900px) {
//   margin-top:150px;
//   }
// `
// const TextWrapper = styled.div`
//     width:100%;
//     display:flex;
//     justify-content:center;
//     align-items:center;
//     top: 25px;
//     font-size: 25px;
//     font-family: Noto Sans KR;
//     font-weight: 700;
//     color: red;
//     cursor: pointer;
//     // margin-top:100px;
//     @media only screen and (max-width : 900px) {
//     // margin-top:150px;
//     }
//     .title{
//     width:300px;
//     text-align:center;
//     }
// `;
// const WrapperSub = styled.div`
//     display:flex;
//     padding-left:36px;
//     padding-right:45px;
// `
// const JoinGroupContainer = styled.div`
//     display:flex;
//     align-items:center;
//     .joinGroup{
//         background: #707070 0% 0% no-repeat padding-box;
//         border-radius: 18px;
//         width:max-content;
//         height:29px;
//         text-align: left;
//         font-size: 20px;
//         cursor: pointer;
//         font-family: Noto Sans KR;
//         font-weight:500;
//         color: white;
//         padding:4px 16px;
//     }

// `;
// const ScrollListContainer = styled.div`
//     padding-top: 30px;
//     padding-bottom: 68px;

//     padding-left:20px;
// `;

// const BlankDiv = styled.div`
//     padding-top: 50px;
// `;
