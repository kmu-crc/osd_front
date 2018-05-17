import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Grid, Icon } from "semantic-ui-react";
import designIs from "source/designIs.png";
import topDesign from "source/topDesign.png";
import topDesigner from "source/topDesigner.jpeg";
import topGroup from "source/topGroup.jpeg";
import myPage from "source/myPage.jpeg";


// css styling

const ImgWrapper = styled.div`
  background-color: #e1e1e1;
  width: 100%;
  height: 300px;
`;

const TextWrapper = styled.div`
  width: 100%;
  padding: 2rem 3rem 5rem;
  min-width: 660px;
  & .ui.grid {
    padding-bottom: 2rem;
  }
  & .ui.grid+.grid {
    margin-top: 3rem;
  }
`;

const InfoContainer = styled(Grid)`
  padding-bottom: 40px;
  & .info {
    padding: 20px 30px;
    font-size: 14px;
    background-image: url(${designIs});
  }
  & .info h4 {
    font-size: 24px;
    color: #fff;
    text-shadow: 0px 0px 3px #000;
  }
  & .info span {
    text-decoration: underline;
    font-size: 13px;
  }
  & .designIs {
    margin-left: auto;
    background-position: right;
  }
  & .groupIs {
    background-position: left;
  }
`;

const MotoContainer = styled(Grid)`
  text-align: center;
  & h4 {
    font-size: 16px;
  }
`;

const BestContainer = styled(Grid)`
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

const HowToUse = styled(Grid)`
& button {
  border: 1px solid #f00;
  background-color: #fff;
  padding: 7px 18px;
  color: #f00;
  border-radius: 3px;
}
`;


class Main extends Component {
  render(){
    return(
      <div>
        <ImgWrapper>
          여기에는 메인 이미지가 들어갑니다
        </ImgWrapper>
        <TextWrapper>
          <InfoContainer padded={true} devided="vertically">
            <Grid.Row columns={2}>
              <Grid.Column>
                <div className="designIs info">
                  <h4>디자인이란?</h4>
                  <p>오픈 디자인은 블로그형과 프로젝트형 디자인 공유를 지원합니다.</p>
                  <Link to=""><span>디자인 설명 더 보기</span></Link>
                </div>
              </Grid.Column>
              <Grid.Column>
                <div className="groupIs info">
                  <h4>그룹이란?</h4>
                  <p>그룹은 같은 성격의 디자인을 한 눈에 모아 볼 수 있는 기능입니다.</p>
                  <Link to=""><span>그룹 설명 더 보기</span></Link>
                </div>
              </Grid.Column>
            </Grid.Row>
          </InfoContainer>
          <MotoContainer padded={true} columns={3}>
            <Grid.Row>
              <Grid.Column className="moto">
                <Icon name="paint brush" color="red" size="huge"></Icon>
                <h4>오픈 디자인</h4>
                <p>
                오픈 디자인은 “쉬운 디자인, 함께하는 디자인”을 추구하는 웹 사이트입니다.
                누구나 쉽고 재미있게, 시간과 장소에 구애 받지 않고 함께 어울리며 디자인할 수 있는 환경을 만들고자 합니다.
                </p>
              </Grid.Column>
              <Grid.Column className="moto">
                <Icon name="retweet" color="red" size="huge"></Icon>
                <h4>쉬운 디자인</h4>
                <p>
                우리 사이트에서는 디자인이 쉬워집니다.
                기존의 디자인을 약간 수정하거나 보완하여 새로운 디자인을 만들고, 이를 다시 공유하는 디자인 공유 사이클이 활성화됩니다.
                간단한 디자인들을 조립하여 복잡한 디자인을 만들 수 있는 모듈형 디자인도 가능해집니다.
                </p>
              </Grid.Column>
              <Grid.Column className="moto">
                <Icon name="cubes" color="red" size="huge"></Icon>
                <h4>함께하는 디자인</h4>
                <p>
                우리 사이트에서는 디자인이 재미있어 집니다. 온라인 협업 디자인 환경을 제공하여 언제, 어디서나, 누구와도 함께
                어울리며 즐겁게 디자인을 경험하면서 배울 수 있습니다.
                </p>
              </Grid.Column>
            </Grid.Row>
          </MotoContainer>
          <BestContainer padded={true} columns={2}>
            <Grid.Row>
              <Grid.Column>
                <Link to="/design"><div className="best topDesign">인기 디자인</div></Link>
              </Grid.Column>
              <Grid.Column>
                <Link to="/designer"><div className="best topDesigner ">인기 디자이너</div></Link>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Link to="/group"><div className="best topGroup">추천 그룹</div></Link>
              </Grid.Column>
              <Grid.Column>
                <Link to="/myPage"><div className="best myInfo">나의 정보</div></Link>
              </Grid.Column>
            </Grid.Row>
          </BestContainer>
          <HowToUse container={true} textAlign="center">
            <h3>오픈디자인 서비스에 대해 더 궁금하신가요?</h3>
            <button>홍보 영상 보러가기</button>
          </HowToUse>
        </TextWrapper>
      </div>
    );
  }
}

export default Main;




