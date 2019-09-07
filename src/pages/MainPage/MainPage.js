import React, { Component } from 'react'
import banner from "source/tmp_main_banner.png"
import context from "source/context_banner.png"
import styled from 'styled-components'
import TopDesignListContainer from "containers/Designs/TopDesignListContainer"


const BannerWrapper = styled.div`
    background: url(${ banner});
    background-repeat: no-repeat;

    background-size: 100% 349.5px;
    margin-top: 15px;
    width: 100%;
    height: 349.5px;
`
const Context = styled.div`
    margin: auto;
    background: url(${ context});
    background-repeat: no-repeat;
    top: 40px;
    position: relative;
    background-size: 504px 196px;
    width: 504px;
    height: 196px;
`
// const LinkWrapper = styled.div`
//     margin: auto;
//     top: 85px;
//     position: relative;
//     width: 175px;
//     height: 29px;
//     border-bottom: solid 1.5px #F00;
//     a {
//         color: #F00;
//         font-size: 20px;
//         line-height: 29px;
//         font-family: "Noto Sans KR";
//         font-weight: 500;
//     }
// `
const Textwrapper = styled.div`
    cursor:default;
    float:center;
    margin-top: 60.5px;
    margin-bottom: 60px;
    text-align: center;
    font-size: 25px;
    font-family: "Noto Sans KR";
    line-height: 37px;
    font-weight: 700;
    color: #F00;
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
    return (<>
      <Banner />
      <Textwrapper>인기 디자인</Textwrapper>
      <TopDesignListContainer />
    </>)
  }
}

export default MainPage
