import React, { Component } from "react";
import styled from "styled-components";
import MainSlide from "./Slide";
import ScrollTopDesignerContainer from "containers/Commons/ScrollTopDesignerContainer";
import ScrollTopProductContainer from "containers/Commons/ScrollTopProductContainer";
// import StyleGuide from "StyleGuide";
// import ScrollTopMakerContainer from "containers/Commons/ScrollTopMakerContainer";
// import ContentBox from "components/Commons/ContentBox";

// CSS STYLE
const MainContainer = styled.div`
  margin-top: 31px;
`;
const ImgWrapper = styled.div``;
const Wrapper = styled.div`
  width: 100%;
  margin-top: ${props => props.top || 50}px;
`;
const Head = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: max-content;
  text-align: left;
  font-weight: 500;
  font-size: 20px;
  line-height: 29px;
  font-family: Noto Sans KR;
  letter-spacing: 0;
  color: #060000;
  opacity: 1;
`;
const TextWrapper = styled.div`
  padding-bottom: 30px;
`;
class Main extends Component {
  render() {
    return (
      <MainContainer>
        <ImgWrapper>
          <MainSlide />
        </ImgWrapper>
        <Wrapper>
          <TextWrapper>
            <Head>인기 디자이너 / 메이커</Head></TextWrapper>
          <ScrollTopDesignerContainer />
        </Wrapper>
        <Wrapper top={77}>
          <TextWrapper><Head>인기 아이템</Head></TextWrapper>
          <ScrollTopProductContainer />
        </Wrapper>
      </MainContainer>
    );
  }
}
export default Main;
