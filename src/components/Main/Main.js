import React, { Component } from "react";
import styled from "styled-components";
import ScrollTopDesignerContainer from "containers/Commons/ScrollTopDesignerContainer";
import ScrollTopProductContainer from "containers/Commons/ScrollTopProductContainer";
import ScrollTopDesigner_mobile from "mobileComponents/ScrollTopDesigner_mobile";
import ScrollTopItem_mobile from "mobileComponents/ScrollTopItem_mobile";

import SliderContainer from "containers/Commons/SliderContainer";
import market_style from "market_style";

import arrow_right from "source/arrow_right_new.svg"

// CSS STYLE
const Margin = 1 / 3 * 45;
const MainContainer = styled.div`
  // width:${window.innerWidth}px;
`;
const Mobile_Wrapper = styled.div`
// border:1px solid black;
  width:375px;
  margin:0px auto;
  padding-left:10px;
`
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
  font-weight: 700;
  font-size: ${market_style.font.size.normal3};
  font-family: Noto Sans KR;
  letter-spacing: 0;
  color: #060000;
  opacity: 1;
`;
const Head_mobile = styled.div`

  width: 100%;
  text-align: left;
  font-weight: 700;
  font-size: ${market_style.font.size.normal3};
  margin-top:${props=>props.marginTop+"px"};
  margin-bottom:10px;
  font-family: Noto Sans KR;
  letter-spacing: 0;
  color: #C1C1C1;
  opacity: 1;
  display:flex;
  justify-content:space-between;
  align-items:flex-end;
  .seeall{
    width:max-content;
    font-size:${market_style.font.size.mini2};
    color:#707070;
    display:flex;
    align-items:center;
    height:19px;
  }
  .arrow{
    background-image:url(${arrow_right});
    background-size:contain;
    width:6px;
    height:10px;
    margin-right:10px;
  }
`

class Main extends Component {
  render() {
    return (<MainContainer>

      {/* <Wrapper> */}
      {
        window.innerWidth>=500?
        <Wrapper>
          <SliderContainer />
        </Wrapper>
        :
        <Wrapper>
          <SliderContainer />
      </Wrapper>
      }

      {/* </Wrapper> */}
      {
        window.innerWidth>=500?
        <React.Fragment>
                <Wrapper>
                  <Head marginTop={20}>인기 디자이너&nbsp;
                  <span style={{fontSize:market_style.font.size.smal3}}>|</span>
                  &nbsp;메이커</Head>
                <ScrollTopDesignerContainer />
              </Wrapper>

              <Wrapper>
                <Head marginTop={10}>인기 아이템</Head>
                <ScrollTopProductContainer />
              </Wrapper>
        </React.Fragment>
        :
        <React.Fragment>
          <Mobile_Wrapper>
            <Head_mobile marginTop={10}>
                    <div>
                    인기 디자이너&nbsp;
                    <span style={{fontSize:market_style.font.size.smal3}}>|</span>
                    &nbsp;메이커
                    </div>
                    <div onClick={()=>{window.location.href="/designer"}} className="seeall">전체보기&nbsp;<div className="arrow"/></div>
              </Head_mobile>
            <ScrollTopDesigner_mobile/>
          </Mobile_Wrapper>
          <Mobile_Wrapper>
              <Head_mobile marginTop={15}>
                    <div>
                    인기 아이템
                    </div>
                    <div onClick={()=>{window.location.href="/product"}} className="seeall">전체보기&nbsp;<div className="arrow"/></div>

              </Head_mobile>
              <ScrollTopItem_mobile/>
          </Mobile_Wrapper>
        </React.Fragment>
      }


    </MainContainer>
    );
  }
}
export default Main;
