import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Grid, Icon } from "semantic-ui-react";
import mainSlide from "source/mainSlide.jpg";
import topDesign from "source/topDesign.png";
import topDesigner from "source/topDesigner.jpeg";
import topGroup from "source/topGroup.jpeg";
import myPage from "source/myPage.jpeg";
import WhatIsDesign from "source/mainBg.jpg";
import WhatIsGroup from "source/mainBg2.jpg";
import ContentBox from "components/Commons/ContentBox";
import StyleGuide from "StyleGuide";


// css styling

const ImgWrapper = styled.div`
  background-image: url(${mainSlide});
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 400px;
  position: relative;
  &::after{
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    content: "";
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

const TextWrapper = styled(ContentBox) `
  padding-bottom: 50px;
`;

const GridRow = styled(Grid.Row) `
  padding: 50px 0 !important;
  & .column {
    margin-bottom: 2rem !important;
  }
`;

const InfoContainer = styled(GridRow) `
  & .info {
    font-size: 14px;
    width: 100%;
    height: 400px;
    background-image: url(${WhatIsDesign});
    background-size: cover;
    background-position: center;
    position: relative;
    .text-box {
      width: 100%;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      text-align: center;
    }
  }
  & .info h4 {
    font-size: ${StyleGuide.font.size.heading3};
    color: ${StyleGuide.color.main.basic};
    position: relative;
    &::after{
      content: "";
      display: block;
      width: 50px;
      border: 2px solid ${StyleGuide.color.main.basic};
      margin: 1rem auto;
      margin-bottom: 2rem;
      z-index: 1;
    }
  }
  & .info span {
    text-decoration: underline;
    font-size: ${StyleGuide.font.size.paragraph};
  }
  & a{
    font-weight: bold;
  }
  & .groupIs {
    /* background-image: url(${WhatIsGroup}); */
    h4 {
      color: ${StyleGuide.color.sub.purple.basic};
      &::after{
        border: 2px solid ${StyleGuide.color.sub.purple.basic};
    }
    }
  }
`;

const MotoContainer = styled(GridRow) `
  text-align: center;
  & i.icon{
    font-size: ${StyleGuide.font.size.heading2};
  }
  &>div{
    text-align: center !important;
  }
  & p{
    padding: 0 10px;
  }
  & h4 {
    font-size: ${StyleGuide.font.size.heading3};
  }
`;

const BestContainer = styled(GridRow) `
  & .column {
    margin-bottom: 2rem !important;
  }
  & .best {
    height: 200px;
    color: #fff;
    padding: 20px;
    font-size: 26px;
    text-shadow: 1px 0 4px #000;
    cursor: pointer;
    background-size: 100%;
  }
  & .best:hover {
    text-shadow: 3px 3px 8px #000;
    transition: 0.5s;
    opacity: 0.85;
  }
  & .best.topDesign {
    background-image: url(${topDesign});
    background-position: 50% 80%;
  }
  & .best.topDesigner {
    background-image: url(${topDesigner});
    background-position: 50% 30%;
  }
  & .best.topGroup {
    background-image: url(${topGroup});
    background-position: 50% 60%;
  }
  & .best.myInfo {
    background-image: url(${myPage});
    background-position: 50% 80%;
  }
  & .bestHeader {
    font-size : 20px;
    margin-top: 20px;
  }
`;

const HowToUse = styled(Grid) `
& button {
  display: block;
  border: 1px solid #f00;
  background-color: #fff;
  padding: 7px 18px;
  color: #f00;
  border-radius: 3px;
}
margin-bottom: 50px !important;
`;

const SliderBox = styled(ContentBox) `
  height: 100%;
`

const Slider = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  color: white;
`

const SliderContent = styled.div`
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  h1 {
    font-size: ${StyleGuide.font.size.heading1};
    margin-bottom: 1rem;
  }
  p{
    line-height: 1.4;
  }
`


