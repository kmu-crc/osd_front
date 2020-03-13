import React, { Component } from 'react';
import styled from 'styled-components';
import Star from "components/Commons/Star";
import noimg from "source/noimg.png";
import who from "source/thumbnail.png";
import CardSourceDetailContainer from "containers/Items/CardSourceDetailContainer";
import ItemStepContainer from "containers/Items/ItemStepContainer";
import ItemQuestionContainer from "containers/Items/ItemQuestionContainer";
import ItemReviewContainer from "containers/Items/ItemReviewContainer";
import PointFormat from "modules/PointFormat";
import ReviewDetailModal from "components/Commons/ReviewDetailModal";
import ConnectedMemberContainer from "containers/Items/ConnectedMemberContainer";

// import NumberFormat from "modules/NumberFormat";
// import { Link } from "react-router-dom";

const Wrapper = styled.div`
  // * { border: 1px solid red; };
  margin-top: 50px;

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
  margin-left: 25px; 

  .main-image {
    border: 1px solid #EFEFEF;
    overflow-x: auto;
    width: 100%;
    height: 100%; 
    background-image: url(${prop => prop.main});
    background-size: cover;
    background-position: center center;
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
  position: relative;
  margin-left: 50px;
  width: 900px;
  height: 600px;
  font-family: Noto Sans KR;
  background: #FFFFFF;
  box-shadow: 5px 5px 10px #00000029;
  border-radius: 20px; 
  padding: 20px 35px 10px 15px;

  // *{ border: 1px solid red; };

  .title {
    font-size: 34px;
    line-height: 50px;
    text-align: left;
    color: #000000;
  }
  .expert {
    margin-top: 19px;
    .who {
      width: 49px;
      height: 50px;
      border-radius: 50%;
      background-size: cover;
      background-position: center center;
      background-image: url(${props => props.face});
      margin-right: 26px;
    }
    .nick{
      font-size: 20px;
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
    cursor: default;
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
      width: 349px;
      margin-top: 15px;
      margin-bottom:29px;
      font-size: 15px;
      font-weight: 300;
      line-weight: 27px;
      text-align: left;
      overflow: hidden;
    }
    .gradient_box{
      position:absolute;
      left:0px;
      top:0px;
      width:100%;
      height:100%;
      display:flex;
      justify-content:center;
      align-items:flex-end;
      padding:10px;
      border-radius: 20px;
      background:linear-gradient(180deg, rgba(255, 255, 255, 0), rgba(255, 255, 255,01.0));
    }
  }
  

  &:hover{
    .gradient_box{
      display:none;
    }
    .wrapItem {
      overflow: auto;
    }
  }


`;
const Board = styled.div`
  // *{border: 1px solid red;}
  width: 1600px;
  height: ${props => props.height};
  background: #FFFFFF;
  box-shadow: 5px 5px 10px #00000029;
  border-radius: 20px;
  opacity: 1;
  padding: 45px 25px 20px 30px; // 90px 51px 45px 60px;
  font-family: Noto Sans KR;
  color: #000000;
  font-weight: 300;
  font-size: 19px;
  line-height: 28px;
  text-align: left;

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
  padding: 45px 25px 20px 30px;
  font-family: Noto Sans KR;
  color: #000000;
  font-weight: 300;
  font-size: 19px;
  line-height: 28px;
  text-align: left;

  .title {
    font-weight: 500;
    margin-bottom: 25px;
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
`;
const ExpandingButton = styled.div`
    width:${props => props.width}px;
    height:30px;
    margin-bottom:10px;
    display:flex;
    justify-content:center;
    .button{
        width:80%;
        height:100%;
        display:flex;
        justify-content:center;
        align-items:center;
        border-radius:20px;
        background-color:#707070;
        cursor:pointer;
    }
    .font{
        font-size:15px;
        color:white;
    }
`;

class ItemDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLike: this.props.like == null ? false : this.props.like,
      tab: "review", expandingContent: false, expandingReview: false,
      //for review detail
      reviewdetail: false, detail: null
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
  buyThisItem(event) {
    if (!window.confirm(`${this.props.item.price / 1000}천원이 결제됩니다.`)) {
      event.preventDefault();
    } else {
      this.props.item.price > this.props.Point ? this.gotoChargePoint() : this.purchaseThisItem()
    }
  }
  modifyThisItem() {
    if (window.confirm("아이템을 수정하시겠습니까?")) {
      window.location.href = `/productModify/${this.props.ItemDetail["item-id"]}`;
    }
  }

  selectMethod(index) {
    if (index !== 0)
      alert("준비중입니다. 충전 후 결제해주세요.");
  }
  gotoChargePoint() {
    if (window.confirm("충전 금액이 부족합니다. 충전하러 이동하시겠습니까?")) {
      window.location.href = `/point`;
    }
  }
  purchaseThisItem() {
    this.props.purchase(this.props.item);
  }

  render() {
    console.log("itemdetail", this.props);
    const item = this.props.item;
    const { tab, expandingContent, expandingReview } = this.state;
    return item ?
      <React.Fragment>
        {(this.props.userInfo && item.members && item.members.length > 1)
          ? <ConnectedMemberContainer id={this.props.itemId} members={item.members} userInfo={this.props.userInfo} />
          : null}
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
                  <div className="who" />
                  <div className="nick">{item.userName}</div>
                </div>
                <Introduction>
                  <div className="wrapItem">
                    <div className="title">아이템 설명</div>
                    <div className="text">{item.description}</div>
                    <div className="gradient_box"><div>▾</div></div>
                  </div>
                </Introduction>

                <div className="expert line">
                  <div className="price-and-score line">
                    <div className="price" style={{ marginRight: "35px" }}>
                      {PointFormat(item.price / 1000 || 0)} 천원</div>
                    <div className="score line" style={{ marginLeft: "auto", marginRight: "15px" }}>
                      {Star(item.score, 28)}({item.total || 0})</div>
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
                      <div className="button first">
                        <div onClick={this.modifyThisItem}>
                          <div className="text">아이템 수정/삭제</div>
                        </div>
                      </div>
                    : null}
                  <div className="button first">
                    <div onClick={_ => this.buyThisItem(_, item)} >
                      <div className="text">아이템구입</div>
                    </div>
                  </div>
                    {this.state.isLike === false ?
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
            <Board style={{ marginTop: "15px", overflow: "hidden" }}
              height={expandingReview ? "100%" : "250px"}>
              <div style={{ fontFamily: "Noto Sans KR", fontWeight: "500", color: "#707070", display: "flex" }}>
                <div
                  onClick={() => this.setState({ tab: "review" })}
                  style={{ borderRadius: "0px 10px 0px 0px", padding: "10px 5px", textAlign: "center", width: "120px", background: tab === "review" ? "#FFFFFF" : "#EFEFEF" }}>리뷰보기</div>
                <div
                  onClick={() => this.setState({ tab: "board" })}
                  style={{ borderRadius: "0px 10px 0px 0px", padding: "10px 5px", textAlign: "center", width: "120px", background: tab === "board" ? "#FFFFFF" : "#EFEFEF" }}>게시판</div>
              </div>

              {tab === "review" ?
                <ItemReviewContainer
                  user_id={item.user_id}
                  handler={detail => this.setState({ reviewdetail: true, detail: detail })} />
                : <ItemQuestionContainer
                  user_id={item.user_id} />}

              {tab === "review" && this.state.reviewdetail ?
                <ReviewDetailModal
                  open={this.state.reviewdetail}
                  close={() => this.setState({ reviewdetail: false })}
                  detail={this.state.detail} /> : null}

            </Board>
            <ExpandingButton width={1600}>
              <div onClick={() => this.setState({ expandingReview: !this.state.expandingReview })} className="button">
                <div className="font">
                  {expandingReview ? "접기" : "펼쳐보기"}
                </div>
              </div>
            </ExpandingButton>
          </div>

          {/* item-contents */}
          <div style={{ marginTop: "35px" }}>
            <Content
              style={{ marginTop: "15px", overflow: "hidden" }}
              height={expandingContent ? "100%" : "175px"}
              width={1600}>
              <div className="title">아이템 상세내용</div>
              {item && item.upload_type === "blog"
                ? <CardSourceDetailContainer
                  bought={item.bought}
                  isCancel
                  cardId={item.cardId}
                // edit={item.user_id === (this.props.userInfo && this.props.userInfo.uid)}
                /> : null}
              {item && item.upload_type === "project"
                ? <ItemStepContainer
                  item={item}
                  id={item["item-id"]}
                  bought={item.bought}
                // editor={item.user_id === (this.props.userInfo && this.props.userInfo.uid)}
                /> : null}
            </Content>
            <ExpandingButton width={1600}>
              <div onClick={() => this.setState({ expandingContent: !this.state.expandingContent })} className="button">
                <div className="font">
                  {expandingContent ? "접기" : "펼쳐보기"}
                </div>
              </div>
            </ExpandingButton>
          </div>

        </Wrapper>
      </React.Fragment>
      :
      <div>아이템정보를 가져오고 있습니다.</div>
  }
}

export default ItemDetail;


