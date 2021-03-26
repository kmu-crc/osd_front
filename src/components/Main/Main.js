import React, { Component } from "react";
import styled from "styled-components";
import ScrollTopDesignerContainer from "containers/Commons/ScrollTopDesignerContainer";
import ScrollTopProductContainer from "containers/Commons/ScrollTopProductContainer";
import SliderContainer from "containers/Commons/SliderContainer";
import market_style from "market_style";
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
  margin-bottom:10px;
  margin-top:${props=>props.marginTop+"px"};
  width: max-content;
  text-align: left;
  font-weight: 500;
  font-size: ${market_style.font.size.normal3};
  font-family: Noto Sans KR;
  letter-spacing: 0;
  color: #060000;
  opacity: 1;
`;
const TextWrapper = styled.div`
`;
class Main extends Component {
  render() {
    return (<MainContainer>

      <Wrapper>
        <SliderContainer />
      </Wrapper>

      <Wrapper>
        <TextWrapper>
          <Head marginTop={30}>인기 디자이너 | 메이커</Head>
        </TextWrapper>
        <ScrollTopDesignerContainer />
      </Wrapper>

      <Wrapper>
        <TextWrapper>
          <Head marginTop={30}>인기 아이템</Head>
        </TextWrapper>
        <ScrollTopProductContainer />
      </Wrapper>

    </MainContainer>);
  }
}
export default Main;
