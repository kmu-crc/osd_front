import React, { Component } from "react";
import styled from "styled-components";
import noimg from "source/noimg.png";
import designimg from "source/design.jpg";
import adddesigner from "source/adddesigner.svg";
import addmaker from "source/addmaker.svg";
import confirmMe from "source/confirmMe.svg";

import LikeInDesignerContainer from "containers/Designer/LikeInDesignerContainer/LikeInDesignerContainer";
import LikeInMakerContainer from "containers/Maker/LikeInMakerContainer/LikeInMakerContainer";
import LikeInItemContainer from "containers/Products/LikeInItemContainer/LikeInItemContainer";
import MyPaymentContainer from "containers/Payment/MyPaymentContainer";
import MySalesContainer from "containers/Payment/MySalesContainer";
import MyRequestItemContainer from "containers/Payment/MyRequestItemContainer";
import UploadItemContainer from "containers/Items/UploadItemContainer/UploadItemContainer";
import MyProjectItemContainer from "containers/Items/MyProjectItemContainer/MyProjectItemContainer";
import MyUploadDesignReqBoardContainer from "components/Request/MyUploadDesignReqBoardContainer/MyUploadDesignReqBoardContainer";
import MyUploadMakerReqBoardContainer from "components/Request/MyUploadMakerReqBoardContainer/MyUploadMakerReqBoardContainer";
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
    height:120px;
    border-radius:10px;
    border:1px solid #eaeaea;
    box-shadow: 2px 2px 5px #00000029;
    display:flex;

    align-items:center;
    padding:10px;
      .red{color:red;}
      .thumbnail{
        min-width:100px;
        min-height:100px;
        border-radius:50%;
        background-image:url(${props => props.face == null ? noimg : props.face});      
        background-position:center;
        background-size:cover;
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
    .hrline{
      width:100%;
      border:1px solid #E9E9E9;
    }
  }

`

class MyDetail_mobile extends Component {

  constructor(props) {
    super(props);
    this.state = { selectMenu: parseInt(this.props.index,10) }
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
    console.log("MyDetail", this.props);
    const { selectMenu } = this.state;

    return (
      <React.Fragment>
        <Wrapper face={MyDetail.thumbnail == null ? noimg : MyDetail.thumbnail}>
          <div className="profile">
              <div className="thumbnail"/>
              <div className="info">
                  <div className="summary">
                      <div className="nickName">{MyDetail.nick_name}</div>
                      <div className="category">등록 아이템 {MyDetail.count}&nbsp;|&nbsp;<span className="red">♥</span>{(MyDetail && MyDetail.like) || 0}</div>
                  </div>
                  <div className="logged" onClick={this.logout}>로그아웃</div>
              </div>
          </div>
          <div className="button">
              <div className="piece" onClick={this.onClickCreateDesigner}>디자이너<br/>등록/관리</div>
              <div className="piece marginLeft marginRight" onClick={this.onClickCreateMaker}>메이커<br/>등록/관리</div>
              <div className="piece">본인인증</div>
          </div>
          <div className="navi">
              <div className="menu">내 포인트 관리</div>
              <div className="hrline"/>
              <div className="menu">내 정보 수정</div>
              <div className="hrline"/>
              <div className="menu">구입 아이템</div>
              <div className="hrline"/>
              <div className="menu">판매 아이템</div>
              <div className="hrline"/>
              <div className="menu">의뢰 아이템</div>
              <div className="hrline"/>
              <div className="menu">등록 아이템</div>
              <div className="hrline"/>
              <div className="menu">관심 아이템</div>
              <div className="hrline"/>
              <div className="menu">관심 디자이너</div>
              <div className="hrline"/>
              <div className="menu">관심 메이커</div>
              <div className="hrline"/>
              <div className="menu">참여 프로젝트</div>
              <div className="hrline"/>
              <div className="menu">디자인 의뢰</div>
              <div className="hrline"/>
              <div className="menu">메이커 의뢰</div>
          </div>
        </Wrapper>
      </React.Fragment >
    );
  }
} export default MyDetail_mobile;