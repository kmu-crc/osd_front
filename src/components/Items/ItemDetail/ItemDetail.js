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
const empty = {
  title: "Lorem Ipsum", nickName: "fdnwodfowfdn", price: 18000, rate: 4, reviews: 30,
  options: [{ type: "combo", text: "모양", data: ["세모", "네모", "동그라미"] }],
  amount: 3000, who: "https://s3.ap-northeast-2.amazonaws.com/osd.uploads.com/thumbnails/1574308943657-x200.PNG",
  thumbnail: "",
  mainImage: "https://s3.ap-northeast-2.amazonaws.com/osd.uploads.com/thumbnails/1550043018657-x200.jpg",
  subImages: ["", "", "", "", ""],

  // variety section
  detail: "천지는 맺어, 끓는 밥을 곧 것이다. 영원히 고동을 불러 심장은 피가 봄바람을 인생에 있으랴? 불어 커다란 할지라도 부패를 인간의 생명을 이상, 불어 바로 것이다. 대고, 방황하였으며, 가치를 봄날의 인간이 가진 설산에서 운다. 있는 착목한는 그들의 노래하며 원질이 대한 아름다우냐? 같은 찬미를 붙잡아 청춘 힘차게 두기 갑 속잎나고, 소담스러운 것이다. 몸이 원질이 가슴이 피가 반짝이는 소리다.이것은 이상의 예가 피다. 그들을 할지니, 품었기 가치를 보배를 남는 지혜는 약동하다. 목숨이 일월과 동력은 가는 청춘의 사라지지 더운지라 가는 있음으로써 것이다. 가치를 웅대한 대한 새 피가 품에 소담스러운 그들에게 오직 듣는다. 찾아다녀도, 들어 그들은 피어나기 것이다. 착목한는 되려니와, 그와 타오르고 커다란 가는 위하여서. 물방아 얼마나 것이다.보라, 바로 얼마나 남는 위하여서, 봄바람이다. 얼마나 그림자는 얼음에 보이는 새가 보내는 것이다. 가슴에 인간의 두기 끝까지 무엇이 것은 그리하였는가? 보이는 천지는 주며, 듣는다. 이상, 몸이 곧 두기 커다란 이것을 그들에게 위하여서, 가슴에 보라. 무한한 돋고, 많이 가슴에 있는 사막이다. 힘차게 무엇을 능히 되는 가치를 이 거선의 남는 부패뿐이다. 소금이라 얼음 긴지라 품었기 과실이 굳세게 끓는 봄바람이다. 인간의 갑 별과 사라지지 품에 같지 사막이다. 소금이라 듣기만 설레는 심장은 있으며, 것은 위하여서, 그리하였는가? 그들을 그러므로 물방아 우리의 있을 얼음과 청춘의 장식하는 보라. 이것은 끝까지 기관과 가진 인류의 그들은 힘있다. 붙잡아 뛰노는 실로 피고 피에 그것을 황금시대다. 그들의 위하여, 그것을 힘있다. 봄바람을 구하기 가슴이 풍부하게 주며, 무엇을 인도하겠다는 없으면, 봄바람이다. 청춘 방황하여도, 산야에 영원히 그들은 간에 하는 위하여서, 아니다. 사는가 얼마나 그들은 부패를 못할 하여도 무엇을 것이다. 찾아다녀도, 피는 위하여 약동하다."
};
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
            <div className="title">{this.props.ProductDetail==null?item.title:this.props.ProductDetail.title}</div>
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
