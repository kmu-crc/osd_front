import React, { Component } from "react";
import hero1920 from "source/hero1920.png";
import hero1440 from "source/hero1440.png";
import hero360 from "source/hero360.png";
import context from "source/context_banner.png";
import styled from 'styled-components';
import TopDesignListContainer from "containers/Designs/TopDesignListContainer";
import TopGroupListContainer from "containers/Groups/TopGroupListContainer";
import MainMyDesignListContainer from "containers/Designs/MainMyDesignContainer";
import MainMyGroupListContainer from "containers/Groups/MainMyGroupContainer";
import opendesign_style from 'opendesign_style';

import new_banner_step1 from "source/new_banner_step1.png";
import new_banner_upper from "source/new_banner_upper.png";
const Banner= styled.div`
  width:100%;
  height:100%;
  .slider{
    width:100%;
    height:1080px;
    object-fit:cover;
  }
  .wrapper{
    position:absolute;
    top:560px;
    right:74px;
    margin-left:130px;
  }
  .detail{
    width:100%;
    height:333px;
    position:relative;
    object-fit:contain;
  }

  .button_detail{
    width:153px;
    height:55px;
    display:flex;
    justify-content:center;
    align-items:center;
    color:white;
    position:absolute;
    top:55%;
    right:4%;
  }
`

// const BannerWrapper = styled.div`
//   // width: ${props => props.width}px;
//   width:100%;
//   height: 349.5px;
//   margin-top: 15px;
//   margin-bottom: 25px;
//   background: url(${props => props.img});
//   background-repeat: no-repeat;
//   background-size: 100% 349.5px;
//   display:flex;
//   justify-content:center;
//   align-items:center;
//   @media only screen and (min-width : 1920){
//     width:1920px;
//   }
//   @media only screen and (min-width : 0px) and (max-width:1920px) {
//     background-size:cover;
//     background-position:center center;
//   }
//   @media only screen and (max-width : 480px){
//       margin-top:50px;
//       background-size:100%;
//       height:max-content;
//   }
// `;
// const Context = styled.div`
//   width: 504px;
//   height: 196px;
//   display:flex;
//   flex-direction:column;
//   align-items:center;
//   justify-content:center;
//   .red_label{
//     font-size:26px;
//     font: normal normal 900 26px/38px Noto Sans KR;
//     color:red;
//     text-align: center;
//   }
//   .black_label{
//     font: normal normal 18px/27px Noto Sans KR;
//     letter-spacing: 0px;
//     text-align: center;
//     font-size:18px;
//     color:#707070;
//     text-align: center;
//   }
//   @media only screen and (min-width : 0px) and (max-width:500px) {
//     width:100%;
//     background-size: contain;
//   }
// `;
// const Head = styled.div`
//   font: normal normal bold 23px/34px Noto Sans KR;
//   color: ${opendesign_style.color.grayScale.scale7};
//   // font-size: ${opendesign_style.font.size.heading2};
//   line-height: ${opendesign_style.font.size.heading2};
//   text-align: center;
//   margin-top: 27px;
//   margin-bottom: 27px;
// `;
// const ScrollListContainer = styled.div`
//     padding-left:20px;
// `;
export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { heroSize: 'l'/* l,m,s */, };
    this.handleResize = this.handleResize.bind(this);
  }
  componentDidMount() {
    window.addEventListener("resize", this.handleResize, false);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize, false);
  }
  handleResize = (event) => {
    if (window.innerWidth > 1440 && window.innerWidth <= 1920) {
      this.setState({ heroSize: 'l' });
    }
    if (window.innerWidth > 360 && window.innerWidth <= 1440) {
      this.setState({ heroSize: 'm' });
    };
    if (window.innerWidth > 0 && window.innerWidth <= 360) {
      this.setState({ heroSize: 's' });
    }
  }
  render() {
    const { heroSize } = this.state;
    return (
      <React.Fragment>
        <Banner slider={new_banner_step1}>
          <img src={new_banner_step1} className="slider" />
          <div className="wrapper">
            <img src={new_banner_upper} className="detail"/>
            <div className="button_detail"></div>
          </div>
        </Banner>
      </React.Fragment>
    )
  }
}

        {/* <BannerWrapper width={heroSize === 'l' ? 1920 : heroSize === 'm' ? 1440 : 360} img={heroSize === 'l' ? hero1920 : heroSize === 'm' ? hero1440 : hero360}>
          <Context>
          <div className="red_label">OPEN SOURCE DESIGN</div><br/><br/>
          <div className="black_label">오픈 소스 기반 플랫폼을 통해 다양한 사람들과 함께<br/>
          당신의 아이디어를 쉽게, 최고의 디자인으로 만들어 보세요.<br/><br/>
          당신의 아이디어가 최고가 되는 경험을 저희와 함께하세요!</div>
          </Context>
        </BannerWrapper>

        {this.props.userInfo
          ? <ScrollListContainer><MainMyDesignListContainer /></ScrollListContainer> : null}

        {this.props.userInfo
          ? <ScrollListContainer><MainMyGroupListContainer /></ScrollListContainer> : null}
        <Head>인기 그룹</Head>
        <ScrollListContainer>
        <TopGroupListContainer />
        </ScrollListContainer>
        <Head>인기 디자인</Head>
        <ScrollListContainer>
        <TopDesignListContainer />
        </ScrollListContainer> */}