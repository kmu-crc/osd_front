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
    width:100%;
    display:flex;
    box-shadow: 3px 3px 5px #0000001A;
    border:1px solid #eaeaea;
    border-radius:20px;
    padding:30px 45px;
  }
  .flex-align-column {
    flex-direction: column;
  };
  .row{
    width:100%;
    margin-top:20px;
  }
  @media only screen and (max-width: 1000px) and (min-width: 500px){
    .profileBox{
      flex-direction:column;
      flex-wrap:wrap;
    }
  }
`;
const ItemImages = styled.div`
  width: 396px;
  min-width:396px;
  height: 354px;
  min-height: 354px;
  margin-right: 45px;
  background-image: url(${prop => prop.main});
  background-size: contain;
  background-position: center center;
  background-repeat:no-repeat;
  @media only screen and (max-width: 1000px) and (min-width: 500px){
    width:100%;
    min-width:100%;
  }
`;
const ItemInfo = styled.div`
  position: relative;
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
  .marginBottom{
    margin-bottom:10px;
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
      font-size:${market_style.font.size.small1};
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

  .bottom {
    width:100%;
    display:flex;
    justify-content:flex-end;
    margin-top:20px;
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
  margin-top:20px;
  .wrapItem{
    width:100%;
    height:100%;
    overflow: hidden auto;
    .flex{
      display:flex;
    }
    .flex-wrap{
      flex-wrap: wrap;
    }
    .title {
      font-size:${market_style.font.size.small1};
      font-weight: 500;
      text-align: left;
    }
    .text {
      width: 100%;
      margin-top: 10px;
      margin-bottom:25px;
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
    min-width: max-content;
    background-color:#E9E9E96A;
    margin-right: 8px;
    margin-top: 5px;
    color: #707070;
    padding:5px 12px;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    font-size:${market_style.font.size.small1};
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
width: 100%;
height:max-content;
max-height:366px;
padding:10px 25px 20px 25px;
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
  width: 100%;
  background: #FFFFFF;
  box-shadow: 3px 3px 5px #0000001A;
  border:1px solid #eaeaea;
  margin-bottom:50px;
  border-radius: 20px;
  padding:10px 25px;
  font-family: Noto Sans KR;
  position:relative;
  .title {
    display:flex;
    color:black;
    justify-content:center;
    align-items:center;
    height:27px;
    width:100%;
    font-size:${market_style.font.size.normal1};
    font-weight: 500;
    text-align: center;
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
  width: ${props => props.width == null ? "100%" : props.width + "px"};
  height: max-content;
  background: #FFFFFF;
  box-shadow: 3px 3px 5px #0000001A;
  padding:10px 25px;
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
    display:flex;
    color:black;
    justify-content:center;
    align-items:center;
    height:27px;
    width:100%;
    text-align:center;
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
  width: 100%;
  height: 585px;
  background: #FFFFFF;
  box-shadow: 3px 3px 5px #0000001A;
  border: 0.25px solid #eaeaea;
  border-radius: 20px;
  opacity: 1;
  padding: 20px 25px;

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
    width: 99%;
    height: 510px;
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
        {/* {(this.props.userInfo && item.members && item.members.length > 1)
          ? <ConnectedMemberContainer id={this.props.itemId} members={item.members} userInfo={this.props.userInfo} />
          : null} */}

        <Wrapper>
          {/* thumbnail and item-info */}
          <div className="profileBox">
            <ItemImages main={item.thumbnail ? item.thumbnail.l_img : noimg}/>
            <ItemInfo face={item.who || who}>
              <div className="flex-align-column line">
                <div className="flex spaceBetween">
                  <div className="title">{this.props.ProductDetail == null ? item.title : this.props.ProductDetail.title}</div>
                  <div className="expert">
                    {/* {(this.props.userInfo && item.members && item.members.length > 0 && this.state.isShowmember)
                    ? <MemberListBox />
                    : null} */}
                    <div className="who" />
                    <div className="nick" onClick={() => this.setState({ isShowmember: !this.state.isShowmember })}>{item.userName}
                      {this.props.userInfo && item.members && item.members.length > 0
                        ?
                        `외 ${item.members.length}명` : null}
                    </div>
                  </div>
                </div>


                <Introduction id="Introduction">
                  <div className="wrapItem">
                    <div className="title">설명</div>
                    <div id="itemDescription" className="text"
                      dangerouslySetInnerHTML={{ __html: `${item.description || ""}` }}
                    />
                    <div className="title">유형</div>
                    <div className="text flex">
                      {item.type === 0 ? "디자인" : null}
                      {item.type === 1 ? "프로젝트" : null}
                      {item.type === 8 ? "강의" : null}
                      {item.type === 2 ? "기술자문/상담" : null}
                      {item.type === 3 ? "경험" : null}
                      {item.type === 4 ? "정보/데이터" : null}
                      {item.type === 5 ? "아이디어/노하우" : null}
                      {item.type === 6 ? "지적재산권" : null}
                      {item.type === 7 ? "제작품" : null}
                    </div>
                    <div className="title marginBottom">태그</div>
                    <div className="flex flex-wrap">
                      {
                        tag.indexOf(",") == -1 ? null : tag.split(",").map((item, index) => {
                          return (
                            <TagPiece key={index}>
                              {item}
                            </TagPiece>
                          );
                        })
                      }
                    </div>
                    {/* <div className="gradient_box" ></div> */}
                  </div>
                </Introduction>

                <div className="price-and-score line">
                  <div className="price">
                    {PointFormat(item.price / (item.price > 9999 ? 10000 : 1) || 0)}{item.price > 9999 ? "만" : ""} point</div>
                  <RenderStar />
                </div>

                <div className="bottom">
                  <div className="buttons flex">
                    {item.user_id === (this.props.userInfo && this.props.userInfo.uid) ?
                      <div onClick={this.modifyThisItem} className="button first">
                        <div>
                          <div className="text">아이템 수정/삭제</div>
                        </div>
                      </div>
                      :

                      <div className="button first">
                        <Link
                          onClick={async (e) => {
                            return this.props.isbuy > 0 ?
                              await confirm("이미 구매하신 이력이 존재합니다. 계속 진행하겠습니까?") ? null : window.history.go(-1)
                              : null
                          }}
                          to={{
                            pathname: `/payment`, state: {
                              item: this.props.item,
                              custom: null,
                              options: null
                            }
                          }
                          }>
                          <div>
                            <div className="text">아이템 구입</div>
                          </div>
                        </Link>
                      </div>
                    }
                    {this.props.ItemDetail && this.props.userInfo &&
                      this.props.ItemDetail.user_id == this.props.userInfo.uid ? null : this.state.isLike === false ?
                      <div className="button second" onClick={this.onClickLike}>
                        <div className="text">관심항목추가</div></div>
                      :
                      <div className="button second active" onClick={this.onClickLike}>
                        <div className="text">관심항목</div></div>}
                  </div>
                </div>
              </div>
            </ItemInfo>

          </div>

          {/* item-contents */}
          {item &&
            item.headers &&
            item.headers.length > 0 &&
            item.headers.map(
              (head, index) =>
                <div className="row">
                  <ItemContents>
                    <div className="header">
                      <div className="title">
                        {head.name || "아이템 상세내용"}
                      </div>
                    </div>
                    <div className="editor-wrapper">
                      {head.editor_type === "project"
                        ? <ItemStepContainer index={index} header={head} item={item} id={head.content_id} bought={item.bought} />
                        : null}
                      {head.editor_type === "blog"
                        ? <CardSourceDetailContainer bought={item.bought} isCancel cardId={item.cardId} />
                        : null}
                    </div>
                  </ItemContents>
                </div>
            )}

          {/* review and board */}
          <div className="row">
            <Review>
              <ItemReviewContainer
                user_id={item.user_id}
                detail={this.state.detail}
                handler={detail => this.setState({ reviewdetail: true, detail: detail })}
                isExpanding={(result) => { this.setState({ isexpandingReview: result }) }} />
            </Review>
          </div>


          <div className="row">
            <QuestionBoard>
              <div className="title margin_bottom">게시판</div>
              <div className="hrline margin_bottom" />
              <ItemQuestionContainer user_id={item.user_id} isExpanding={(result) => { this.setState({ isexpandingBoard: result }) }} />
            </QuestionBoard>
          </div>

        </Wrapper>
      </React.Fragment>
      :
      <div>아이템정보를 가져오고 있습니다.</div>
  }
}

export default ItemDetail;
