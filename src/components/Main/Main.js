import React, { Component } from "react";
import styled from "styled-components";
import ScrollTopDesignerContainer from "containers/Commons/ScrollTopDesignerContainer";
import ScrollTopProductContainer from "containers/Commons/ScrollTopProductContainer";
import ScrollTopDesigner_mobile from "mobileComponents/ScrollTopDesigner_mobile";
import ScrollTopItem_mobile from "mobileComponents/ScrollTopItem_mobile";

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
  font-weight: 700;
  font-size: ${market_style.font.size.normal3};
  font-family: Noto Sans KR;
  letter-spacing: 0;
  color: #060000;
  opacity: 1;
`;
const Head_mobile = styled.div`
  width: max-content;
  text-align: left;
  font-weight: 700;
  font-size: ${market_style.font.size.normal3};
  margin-top:${props=>props.marginTop+"px"};
  margin-bottom:10px;
  margin-left:25px; 
  font-family: Noto Sans KR;
  letter-spacing: 0;
  color: #C1C1C1;
  opacity: 1;
`

class Main extends Component {
  render() {
    return (<MainContainer>

      {/* <Wrapper> */}
        <SliderContainer />
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
          <Wrapper>
            <Head_mobile marginTop={10}>
                    인기 디자이너&nbsp;
                    <span style={{fontSize:market_style.font.size.smal3}}>|</span>
                    &nbsp;메이커
              </Head_mobile>
            <ScrollTopDesigner_mobile/>
          </Wrapper>
          <Wrapper>
              <Head_mobile marginTop={20}>
                    인기 아이템
              </Head_mobile>
              <ScrollTopItem_mobile/>
          </Wrapper>
        </React.Fragment>
      }


    </MainContainer>
    );
  }
}
export default Main;
