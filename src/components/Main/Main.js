import React, { Component } from "react";
import styled from "styled-components";
import ContentBox from "components/Commons/ContentBox";
import opendesign_style from "opendesign_style";
import ScrollTopDesignContainer from "containers/Commons/ScrollTopDesignContainer";
import MainSlide from "./Slide";


// css styling

const ImgWrapper = styled.div`
`;

const TextWrapper = styled.div `
  padding-bottom: 50px;
`;

const Content = styled(ContentBox)`
@media only screen and (max-width: 991px) and (min-width: 768px){
  & .ui.grid>.row{
    margin-left: 6.25% !important;
  }
  }
`;

const Wrapper = styled.div`
  width: 100%;
  margin: 3rem 0;
`;

const Head = styled.div`
  color: ${opendesign_style.color.grayScale.scale7};
  font-size: ${opendesign_style.font.size.heading3};
  text-align: center;
  margin-bottom: 1rem;
`;


class Main extends Component {
  render() {
    return (
      <div>
        <ImgWrapper>
          <MainSlide/>
        </ImgWrapper>
        <TextWrapper>
          <Content>
            <Wrapper>
              <Head>추천 디자인</Head>
              <ScrollTopDesignContainer/>
            </Wrapper>
          </Content>
        </TextWrapper>
      </div>
    );
  }
}

export default Main;




