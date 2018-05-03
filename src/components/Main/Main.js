import React, { Component } from "react";
import styled from "styled-components";
import { Grid, Icon } from "semantic-ui-react";

const FullWrapper = styled.div`
  margin-top: 1rem;
`;

const ImgContainer = styled(Grid)`
`;

const InfoContainer = styled(Grid)`
`;

const MotoContainer = styled(Grid)`
  text-align: center;
  & h4 {
    font-size: 16px;
  }
`;

class Main extends Component {
  render(){
    return(
      <FullWrapper>
        <ImgContainer container={true} as="div">
          여기에는 이미지가 들어갑니다
        </ImgContainer>
        <InfoContainer padded={true} devided="vertically">
          <Grid.Row columns={2}>
            <Grid.Column>
              <h4>디자인이란?</h4>
            </Grid.Column>
            <Grid.Column>
              <h4>그룹이란?</h4>
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
      </FullWrapper>
    );
  }
}

export default Main;