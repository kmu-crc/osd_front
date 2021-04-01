import React, { Component } from 'react';
import styled from 'styled-components';
import Star from "components/Commons/Star";
import noimg from "source/noimg.png";
import Cross from "components/Commons/Cross"

import who from "source/thumbnail.png";
import CardSourceDetailContainer from "containers/Items/CardSourceDetailContainer";
import ItemStepContainer from "containers/Items/ItemStepContainer";
import ItemQuestionContainer from "containers/Items/ItemQuestionContainer";
import ItemReviewContainer from "containers/Items/ItemReviewContainer";
import PointFormat from "modules/PointFormat";
// import ReviewDetailModal from "components/Commons/ReviewDetailModal";
// import WriteReviewModal from "components/Commons/WriteReviewModal"

import ConnectedMemberContainer from "containers/Items/ConnectedMemberContainer";
import { Rating } from 'semantic-ui-react'
// import {confirmAlert} from "react-confirm-alert";
// import {options} from "components/Commons/InputItem/AlertConfirm"
// import NumberFormat from "modules/NumberFormat";
import { Link } from "react-router-dom";
import { alert } from "components/Commons/Alert/Alert";
import { confirm } from "components/Commons/Confirm/Confirm";
import market_style from "market_style";

const Wrapper = styled.div`
  width:100%;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  .profileBox{
    width:940px;
    display:flex;
    box-shadow: 3px 3px 5px #0000001A;
    border:1px solid #eaeaea;
    border-radius:20px;
    padding:30px 40px;
  }
  .flex-align-column {
    flex-direction: column;
  };
`;
const ItemImages = styled.div`
  max-width: 354px;
  max-height: 354px;
  min-width: 354px;
  min-height: 354px;
  .main-image {
    overflow-x: auto;
    width: 100%;
    height: 100%; 
    background-image: url(${prop => prop.main});
    background-size: contain;
    background-position: center center;
    background-repeat:no-repeat;
  }
  .sub-images {
    margin-top: 30px;
    .sub {
      width: 102px;
      height: 86px;
      background-image: url(${prop => prop.main});
      background-size: cover;
      background-position: center center;
    }
    .nine-teen { margin-right: 19px; }
    .eight-teen { margin-right: 18px; }
  }
`;
const ItemInfo = styled.div`
  position: relative;
  margin-left: 45px;
  font-family: Noto Sans KR;
  background: #FFFFFF;
  width:100%;
  .flex{display:flex;}
  .spaceBetween{justify-content:space-between;align-items:center;}
  .title {
    font-size:${market_style.font.size.normal1};
    text-align: left;
    color: #000000;
    font-weight:500;
  }
  .expert {
    position:relative;
    display:flex;
    align-items:center;
    .who {
      width: 23px;
      height: 23px;
      border-radius: 50%;
      background-size: cover;
      background-position: center center;
      background-image: url(${props => props.face});
      margin-right: 5px;
    }
    .nick{
      cursor:pointer;
      font-size:${market_style.font.size.mini2};
      font-weight: 300;
      line-height: 29px;
      color: #060000;
    }
   .text {
     background-color: #FAFAFA;
    margin-top: 29px;
    height: 200px;
    width: 100%;
    padding: 10px;
    overflow: auto;
    text-align: left;
    font-weight: 300;
    font-size:${market_style.font.size.small1};
    line-height: 27px;
    letter-spacing: 0;
    color: #000000;
    opacity: 1;
    }
  }
  .price-and-score {
    font-weight: 500;
    font-size:${market_style.font.size.small1};
    display:flex;
    justify-content:flex-end;
    align-items:center;
    .price{
      margin-right:10px;
    }
  }
  .options {
    margin-top: 50px;
    .text {
      width: max-content;
      text-align: left;
      font-weight: 500;
      font-size:${market_style.font.size.normal3};
      line-height: 29px;
      letter-spacing: 0;
      color: #000000;
      opacity: 1;
    }
    .combo-wrapper {
      margin-bottom: 28px;
      .box {
        border-radius: 21px;
        background-color: #E9E9E9;
        height: 43px;
        margin-left: 41px;
      }
      .WIDTH360 { width: 360px; }
      .WIDTH178 { width: 178px; }
    }
  }
  .bottom {
    width:100%;
    display:flex;
    justify-content:flex-end;
    margin-top:30px;
  };
  .buttons {
    cursor: pointer;
    .button { 
      width: 150px;
      height: 30px;
      display:flex;
      justify-content:center;
      align-items:center;
      margin-left:20px;
      .text{
        font-size:${market_style.font.size.small1};
        font-weight: 500;
      }
      &.first { 
        color: #FFFFFF; 
        background: #FF0000; 
      }
      &.second {
        border: 1px solid red;
        color: #707070;
        background: #FFFFFF; 
        &.active{
          color: #FFFFFF;
          background: #FF0000;
          border: 1px solid #FFFFFF;
        }
      }
    }
  }
`;
const Introduction = styled.div`
  position: relative;
  height: 237px;
  opacity: 1;
  font-family: Noto Sans KR;
  margin-top:15px;
  .wrapItem{
    width:100%;
    height:100%;
    overflow:hidden;
    .flex{
      display:flex;
    }
    .title {
      font-size:${market_style.font.size.small1};
      font-weight: 500;
      text-align: left;
      margin-top:15px;
    }
    .text {
      width: 100%;
      margin-top: 5px;
      margin-bottom:29px;
      font-size:${market_style.font.size.small1};
      font-weight: 300;
      line-weight: 27px;
      text-align: left;
      overflow: hidden;
    }
    .gradient_box{
      display:${props => props.isLong ? "none" : "block"};
      position:absolute;
      left:0px;
      top:0px;
      width:100%;
      height:100%;
      display:flex;
      justify-content:center;
      align-items:flex-end;
      padding:10px;
      background:linear-gradient(180deg, rgba(255, 255, 255, 0), rgba(255, 255, 255,01.0));
    }
  }
  
  &:hover{
    .gradient_box{
      display:none;
    }
    .wrapItem {
      overflow: auto;
      overflow-y:overlay;
    }
  }
`;
const TagPiece = styled.div`
    width: max-content;
    min-width: 30px;
    background-color: #EFEFEF;
    margin-right: 5px;
    margin-bottom: 5px;
    color: #707070;
    padding: 5px;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 15px;
    display: flex;
    justify-content: space-between;
    .close {
        margin-left: 10px;
        width: max-content;
        height: max-content;
        padding: 0px 2px;
    }
`;

