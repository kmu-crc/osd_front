import React, { Component } from "react";
import styled from "styled-components";
import noimg from "source/noimg.png";
import designimg from "source/design.jpg";
import adddesigner from "source/adddesigner.svg";
import addmaker from "source/addmaker.svg";
import confirmMe from "source/confirmMe.svg";

import MyPaymentContainer_mobile from "mobileComponents/MyPaymentContainer_mobile";
import MySalesContainer_mobile from "mobileComponents/MySalesContainer_mobile";
import LikeInDesignerContainer_mobile from "mobileComponents/LikeInDesignerContainer_mobile";
import LikeInMakerContainer_mobile from "mobileComponents/LikeInMakerContainer_mobile";
import LikeInItemContainer_mobile from "mobileComponents/LikeInItemContainer_mobile";
import MyRequestItemContainer_mobile from "mobileComponents/MyRequestItemContainer_mobile";
import UploadItemContainer_mobile from "mobileComponents/UploadItemContainer_mobile";
import MyProjectItemContainer_mobile from "mobileComponents/MyProjectItemContainer_mobile";
import MyUploadDesignReqBoardContainer_mobile from "mobileComponents/MyUploadDesignReqBoardContainer_mobile";
import MyUploadMakerReqBoardContainer_mobile from "mobileComponents/MyUploadMakerReqBoardContainer_mobile";
import ModifyMyDetailContainer from "containers/MyPage/ModifyMyDetailContainer/ModifyMyDetailContainer";
import MyPointStatusContainer from "containers/Point/PointContainer";

import category_icon from "source/category_icon.svg";
import market_style from "market_style";
import { Dropdown } from "semantic-ui-react";
import { SetSession } from "modules/Sessions";

const Wrapper = styled.div`
  width:100%;
  padding:0px 15px 15px 15px;


  .profile{
    width:100%;
    height:195px;
    border-radius:10px;
    border:1px solid #eaeaea;
    box-shadow: 2px 2px 5px #00000029;
    padding:10px;
    .container{width:100%;display:flex;}
      .red{color:#FF3838;}
      .thumbnail{
        min-width:100px;
        min-height:100px;
        border-radius:50%;
        background-image:url(${props => props.face == null ? noimg : props.face});      
        background-position:center;
        background-size:cover;
      }
      .button{
        width:100%;
        height:max-content;
        margin-top:20px;
        .item{
          width:33%;
          display:flex;
          justify-content:center;
          text-align:center;
          align-items:center;
          font-size:${market_style.font.size.small1};
          font-weight:500;
        }
        .marginLeft{margin-left:1%;}
        .borderLine{border-left:1px solid #eaeaea;border-right:1px solid #eaeaea;}
      }
      .info{
        width:100%;
        margin-left:20px;
        display:flex;
        justify-content:space-between;
        align-items:center;
          .summary{
              .nickName{
                font-size:${market_style.font.size.small1};
                font-weight:800;
                color:black;
              }
              .category{
                margin-top:5px;
                color:#707070;
              }
          }
          .logged{
            font-size:${market_style.font.size.small1};
            font-weight:500;
            display:flex;
            align-items:center;
            margin-right:20px;
          }
      }
  }


  .button{
    width:100%;
    height:80px;
    margin-top:10px;
    display:flex;
    .marginLeft{margin-left:2%;}
    .marginRight{margin-right:2%;}
    .piece{
      max-width:126px;
      width:32%;
      height:100%;
      font-size:${market_style.font.size.small1};
      font-weight:500;
      border-radius:10px;
      border:1px solid #eaeaea;
      box-shadow: 2px 2px 3px #00000019;
      display:flex;
      justify-content:center;
      align-items:center;
      text-align:center;
    }
  }

  .navi{
    width:100%;
    border:1px solid #eaeaea;
    box-shadow: 2px 2px 3px #00000019;
    border-radius:10px;
    margin-top:10px;
    padding:10px 30px;
    .menu{
      width:100%;
      height:50px;
      display:flex;
      align-items:center;
      justify-content:center;
      font-size:${market_style.font.size.small1};
      font-weight:500;
      color:black;
    }
    .red{color:#FF3838;}
    .hrline{
      width:100%;
      border:1px solid #E9E9E9;
    }
  }

`


class MyDetail_mobile extends Component {

  constructor(props) {
    super(props);
    this.state = { selectMenu: parseInt(this.props.index,10)}
    this.onClickMenu = this.onClickMenu.bind(this);
    this.onClickCreateDesigner = this.onClickCreateDesigner.bind(this);
    this.onClickCreateMaker = this.onClickCreateMaker.bind(this);
    this.onChangeDropMenu = this.onChangeDropMenu.bind(this);
  }
  onClickCreateDesigner(event) {
    if (this.props.MyDetail.isDesigner === 1) {
      window.location.href = "/modifyDesigner/" + this.props.MyDetail.uid;
    } else {
      window.location.href = "/createDesigner";
    }
  }
  onClickCreateMaker(event) {
    if (this.props.MyDetail.isMaker === 1) {
      window.location.href = "/modifyMaker/" + this.props.MyDetail.uid;
    }
    else {
      window.location.href = "/createMaker";
    }
  }
  onClickMenu(event) {
    const menuNames = [
      "orderlist",
      "interest_Item",
      "interest_Designer",
      "interest_Maker",
      "join_project",
      "request_designer",
      "request_maker",
      "upload_item",
      "request_item",
      "modify_myinfo",
      "my_point_status",
      "sell_item",
    ]
    this.setState({ selectMenu: menuNames.indexOf(event.target.id) });
  }
  async onChangeDropMenu(event,{value}){
    console.log({value}.value);
    const indexNumber = [10,9,0,11,8,7,1,2,3,4,5,6];
    let number = indexNumber[{value}.value];
    this.setState({ selectMenu: number });
  }
  logout = () => {
    SetSession("market", null)
      .then(data => {
        this.props.SignOutRequest();
        this.setState({ sign_modal: false, user_popup: null });
        window.location.reload();
      })
    this.setState({ user_popup: null })
  }

