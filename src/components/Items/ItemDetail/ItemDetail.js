import React, { Component } from 'react';
import styled from 'styled-components';
import 'react-dropdown/style.css';
import Star from "components/Commons/Star";
import noimg from "source/noimg.png";

// import DesignDetailStepContainer from "containers/Designs/DesignDetailStepContainer";
import DesignDetailViewContainer from "containers/Designs/DesignDetailViewContainer";
// import who from "source/thumbnail.png";
// import { Dropdown } from "semantic-ui-react";
// import TextFormat from 'modules/TextFormat';
// import cookie from 'react-cookies';

const Wrapper = styled.div`
  // *{ border:1px solid red; };
  margin-top: 50px;
  .line { display: flex; }
`;
const ItemImages = styled.div`
  width: 587px;
  height: 605px;
  margin-left: 175px;
  .main-image {
    width: 587px;
    height: 489px;
    background-image: url(${prop => prop.main});
    background-size: cover;
    background-position: center center;
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
  margin-left: 400px;
  height: 605px;
  width: 453px;
  font-family: Noto Sans KR;
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
  .price-and-rate {
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
const Reviews = styled.div`
  width: 468px;
  height: 1478px;
  background: #FFFFFF;
  box-shadow: 5px 5px 10px #00000029;
  border-radius: 20px;
  opacity: 1;
  // padding: 
`;
const Page = styled.div`
    width: max-content;
    margin-top: 87px;
    margin-left: auto;
    margin-right: auto;
    font-size: 20px;
    font-weight: 500;
    text-aglin: left;
    display: flex;
    flex-direction: row;
    line-height: 27px;
    color: #707070;
    .number{
      margin-right: 10px;
    }
    .this{
      color: red;
    }
    .another {}
    .more {}
