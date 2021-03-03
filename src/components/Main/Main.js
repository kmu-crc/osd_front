import React, { Component } from "react";
import styled from "styled-components";
import MainSlide from "./Slide";
import ScrollTopDesignerContainer from "containers/Commons/ScrollTopDesignerContainer";
import ScrollTopProductContainer from "containers/Commons/ScrollTopProductContainer";

// CSS STYLE
const Margin = 1 / 3 * 45;
const MainContainer = styled.div`
`;
const Wrapper = styled.div`
  width: 100%;
`;
const Head = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-bottom:20px;
  width: max-content;
  text-align: left;
  font-weight: 500;
  font-size: 24px;
  font-family: Noto Sans KR;
  letter-spacing: 0;
  color: #060000;
  opacity: 1;
`;
const TextWrapper = styled.div`
  padding-top: ${Margin}px;

  margin-top:20px;
  margin-bottom:40px;
`;
class Main extends Component {
  render() {
    return (<MainContainer>

      <Wrapper>
        <MainSlide />
      </Wrapper>

      <Wrapper>
        <TextWrapper>
          <Head>인기 디자이너 | 메이커</Head>
        </TextWrapper>
        <ScrollTopDesignerContainer />
      </Wrapper>

      <Wrapper>
        <TextWrapper>
          <Head>인기 아이템</Head>
        </TextWrapper>
        <ScrollTopProductContainer />
      </Wrapper>

    </MainContainer>);
  }
}
export default Main;