  render() {

    const { MyDetail } = this.props;
    console.log("MyDetail", window.location.pathname.replace("/mypage/",""));
    const { selectMenu } = this.state;
    const path = window.location.pathname.replace("/mypage/","");
    const index = (path=="/myPage"||path=="/mypage")?null:parseInt(path,10);
    console.log(index);
    return (
      <React.Fragment>
        {
        index ==null?
        <Wrapper face={MyDetail.thumbnail == null ? noimg : MyDetail.thumbnail}>
        <div className="profile">
            <div className="container">
            <div className="thumbnail"/>
            <div className="info">
                <div className="summary">
                    <div className="nickName">{MyDetail.nick_name}</div>
                    <div className="category">등록 아이템 {MyDetail.count}&nbsp;|&nbsp;<span className="red">♥</span>{(MyDetail && MyDetail.like) || 0}</div>
                </div>
            </div>
            </div>
            <div className="button">
                <div className="item" onClick={this.onClickCreateDesigner}>디자이너<br/>등록/관리</div>
                <div className="item marginLeft borderLine" onClick={this.onClickCreateMaker}>메이커<br/>등록/관리</div>
                <div className="item">본인인증</div>
            </div>
        </div>
        <div className="navi">
            <div className="menu red" onClick={this.logout}>로그아웃</div>
            <div className="hrline"/>
            <div className="menu" onClick={()=>{window.location.href="/mypage/10"}}>내 포인트 관리</div>
            <div className="hrline"/>
            <div className="menu" onClick={()=>window.location.href="/mypage/9"}>내 정보 수정</div>
            <div className="hrline"/>
            <div className="menu" onClick={()=>window.location.href="/mypage/0"}>구입 아이템</div>
            <div className="hrline"/>
            <div className="menu" onClick={()=>window.location.href="/mypage/11"}>판매 아이템</div>
            <div className="hrline"/>
            <div className="menu" onClick={()=>window.location.href="/mypage/8"}>의뢰 아이템</div>
            <div className="hrline"/>
            <div className="menu" onClick={()=>window.location.href="/mypage/7"}>등록 아이템</div>
            <div className="hrline"/>
            <div className="menu" onClick={()=>window.location.href="/mypage/1"}>관심 아이템</div>
            <div className="hrline"/>
            <div className="menu" onClick={()=>window.location.href="/mypage/2"}>관심 디자이너</div>
            <div className="hrline"/>
            <div className="menu" onClick={()=>window.location.href="/mypage/3"}>관심 메이커</div>
            <div className="hrline"/>
            <div className="menu" onClick={()=>window.location.href="/mypage/4"}>참여 프로젝트</div>
            <div className="hrline"/>
            <div className="menu" onClick={()=>window.location.href="/mypage/5"}>디자인 의뢰</div>
            <div className="hrline"/>
            <div className="menu" onClick={()=>window.location.href="/mypage/6"}>제작 의뢰</div>
        </div>
      </Wrapper>
      :index == 10?
        <React.Fragment>
          <MyPointStatusContainer/>
        </React.Fragment>
      :index == 9?
          <ModifyMyDetailContainer/>
      :index == 0?
          <MyPaymentContainer_mobile  allPage={MyDetail && MyDetail.allCount && MyDetail.allCount.payment_count} id={this.props.userInfo.uid}/>
      :index == 11?
        <MySalesContainer_mobile allPage={MyDetail && MyDetail.allCount && MyDetail.allCount.saleItem_count} id={this.props.userInfo.uid} />
      :index == 8?
        <MyRequestItemContainer_mobile allPage={MyDetail && MyDetail.allCount && MyDetail.allCount.itemRequest_count} id={this.props.userInfo.uid} /> 
      :index == 7?
        <UploadItemContainer_mobile allPage={MyDetail && MyDetail.allCount && MyDetail.allCount.registerItem_count} id={this.props.userInfo.uid} />
      :index == 1?
        <LikeInItemContainer_mobile allPage={MyDetail && MyDetail.allCount && MyDetail.allCount.likeItem_count} id={this.props.userInfo.uid} />
      :index == 2?
        <LikeInDesignerContainer_mobile allPage={MyDetail && MyDetail.allCount && MyDetail.allCount.likeDesigner_count} id={this.props.userInfo.uid} />
      :index == 3?
        <LikeInMakerContainer_mobile allPage={MyDetail && MyDetail.allCount && MyDetail.allCount.likeDesigner_count} id={this.props.userInfo.uid} />
      :index == 4?
        <MyProjectItemContainer_mobile id={this.props.userInfo.uid} />
      :index == 5?
        <MyUploadDesignReqBoardContainer_mobile allPage={MyDetail && MyDetail.allCount && MyDetail.allCount.requestDesigner_count} id={this.props.userInfo.uid} />
      :index == 6?
        <MyUploadMakerReqBoardContainer_mobile allPage={MyDetail && MyDetail.allCount && MyDetail.allCount.requestDesigner_count} id={this.props.userInfo.uid} />
      :
      null
      }
      </React.Fragment >
    );
  }
} export default MyDetail_mobile;