`;
const Board = styled.div`
  width: 1094px;
  height: 892px;
  background: #FFFFFF;
  box-shadow: 5px 5px 10px #00000029;
  border-radius: 20px;
  opacity: 1;
  padding: 90px 51px 45px 60px;
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
  render() {
    const item = this.props.item;
    console.log(item);
    return !item ? (<div>loading...</div>) :
      (<Wrapper>
        <div className="line">
          <ItemImages main={item.img ? item.img[0].l_img : noimg}>
            <div className="main-image"></div>
            <div className="sub-images line">
              <div img={item.mainImage} className="sub nine-teen"></div>
              <div img={item.mainImage} className="sub eight-teen"></div>
              <div img={item.mainImage} className="sub eight-teen"></div>
              <div img={item.mainImage} className="sub nine-teen"></div>
              <div img={item.mainImage} className="sub "></div>
            </div>
          </ItemImages>

          <ItemInfo face={item.who}>
            <div className="title">{item.title}</div>
            <div className="expert line">
              <div className="who" />
              <div className="nick">{item.userName}</div>
            </div>

            <div className="price-and-rate line">
              <div className="price" style={{ marginRight: "35px" }}>{item.price}</div>
              <div className="rate line">{Star(item.rate)}({item.reviews || 0})</div>
            </div>

            {/* <div className="options">
              {/ * {item.options.map(opt => <Options key={opt} data={opt} />)} * /}
              <div className="combo-wrapper line">
                <div className="text">모양</div>
                <div className="box WIDTH360"></div>
              </div>
              <div className="combo-wrapper line">
                <div className="text">수량</div>
                <div className="box WIDTH178"></div>
              </div>
            </div> */}

            <div className="buttons line">
              <div className="button first">
                <div className="text">아이템구매</div></div>
              <div className="button second">
                <div className="text">관심항목추가</div></div>
            </div>
          </ItemInfo>
        </div>

        {/* very-variety-layout will be needed */}
        <div className="line">
          <div>
            <div className="line" style={{ marginTop: "110px" }}>
              <Detail mRight={101}>
                <div className="title">상품 상세설명</div>
                <div className="text">{item.detail}</div>
              </Detail>
              <Delivery mRight={102} style={{ background: "#EFEFEF", fontSize: "36px", fontWeight: "500", padding: "35px" }}>
                선택사항들어갈공간
                {/* <div className="title">배송정보</div>
                <div className="sub-title">제작기간</div>
                <div className="text">3~5일</div>
                <div className="sub-title">배송</div>
                <div className="text">택배배송(무료)</div>
                <div className="sub-title">반품</div>
                <div className="text">반품료는 5000원이며 반품시 택배 박스와 함께 현금을 동봉해주시기 바랍니다.</div> */}
              </Delivery>
            </div>
            <div style={{ marginTop: "95px" }}>
              <Board>
                <div className="title">디자인 의뢰 게시판</div>

                <div className="line" style={{ marginTop: "34px", }}>
                  <div className="input-wrapper">
                    <textarea />
                  </div>
                  <div className="button" >
                    <div className="text" >의뢰하기</div></div>
                </div>

                <div className="line first">
                  <div>천지는 맞어, 끓는 법을 곧 것이다</div>
                  <div style={{ marginLeft: "auto" }}>디자인 의뢰자</div>
                  <div style={{ marginLeft: "181px" }}>2020.01.01</div>
                </div>
                <div className="line element-reply">
                  <div> &#x0221F; [Re] 천지는 맞어, 끓는 법을 곧 것이다</div>
                  <div style={{ marginLeft: "auto" }}>디자인 의뢰자</div>
                  <div style={{ marginLeft: "181px" }}>2020.01.01</div>
                </div>
                <div className="line element">
                  <div>천지는 맞어, 끓는 법을 곧 것이다</div>
                  <div style={{ marginLeft: "auto" }}>디자인 의뢰자</div>
                  <div style={{ marginLeft: "181px" }}>2020.01.01</div>
                </div>
                <div className="line element-reply">
                  <div> &#x0221F; [Re] 천지는 맞어, 끓는 법을 곧 것이다</div>
                  <div style={{ marginLeft: "auto" }}>디자인 의뢰자</div>
                  <div style={{ marginLeft: "181px" }}>2020.01.01</div>
                </div>
                <div className="line element">
                  <div>천지는 맞어, 끓는 법을 곧 것이다</div>
                  <div style={{ marginLeft: "auto" }}>디자인 의뢰자</div>
                  <div style={{ marginLeft: "181px" }}>2020.01.01</div>
                </div>
                <div className="line element-reply">
                  <div> &#x0221F; [Re] 천지는 맞어, 끓는 법을 곧 것이다</div>
                  <div style={{ marginLeft: "auto" }}>디자인 의뢰자</div>
                  <div style={{ marginLeft: "181px" }}>2020.01.01</div>
                </div>
                <div className="line element">
                  <div>천지는 맞어, 끓는 법을 곧 것이다</div>
                  <div style={{ marginLeft: "auto" }}>디자인 의뢰자</div>
                  <div style={{ marginLeft: "181px" }}>2020.01.01</div>
                </div>
                <div className="line element-reply">
                  <div> &#x0221F; [Re] 천지는 맞어, 끓는 법을 곧 것이다</div>
                  <div style={{ marginLeft: "auto" }}>디자인 의뢰자</div>
                  <div style={{ marginLeft: "181px" }}>2020.01.01</div>
                </div>
                <div className="line element">
                  <div>천지는 맞어, 끓는 법을 곧 것이다</div>
                  <div style={{ marginLeft: "auto" }}>디자인 의뢰자</div>
                  <div style={{ marginLeft: "181px" }}>2020.01.01</div>
                </div>
                <div className="line element-reply">
                  <div> &#x0221F; [Re] 천지는 맞어, 끓는 법을 곧 것이다</div>
                  <div style={{ marginLeft: "auto" }}>디자인 의뢰자</div>
                  <div style={{ marginLeft: "181px" }}>2020.01.01</div>
                </div>

                <Page>
                  <div className="this number">1</div>
                  <div className="another number">2</div>
                  <div className="another number">3</div>
                  <div className="another number">4</div>
                  <div className="more">...</div>
                </Page>

              </Board>
            </div>
          </div>

          <div style={{ marginTop: "110px" }}>
            <Reviews>
              <div className="line">
                <div className="title">리뷰</div>
                <div className="rate">{Star(item.rate)}({item.reviews})</div>
              </div>
              <div className="line list-element">
                <div className="pics" />
                <div>
                  <div className="rate">{Star(4)}({30})</div>
                  <div className="comment">생각보다 튼튼하고 예쁩니다!</div>
                  <div className="nickname">fdnwodfowfdn</div>
                </div>
              </div>
              <Page>
                <div className="this number">1</div>
                <div className="another number">2</div>
                <div className="another number">3</div>
                <div className="another number">4</div>
                <div className="more">...</div>
              </Page>
            </Reviews>
          </div>
        </div>

        {/* item-detail */}
        <div className="line">
          {/* {item && item.is_project === 1 ? "project-view" : "blog-view"} */}
          <div style={{ padding: "45px", fontSize: "36px", fontFamily: "Noto Sans KR", fontWeight: "500", marginTop: "35px", borderRadius: "35px", width: "100%", background: "#EFEFEF", height: "350px" }}>
            아이템 내용 들어갈 공간
          </div>
          {/* ? <DesignDetailStepContainer design={item} {...this.state} /> */}
          {/* <DesignDetailViewContainer id={this.props.id} {...this.state} history={this.props.history} />} */}
        </div>
      </Wrapper>)
  }
}

export default ItemDetail;