const CoverGrident = styled.div`
  display:${props => props.isGradient ? "block" : "none"};
  width:100%;
  height:100%;
  position:absolute;
  z-index:900;
  left:0;
  top:0;
  background:${props => props.isGradient ? "linear-gradient(180deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255,1.0))" : null};
`
const Review = styled.div`
width: 940px;
height:200px;
padding:20px 30px;
box-shadow: 3px 3px 5px #0000001A;
border:1px solid #eaeaea;
border-radius: 20px;
background: #ffffff;
.hrLine{
  width:100%;
  border:2px solid #efefef;
}
`
const QuestionBoard = styled.div`
  width: 940px;
  background: #FFFFFF;
  box-shadow: 3px 3px 5px #0000001A;
  border:1px solid #eaeaea;
  margin-bottom:50px;
  border-radius: 20px;
  padding:20px 30px;
  font-family: Noto Sans KR;
  position:relative;
  .title {
    font-size:${market_style.font.size.normal1};
    font-weight: 500;
    text-align: left;
  }
  .hrline{
    width:100%;
    border:1px solid #efefef;
  }
  .margin_bottom{
    margin-bottom:10px;
  }
`
const Board = styled.div`
  // *{border: 1px solid red;}
  width: 1600px;
  height: ${props => props.height};
  background: #FFFFFF;
  box-shadow: 5px 5px 10px #00000029;
  border-radius: 20px;
  opacity: 1;
  padding: 30px 50px 20px 50px;
  font-family: Noto Sans KR;
  color: #000000;
  font-weight: 300;
  font-size:${market_style.font.size.normal1};
  line-height: 28px;
  text-align: left;
  position:relative;
  .title {
    font-weight: 500;
  }
  .element {
    margin-top: 22px;
  }
  .element-reply {
    margin-top: 14px;
    padding:10px;
  
  .first {
    margin-top: 50px; 
  }
  .input-wrapper {
     width: 735px;
     height: 88px;
     border-radius: 21px;
     background: #E9E9E9;
     padding: 15px;
     textarea {
      width: 705px;
      height: 58px;
      border: none;
      background: none;
      resize: none;
    }
  }
  .button {
    width: 205px;
    height: 88px;
    margin-left: 39px;
    border: 3px solid #E9E9E9;
    cursor: default;
    .text {
      margin-left: auto;
      margin-right: auto;
      margin-top: 32px;
      width: max-content;
      font-weight: 500;
      font-size:${market_style.font.size.small3};
      line-height: 25px;
      text-align: left;
    }
  }
`;
const Content = styled.div`
  width: ${props => props.width || 1094}px;
  height: max-content;
  background: #FFFFFF;
  box-shadow: 3px 3px 5px #0000001A;
  padding:20px 30px;
  border:1px solid #eaeaea;
  border-radius: 20px;
  font-family: Noto Sans KR;
  color: #000000;
  font-weight: 300;
  font-size:${market_style.font.size.small1};
  text-align: left;
  position:relative;
  overflow:hidden;
  .title {
    font-size:${market_style.font.size.normal1};
    font-weight: 500;
  }
  .hrline{
    width:100%;
    border:1px solid #efefef;
  }
  .margin_bottom{
    margin-bottom:10px;
  }
  .element {
    margin-top: 22px;
  }
  .element-reply {
    margin-top: 14px;
  }
  .first {
    margin-top: 50px; 
  }
  .input-wrapper {
     width: 735px;
     height: 88px;
     border-radius: 21px;
     background: #E9E9E9;
     padding: 15px;
     textarea {
      width: 705px;
      height: 58px;
      border: none;
      background: none;
      resize: none;
    }
  }
  .button {
    width: 205px;
    height: 88px;
    margin-left: 39px;
    border: 3px solid #E9E9E9;
    cursor: default;
    .text {
      margin-left: auto;
      margin-right: auto;
      margin-top: 32px;
      width: max-content;
      font-weight: 500;
      font-size:${market_style.font.size.small3};
      line-height: 25px;
      text-align: left;
    }
  }
  .detail_board{
    width:100%;
    height:max-content;
  }
`;
const ExpandingButton = styled.div`
    width:${props => props.width}px;
    height:30px;
    margin-top:10px;
    // margin-bottom:10px;
    display:flex;
    justify-content:center;
    .button{
        width:100%;
        height:100%;
        // width:80%;
        // height:100%;
        display:flex;
        justify-content:center;
        align-items:cfius:20px;
        // background-color:#707070;
        cursor:pointer;
    }
    .font{
      font-size:${market_style.font.size.small1};
      color:gray;
    }
`;

