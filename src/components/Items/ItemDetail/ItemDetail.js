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
const Wrapper = styled.div`
  // * { border: 1px solid red; };
  margin-top: 50px;
  margin-bottom:50px;
  .line { 
    display: flex; 
  };
  .flex-align-column {
    flex-direction: column;
  };
`;
const ItemImages = styled.div`
  width: 600px;
  height: 600px;
  // margin-left: 25px; 
  .main-image {
    border: 1px solid #EFEFEF;
    overflow-x: auto;
    width: 100%;
    height: 100%; 
    background-image: url(${prop => prop.main});
    background-size: contain;
    background-position: center center;
    background-repeat:no-repeat;
    border-radius: 20px;
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
  // border:1px solid black;
  position: relative;
  margin-left: 50px;
  width: 948px;
  height: 600px;
  font-family: Noto Sans KR;
  background: #FFFFFF;
  box-shadow: 5px 5px 10px #00000029;
  border-radius: 20px; 
  // padding: 20px 35px 10px 15px;
  padding:35px;
  // *{ border: 1px solid red; };
  .title {
    font-size: 23px;
    // line-height: 50px;
    text-align: left;
    color: #000000;
  }
  .expert {
    margin-top: 19px;
    position:relative;
    .who {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background-size: cover;
      background-position: center center;
      background-image: url(${props => props.face});
      margin-right: 26px;
    }
    .nick{
      cursor:pointer;
      font-size: 17px;
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
    font-size: 15px;
    line-height: 27px;
    letter-spacing: 0;
    color: #000000;
    opacity: 1;
    }
  }
  .price-and-score {
    margin-left: auto;
    margin-right: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
    font-weight: 500;
    font-size: 20px;
    line-height: 29px;
    text-align: left;
    color: #060000;
  }
  .options {
    margin-top: 50px;
    .text {
      width: max-content;
      text-align: left;
      font-weight: 500;
      font-size: 20px;
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
    width: max-content;
    position: absolute;
    right: 35px;
    bottom: 15px;
  };
  .buttons {
    cursor: pointer;
    .button { 
      width: 213px;
      height: 70px;
      .text{
        width: max-content;
        margin-left: auto;
        margin-right: auto;
        margin-top: 15px;
        line-height: 37px;
        font-size: 25px;
        font-weight: 500;
      }
      &.first { 
        color: #FFFFFF; 
        background: #FF0000; 
        margin-right: 27px; 
      }
      &.second {
        border: 1px solid red;
        color: #FF0000;
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
  height: 250px;
  opacity: 1;
  font-family: Noto Sans KR;
  .wrapItem{
    width:100%;
    height:100%;
    overflow:hidden;
    .flex{
      display:flex;
    }
    .title {
      margin-top: 10px;
      font-size: 19px;
      font-weight: 500;
      line-height: 28px;
      text-align: left;
    }
    .text {
      width: 100%;
      margin-top: 15px;
      margin-bottom:29px;
      font-size: 15px;
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
height:max-content;
width: 1600px;
padding:26px 42px 26px 42px;
box-shadow: 5px 5px 10px #00000029;
background: #ffffff;
border-radius: 20px;
.hrLine{
  width:100%;
  height:2px;
  background-color:#d6d6d6;
  margin-top:26px;
}
.header{
  display:flex;
  .title{
    font-family:Noto Sans CJK KR, Medium;
    font-size:20px;
    margin-right:29px;
  }
  
}
`
const QuestionBoard = styled.div`
// *{border: 1px solid red;}
  width: 1600px;
  // height: ${props => props.height};
  background: #FFFFFF;
  box-shadow: 5px 5px 10px #00000029;
  border-radius: 20px;
  padding: 30px 50px 20px 50px;
  font-family: Noto Sans KR;
  position:relative;
  .title{
    font-family:Noto Sans CJK KR, Medium;
    font-size:20px;
    margin-right:29px;
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
  font-size: 19px;
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
      font-size: 17px;
      line-height: 25px;
      text-align: left;
    }
  }
`;
const Content = styled.div`
  width: ${props => props.width || 1094}px;
  height: ${props => props.height};
  background: #FFFFFF;
  box-shadow: 5px 5px 10px #00000029;
  border-radius: 20px;
  opacity: 1;
  padding: 50px 20px 20px 50px;
  font-family: Noto Sans KR;
  color: #000000;
  font-weight: 300;
  font-size: 19px;
  line-height: 28px;
  text-align: left;
  position:relative;
  .title {
    font-weight: 500;
    margin-bottom: 12px;
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
      font-size: 17px;
      line-height: 25px;
      text-align: left;
    }
  }
  .detail_board{
    // border:1px solid black;
    width:1570px;
    border-radius: 20px;
    padding: 15px 35px;
    height:max-content;
    // border:1px solid black;
    // overflow:scroll;
    // scroll-y:hidden;
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
        font-size:15px;
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
    if (!await confirm(`${this.props.item.price / (this.props.item.price>9999?10000:1)}${this.props.item.price>9999?"만":""} point가 결제됩니다.`)) {
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
      return <Rating size="massive" name="score" icon='star' defaultRating={parseInt(score, 10)} maxRating={5} disabled />
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
          <div className="line">
            <ItemImages main={item.thumbnail ? item.thumbnail.l_img : noimg}>
              <div className="main-image" />
            </ItemImages>

            <ItemInfo face={item.who || who}>
              <div className="flex-align-column line">

                <div className="title">{this.props.ProductDetail == null ? item.title : this.props.ProductDetail.title}</div>
                <div className="expert line">
                  {(this.props.userInfo && item.members && item.members.length > 0 && this.state.isShowmember)
                    ? <MemberListBox />
                    : null}
                  <div className="who" />
                  <div className="nick" onClick={() => this.setState({ isShowmember: !this.state.isShowmember })}>{item.userName}
                    {this.props.userInfo && item.members && item.members.length > 0
                      ?
                      `외 ${item.members.length}명` : null}
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
                      {item.type === 2 ? "기술자문/상담" : null}
                      {item.type === 3 ? "경험" : null}
                      {item.type === 4 ? "정보/데이터" : null}
                      {item.type === 5 ? "아이디어/노하우" : null}
                      {item.type === 6 ? "지적재산권" : null}
                      {item.type === 7 ? "제작품" : null}
                    </div>
                    <div className="title">태그</div>
                    <div className="text flex">
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
                    <div className="gradient_box" ></div>
                  </div>
                </Introduction>

                <div className="expert line">
                  <div className="price-and-score line">
                    <div className="price" style={{ marginRight: "35px" }}>
                      {PointFormat(item.price / (item.price>9999?10000:1) || 0)}{item.price>9999?"만":""} point</div>
                    <div className="score line" style={{ marginLeft: "auto", marginRight: "15px" }}>
                      {/* {Star(item.score, 28)}({item.total || 0}) */}
                      {/* <Rating name="score" icon='star' defaultRating={parseInt(score,10)} maxRating={5} disabled /> */}
                      <RenderStar />
                    </div>
                  </div>
                </div>

                {/* 
                <div className="options">
                { / * {item.options.map(opt => <Options key={opt} data={opt} />)} * / }
                <div className="combo-wrapper line">
                <div className="text">모양</div>
                <div className="box WIDTH360"></div>
                </div>
                <div className="combo-wrapper line">
                <div className="text">수량</div>
                <div className="box WIDTH178"></div>
                </div>
                </div>
            */}

                <div className="bottom">
                  <div className="buttons line">
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
                            {/* <div onClick={_ => this.buyThisItem(_, item)} > */}

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

          {/* review and board */}
          <div style={{ marginTop: "35px" }}>
            <Review>
              <ItemReviewContainer
                user_id={item.user_id}
                detail={this.state.detail}
                handler={detail => this.setState({ reviewdetail: true, detail: detail })}
                isExpanding={(result) => { this.setState({ isexpandingReview: result }) }} />
            </Review>

            {
              this.state.isexpandingReview &&
              <ExpandingButton width={1600}>
                <div onClick={() => this.setState({ expandingReview: !expandingReview })} className="button">
                  <div className="font">
                    {/* {expandingReview ? "▲접기" : "▼펼쳐보기"} */}
                  </div>
                </div>
              </ExpandingButton>
            }

          </div>

          <div style={{ marginTop: "35px" }}>
            <QuestionBoard style={{ marginTop: "15px", overflow: "hidden" }} height={expandingBoard ? "100%" : "250px"}>
              <div className="title">게시판</div>
              <ItemQuestionContainer user_id={item.user_id} isExpanding={(result) => { this.setState({ isexpandingBoard: result }) }} />
              {/* {!this.state.isexpandingBoard && <CoverGrident isGradient={!expandingBoard} />} */}
            </QuestionBoard>
            {/* {!this.state.isexpandingBoard &&

              <ExpandingButton width={1600}>
                <div onClick={() => this.setState({ expandingBoard: !expandingBoard })} className="button">
                  <div className="font">
                    {expandingBoard ? "▲접기" : "▼펼쳐보기"}
                  </div>
                </div>
              </ExpandingButton>
            } */}

          </div>

          {/* item-contents */}
          <div style={{ marginTop: "35px" }}>
            <Content
              id="contents_rgn"
              style={{ marginTop: "15px",overflow: "hidden"}}
              // height={expandingContent ? "100%" : "400px"}
              width={1600}>
              <div className="title">아이템 상세내용</div>
              {item && item.upload_type === "blog"
                ? <div className="detail_board" id="detail_board">
                  <CardSourceDetailContainer
                    bought={item.bought}
                    isCancel
                    cardId={item.cardId}
                  // edit={item.user_id === (this.props.userInfo && this.props.userInfo.uid)}
                  />
                </div>
                : null}
              {item && item.upload_type === "project"
                ?
                <div className="detail_board" id="detail_board">
                  <ItemStepContainer
                    item={item}
                    id={item["item-id"]}
                    bought={item.bought}
                  />
                </div>
                : null}
              {/* {isWrapperContent&&<CoverGrident isGradient={!expandingContent}/>} */}
            </Content>
            {/* {isWrapperContent&&
           <ExpandingButton width={1600}>
              <div onClick={() => this.setState({ expandingContent: !expandingContent })} className="button">
                <div className="font">
                  {expandingContent ? "▲ 접기" : "▼ 펼쳐보기"}
                </div>
              </div>
            </ExpandingButton>
           }  */}
          </div>

        </Wrapper>
      </React.Fragment>
      :
      <div>아이템정보를 가져오고 있습니다.</div>
  }
}

export default ItemDetail;