class Main extends Component {
  render() {
    return (
      <div>
        <ImgWrapper>
          <SliderBox>
            <Slider>
              <SliderContent>
                <h1>
                  디자인이 쉬워진다.<br />
                  오픈디자인
                </h1>
                <p>오픈디자인과 함께라면 디자인이 쉬워집니다. <br />다른 디자이너의 디자인을 참고하여 나만의 디자인을 만들어 보세요.</p>
              </SliderContent>
            </Slider>
          </SliderBox>
        </ImgWrapper>
        <TextWrapper>
          <Grid padded={true} centered={true}>
            <InfoContainer>
              <Grid.Column mobile={16} tablet={16} computer={8}>
                <div className="designIs info">
                  <div className="text-box">
                    <h4>디자인이란?</h4>
                    <p>오픈 디자인은 블로그형과 프로젝트형 디자인 공유를 지원합니다.</p>
                    <Link to=""><span>디자인 설명 더 보기</span></Link>
                  </div>
                </div>
              </Grid.Column>
              <Grid.Column mobile={16} tablet={16} computer={8}>
                <div className="groupIs info">
                  <div className="text-box">
                    <h4>그룹이란?</h4>
                    <p>그룹은 같은 성격의 디자인을 한 눈에 모아 볼 수 있는 기능입니다.</p>
                    <Link to=""><span>그룹 설명 더 보기</span></Link>
                  </div>
                </div>
              </Grid.Column>
            </InfoContainer>
            <MotoContainer>
              <Grid.Column mobile={16} tablet={16} computer={5} className="moto">
                <Icon name="paint brush" color="red" size="huge"></Icon>
                <h4>오픈 디자인</h4>
                <p>
                  오픈 디자인은 “쉬운 디자인, 함께하는 디자인”을 추구하는 웹 사이트입니다.
                  누구나 쉽고 재미있게, 시간과 장소에 구애 받지 않고 함께 어울리며 디자인할 수 있는 환경을 만들고자 합니다.
                </p>
              </Grid.Column>
              <Grid.Column mobile={16} tablet={16} computer={5} className="moto">
                <Icon name="retweet" color="red" size="huge"></Icon>
                <h4>쉬운 디자인</h4>
                <p>
                  우리 사이트에서는 디자인이 쉬워집니다.
                  기존의 디자인을 약간 수정하거나 보완하여 새로운 디자인을 만들고, 이를 다시 공유하는 디자인 공유 사이클이 활성화됩니다.
                  간단한 디자인들을 조립하여 복잡한 디자인을 만들 수 있는 모듈형 디자인도 가능해집니다.
                </p>
              </Grid.Column>
              <Grid.Column mobile={16} tablet={16} computer={5} className="moto">
                <Icon name="cubes" color="red" size="huge"></Icon>
                <h4>함께하는 디자인</h4>
                <p>
                  우리 사이트에서는 디자인이 재미있어 집니다. 온라인 협업 디자인 환경을 제공하여 언제, 어디서나, 누구와도 함께
                  어울리며 즐겁게 디자인을 경험하면서 배울 수 있습니다.
                </p>
              </Grid.Column>
            </MotoContainer>
            <BestContainer>
              <Grid.Column mobile={16} tablet={16} computer={8}>
                <Link to="/design"><div className="best topDesign">인기 디자인</div></Link>
              </Grid.Column>
              <Grid.Column mobile={16} tablet={16} computer={8}>
                <Link to="/designer"><div className="best topDesigner ">인기 디자이너</div></Link>
              </Grid.Column>
              <Grid.Column mobile={16} tablet={16} computer={8}>
                <Link to="/group"><div className="best topGroup">추천 그룹</div></Link>
              </Grid.Column>
              <Grid.Column mobile={16} tablet={16} computer={8}>
                <Link to="/myPage"><div className="best myInfo">나의 정보</div></Link>
              </Grid.Column>
            </BestContainer>
          </Grid>
            <HowToUse textAlign="center">
              <Grid.Row>
                <h3>오픈디자인 서비스에 대해 더 궁금하신가요?</h3>
              </Grid.Row>
              <button>홍보 영상 보러가기</button>
            </HowToUse>
        </TextWrapper>
      </div>
    );
  }
}

export default Main;




