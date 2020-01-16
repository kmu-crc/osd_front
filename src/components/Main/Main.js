import React, { Component } from "react";
import styled from "styled-components";
import ContentBox from "components/Commons/ContentBox";
import StyleGuide from "StyleGuide";
import MainSlide from "./Slide";

import ScrollTopDesignerContainer from "containers/Commons/ScrollTopDesignerContainer";
import ScrollTopMakerContainer from "containers/Commons/ScrollTopMakerContainer";
import ScrollTopProductContainer from "containers/Commons/ScrollTopProductContainer";

// CSS STYLE
const ImgWrapper = styled.div``;
const TextWrapper = styled.div`
  // padding-bottom: 50px;
`;
const Content = styled(ContentBox)`
  @media only screen and (max-width: 991px) and (min-width: 768px){
    & .ui.grid>.row {
      margin-left: 6.25% !important;
    }
  }
`;
const Wrapper = styled.div`
  width: 100%;
  margin: 3rem 0;
`;
const Head = styled.div`
  color: ${StyleGuide.color.geyScale.scale7};
  font-size: ${StyleGuide.font.size.heading3};
  text-align: center;
  margin-bottom: 1rem;
`;

class Main extends Component {
  render() {
    return (
      <React.Fragment>
        <ImgWrapper>
          <MainSlide />
        </ImgWrapper>
        <Content>
          <Wrapper>
            <TextWrapper><Head>인기 디자이너</Head></TextWrapper>
            <ScrollTopDesignerContainer />
          </Wrapper>

          <Wrapper>
            <TextWrapper><Head>인기 메이커</Head></TextWrapper>
            <ScrollTopMakerContainer />
          </Wrapper>

          <Wrapper>
            <TextWrapper><Head>인기상품</Head></TextWrapper>
            <ScrollTopProductContainer />
          </Wrapper>
        </Content>
      </React.Fragment>
    );
  }
}
export default Main;