const MemberBox = styled.div`
    width:300px;
    height:200px;
    position:absolute;
    background-color:white;
    border:1px solid #EFEFEF;
    left:70px;
    top:40px;
    border-radius:15px;
    box-shadow: 5px 5px 10px #00000029;
    z-index:990;
    padding:10px;
    .close{
      width:100%;
      display:flex;
      justify-content:flex-end;
      cursor:pointer;
    }
    .member_list{
      width:100%;
      oveflow-y:auto;
    }
`
const PeerBox = styled.div`
  width:100%;
  display:flex;
  align-items:center;
  margin-bottom:5px;
  .thumbnail{
    width:20px;
    height:20px;
    background-image: url(${prop => prop.imgURL});
    border-radius:20px;
    margin:5px;
  }
`

// debug
const ItemContents = styled.div`
  // *{ border: 1px solid blue; }
  width: 1306px;
  height: 477px;
  background: #FFFFFF;
  box-shadow: 3px 3px 5px #0000001A;
  border: 0.25px solid #B7B7B7;
  border-radius: 20px;
  opacity: 1;
  padding: 20px 25px;
  margin-left: 30px;

  .header {
    padding-bottom: 10px;
    border-bottom: 2px solid #EFEFEF; 
    .title {
      margin: auto;
      // margin-top: 10px;
      width: max-content;
      line-height: 27px;
      font-size: 18px;
      color: #000000;
      font-family: Noto Sans KR;
      font-weight: Medium;
      letter-spacing: 0px;
    }
  }
  .editor-wrapper {
    :hover {
      opacity: 0.95;
    }
    width: 100%;
    height: 405px;
    padding-top: 15px;
    word-wrap: break-word;
    overflow: hidden;
  }
`;

class ItemDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowmember: false,
      isLike: this.props.like == null ? false : this.props.like,
      expandingContent: false, expandingReview: false, expandingBoard: false,
      isexpandingContent: false, isexpandingReview: false, isexpandingBoard: false,
      //for review detail
      reviewdetail: false, detail: null, reviewWrite: false, writeReviewID: null,
    }
    this.onClickLike = this.onClickLike.bind(this);
    this.buyThisItem = this.buyThisItem.bind(this);
    this.modifyThisItem = this.modifyThisItem.bind(this);
    this.selectMethod = this.selectMethod.bind(this);
    this.gotoChargePoint = this.gotoChargePoint.bind(this);
    this.purchaseThisItem = this.purchaseThisItem.bind(this);
  };
  componentWillUpdate(nextProps) {
    if (this.props.like !== nextProps.like) {
      this.setState({
        isLike: nextProps.like,
      })
    }
  };
  onClickLike(event) {
    const isLike = !this.state.isLike;
    this.setState({
      isLike: isLike,
    });
    isLike === false ?
      this.props.UnlikeProductRequest(this.props.id, this.props.token)
      :
      this.props.LikeProductRequest(this.props.id, this.props.token)
  };
  async buyThisItem(event) {
    if (!await confirm(`${this.props.item.price / (this.props.item.price > 9999 ? 10000 : 1)}${this.props.item.price > 9999 ? "만" : ""} point가 결제됩니다.`)) {
      event.preventDefault();
    } else {
      this.props.item.price > this.props.Point ? this.gotoChargePoint() : this.purchaseThisItem()
    }


  }
  async modifyThisItem() {
    // if (await confirm("아이템을 수정하시겠습니까?")) {
    window.location.href = `/productModify/${this.props.ItemDetail["item-id"]}`;
    // }
  }

  async selectMethod(index) {
    if (index !== 0)
      await alert("준비중입니다. 충전 후 결제해주세요.");
  }
  async gotoChargePoint() {
    if (await confirm("충전 금액이 부족합니다. 충전하러 이동하시겠습니까?")) {
      window.location.href = `/point`;
    }
  }
  purchaseThisItem() {
    this.props.purchase(this.props.item);
  }

  render() {
    const item = this.props.item;
    const { expandingContent, expandingReview, expandingBoard } = this.state;
    const { score } = this.props.item;
    let tag = this.props.ItemDetail.tag + "";
    console.log(this.props);

    const isWrapperContent = window.document.getElementById("detail_board") &&
      window.document.getElementById("detail_board").scrollHeight > window.document.getElementById("detail_board").clientHeight;
    console.log(window.document.getElementById("detail_board") &&
      window.document.getElementById("detail_board").scrollHeight > window.document.getElementById("detail_board").clientHeight)
    // console.log(window.document.getElementById("detail_board")&&window.document.getElementById("detail_board").
    // ,window.document.getElementById("detail_board")&&window.document.getElementById("detail_board").scrollHeight)

    const RenderStar = () => {
      return <Rating size="small" name="score" icon='star' defaultRating={parseInt(score, 10)} maxRating={5} disabled />
    }
    const MemberListBox = () => {
      return (
        <MemberBox>
          <div onClick={() => { this.setState({ isShowmember: !this.state.isShowmember }) }} className="close">
            <Cross angle={45} color={"#000000"} weight={2} width={15} height={15} />
          </div>

          <div className="member_list">
            {
              item.members.map((item, index) => {
                return (
                  <PeerBox imgURL={item.s_img} key={index}>
                    <div className="thumbnail" />
                    <div className="name_label">{item.nick_name}</div>
                  </PeerBox>
                );
              })
            }
          </div>
        </MemberBox>
      );
    }
    return item ?
      <React.Fragment>

        {/* item-contents */}
        <ItemContents>
          <div className="header">
            <div className="title">아이템 상세내용</div>
          </div>

          <div className="editor-wrapper ">
            {item && item.upload_type === "blog"
              ? <div style={{ overflow: "auto", height: "100%", }}>
                <CardSourceDetailContainer bought={item.bought} isCancel cardId={item.cardId} />
              </div>
              : null}

            {item && item.upload_type === "project"
              ? <ItemStepContainer item={item} id={item["item-id"]} bought={item.bought} />
              : null}
          </div>

        </ItemContents>
      </React.Fragment>
      :
      <div>아이템정보를 가져오고 있습니다.</div>
  }
}

export default ItemDetail;
