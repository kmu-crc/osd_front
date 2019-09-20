import React, { Component } from 'react';
import banner from "source/tmp_main_banner.png";
import context from "source/context_banner.png";
import styled from 'styled-components';
import TopDesignListContainer from "containers/Designs/TopDesignListContainer";

const BannerWrapper = styled.div`
  width: 100%;
  height: 349.5px;
  margin-top: 15px;
  background: url(${banner});
  background-repeat: no-repeat;
  background-size: 100% 349.5px;
`
const Context = styled.div`
  width: 504px;
  height: 196px;
  top: 40px;
  position: relative;
  background: url(${context});
  background-repeat: no-repeat;
  background-size: 504px 196px;
  margin: auto;
`
const Textwrapper = styled.div`
  float: center;
  margin-top: 60.5px;
  margin-bottom: 60px;
  text-align: center;
  font-size: 25px;
  font-family: Noto Sans KR;
  font-weight: 700;
  line-height: 37px;
  color: #FF0000;
  cursor: default;
`

function Banner() {
  return (<BannerWrapper>
    <Context />
    {/* <LinkWrapper>
      <a href="/tour">이용 가이드 보러가기</a>
    </LinkWrapper> */}
  </BannerWrapper>)
}

class MainPage extends Component {
  render() {
    return (<React.Fragment>
      <Banner />
      <Textwrapper>인기 디자인</Textwrapper>
      <TopDesignListContainer />
    </React.Fragment>)
  }
}

export default MainPage;
