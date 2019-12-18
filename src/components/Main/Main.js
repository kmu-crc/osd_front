import React, { Component } from "react";
import styled from "styled-components";
import ContentBox from "components/Commons/ContentBox";
import StyleGuide from "StyleGuide";
import ScrollTopDesignContainer from "containers/Commons/ScrollTopDesignContainer";
// import ScrollRecentlyViewedContainer from "containers/Commons/ScrollRecentlyViewedContainer";
import MainSlide from "./Slide";

// CSS STYLE
const ImgWrapper = styled.div``;
const TextWrapper = styled.div`
  padding-bottom: 50px;
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
        <TextWrapper>
          <Content>
            <Wrapper>
              <Head>인기상품</Head>
              <ScrollTopDesignContainer />
            </Wrapper>
            {this.props.userInfo &&
              <Wrapper>
                <Head>최근 본 상품</Head>
                <ScrollTopDesignContainer />
              </Wrapper>}
          </Content>
        </TextWrapper>
      </React.Fragment>
    );
  }
}

export default Main;




