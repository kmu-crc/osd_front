import React, { Component } from 'react';
import styled from 'styled-components';
import 'react-dropdown/style.css';
import Star from "components/Commons/Star";
import noimg from "source/noimg.png";
import who from "source/thumbnail.png";
import CardSourceDetailContainer from "containers/Designs/CardSourceDetailContainer";
import ItemStepContainer from "containers/Items/ItemStepContainer";
import ItemQuestionContainer from "containers/Items/ItemQuestionContainer";
import ItemReviewContainer from "containers/Items/ItemReviewContainer";
import NumberFormat from "modules/NumberFormat";
import PointFormat from "modules/PointFormat";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  // * { border: 1px solid red; };
  margin-top: 50px;

  .line { 
    display: flex; 
  };
  .flex-align-column {
    flex-direction: column;
  };
  .bottom {
    background: blue;
    align-self: flex-end;
  };
`;
const ItemImages = styled.div`
  width: 600px;
  height: 600px;
  margin-left: 25px; 

  .main-image {
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
  margin-left: 50px;
  width: 900px;
  height: 600px;
  font-family: Noto Sans KR;
  background: #FFFFFF;
  box-shadow: 5px 5px 10px #00000029;
  border-radius: 20px; 
  padding: 20px 35px 10px 15px;

  *{ border: 1px solid red; };

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
  }
  .price-and-score {
    margin-top: 10px;
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
        color: #FFFFFF; background: #FF0000; margin-right: 27px; }
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
const Detail = styled.div`
  margin-right: ${props => props.mRight ? props.mRight : 0}px;
  width: 468px;
  height: 491px;
  background: #FFFFFF;
  box-shadow: 5px 5px 10px #00000029;
  border-radius: 20px;
  opacity: 1;
  padding: 62px;
  font-family: Noto Sans KR;

  .title {
    font-weight: 500;
    font-size: 19px;
    text-align: left:
    line-height: 28px;
    color: #060000;
    letter-spacing: 0;
  }
  .text {
    margin-top: 29px;
    height: 311px;
    overflow: auto;
    text-align: left;
    font-weight: 300;
    font-size: 15px;
    line-height: 27px;
    letter-spacing: 0;
    color: #000000;
    opacity: 1;
  }
`;
const Delivery = styled.div`
  margin-right: ${props => props.mRight ? props.mRight : 0}px;
  width: 468px;
  height: 491px;
  background: #FFFFFF;
  box-shadow: 5px 5px 10px #00000029;
  border-radius: 20px;
  opacity: 1;
  padding: 62px;
  font-family: Noto Sans KR;

  .title {
    font-weight: 500;
    font-size: 19px;
    text-align: left:
    line-height: 28px;
    color: #060000;
    letter-spacing: 0;
    margin-bottom: 58px;
  }
  .sub-title {
    font-weight: 500;
    font-size: 15px;
    text-align: left:
    line-height: 27px;
    color: #000000;
    letter-spacing: 0;
    margin-bottom: 15px;
  }
  .text {
    font-weight: 300;
    font-size: 15px;
    text-align: left:
    line-height: 27px;
    color: #000000;
    letter-spacing: 0;
    margin-bottom: 30px;
  }
`;
const Board = styled.div`

  width: 1094px;
  height: 892px;
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
  height: 892px;
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

class ItemDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLike: this.props.like == null ? false : this.props.like,
    }
    this.onClickLike = this.onClickLike.bind(this);
    this.buyThisItem = this.buyThisItem.bind(this);
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
  buyThisItem(event, item) {
    if (!window.confirm(`${item.price} 포인트가 결제됩니다.`)) {
      event.preventDefault();
    }
  }
  // 보유 포인트가 충분하지 않으면 “포인트가 부족합니다. 포인트 구매 후 결재하십시오.” 안내 문구를 보여주고 포인트 구매 절차로 진행
  // 포인트 구매는 신용카드, 모바일폰 소액결재, 무통장 입금, 삼성/카카오 페이 등의 온라인 결재 수단 사용
  // 결재 후 대금이 회사로 지불되고 구매자에게는 구매 확인 버튼이 보이며 구매자가 구매 확인 버튼을 클릭하거나 7일 동안 불만 사항이 접수되지 않으면 수수료 10%를 제외한 금액이 판매자에게 이체됨

  // 결재 모듈을 이용한 온라인 결재 기능 관련하여 자세한 처리 절차와 결과에 관한 정보를 알아봐야 함 – 서비스 제공 회사와 비용, 조건 등
  // 내정보 창에서 포인트를 구매하거나 보유한 포인트를 현금화할 수 있음 – 포인트 관리에 대한 보안을 철저히 하여야 함
  // 고객의 불만이 접수되면 심사위원의 심사를 거쳐 환불 결정 – 10인 정도의 심사위원을 선정하여 아이템의 품질 평가 및 고객 불만을 처리할 계획임

  render() {
    console.log(this.props);
    const item = this.props.item;
    return item ?
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

              <div className="price-and-score line">
                <div className="price" style={{ marginRight: "35px" }}>
                  {PointFormat(item.price || 0)} 포인트</div>
                <div className="score line" style={{ marginLeft: "auto", marginRight: "15px" }}>
                  {Star(item.score)}({item.total || 0})</div>
              </div>

              {/* <div className="options">
              { / * {item.options.map(opt => <Options key={opt} data={opt} />)} * / }
              <div className="combo-wrapper line">
              <div className="text">모양</div>
              <div className="box WIDTH360"></div>
              </div>
              <div className="combo-wrapper line">
              <div className="text">수량</div>
              <div className="box WIDTH178"></div>
              </div>
            </div> */}
              <div className="bottom">
                <div className="buttons line">
                  <div className="button first">
                    <Link onClick={(event) => this.buyThisItem(event, item)} to={{ pathname: `/payment`, state: { item: item, options: { "test": "test" } } }}>
                      <div className="text">아이템구매</div>
                    </Link>
                  </div>
                  {
                    this.state.isLike === false ?
                      <div className="button second" onClick={this.onClickLike}>
                        <div className="text">관심항목추가</div></div>
                      :
                      <div className="button first" onClick={this.onClickLike}>
                        <div className="text">관심항목</div></div>
                  }

                </div>
              </div>
            </div>
          </ItemInfo>

        </div>

        {/* review and board */}
        <div className="line">
        </div>

        {/* item-contents */}
        <div className="line">
        </div>
      </Wrapper>
      :
      <div>LoaDing...</div>
  }
}

export default ItemDetail;


