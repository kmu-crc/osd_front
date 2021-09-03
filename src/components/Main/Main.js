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

import new_logo_arrow_left from "source/new_logo_arrow_left.svg"
import new_logo_arrow_right from "source/new_logo_arrow_right.svg";
import new_logo_pause from "source/new_logo_pause.svg";

import new_banner_step1 from "source/new_banner_step1.png";
import new_banner_step2 from "source/new_banner_step2.png";
import new_banner_upper01 from "source/new_banner_upper01.png";
import { Settings } from "material-ui-icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Fade from 'react-reveal/Fade';
const MainList = styled.div`
  padding-left:100px;
  width:100%;
  overflow:hidden;
  .list_wrap{
    
  }
`
const Wrapper= styled.div`
  position:relative;
  overflow:hidden;
  .slick-track{
    overflow:hidden;
  }
  .slick-dots{
    z-index:888;
    bottom:50px;
  }
  .slick-prev{
    position:absolute;
    z-index:999 !important;
    top:991px;
    left:1761px;
    background-image:url(${new_logo_arrow_left});
    background-size:cover;
    opacity:1 !important;
  }
  .pause{
    max-width:34px;
    width:34px;
    height:64px;
    position:absolute;
    z-index:999 !important;
    top:961px;
    left:1807px;
    background-image:url(${new_logo_pause});
    background-size:cover;
    cursor:pointer;
  }
  .slick-next{
    position:absolute;
    z-index:999 !important;
    top:991px;
    left:1841px;
    background-image:url(${new_logo_arrow_right});
    background-size:cover;
  }
  .slick-next:hover, .slick-next:before{
    position:absolute;
    z-index:999 !important;
    top:991px;
    left:1841px;
    background-image:url(${new_logo_arrow_right});
    background-size:cover;
    opacity:1;
  }
  .slick-prev:hover, .slick-prev:before{
    position:absolute;
    z-index:999 !important;
    top:991px;
    left:1761px;
    background-image:url(${new_logo_arrow_left});
    background-size:cover;
    opacity:1 !important;
  }

  .slick-arrow{
    width:45px;
    height:45px;
  }
  .slick-arrow:before{
    opacity:0;
  }
  // .slick-arrow:hover{
  //   color:rgba(0,0,0,0);
  // }
`
const Banner= styled.div`
  width:100%;
  height:1080px;
  position:relative;
  overflow-y:hidden;
  .slider_{
    overflow:hidden;
    width:100%;
    height:1080px;
    object-fit:cover;
  }
  .banner_button1{
    width:285px;
    height:51px;
  }
  .banner_button2{
    border: 1px solid #FFFFFF;
    font-size:25px;
    font-family:SpoqaHanSans,Lignt;
    color:white;
    width:232px;
    height:55px;
    display:flex;
    justify-content:center;
    align-items:center;
    background-color:rgba(0,0,0,0.5);
  }
  .wrapper_{
    position:absolute;
    z-index:888;
  }
  .detail{
    width:286px%;
    height:51px;
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
const Head = styled.div`
  font: normal normal bold 23px/34px Noto Sans KR;
  color: ${opendesign_style.color.grayScale.scale7};
  // font-size: ${opendesign_style.font.size.heading2};
  line-height: ${opendesign_style.font.size.heading2};
  text-align: center;
  margin-top: 27px;
  margin-bottom: 27px;
`;
const ScrollListContainer = styled.div`
    padding-left:20px;
`;
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
let settings = { 
  className:"slide",
  infinite: true, 
  speed: 2000, 
  slidesToShow: 1, 
  dots:false,
  autoplay:true,
  autoplaySpeed:4000,
  slidesToScroll: 1 ,
  arrows:true,
};
export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { heroSize: 'l'/* l,m,s */, play:true};
    this.handleResize = this.handleResize.bind(this);
  }
  componentDidMount() {
    window.addEventListener("resize", this.handleResize, false);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize, false);
  }
  handleResize = (event) => {
    if (window.innerWidth > 1920 ) {
      this.setState({ heroSize: 'l' });
    }
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
      <Wrapper>
        <Fade>
        <Slider ref={slider => (this.slider = slider)} {...settings}>
        <Banner>
        <img src={new_banner_step1} className="slider_" />
          <div className="wrapper_" style={{top:"865px",left:"1342px"}}>
            <img src={new_banner_upper01} className="banner_button1"/>
          </div>
        </Banner>
        <Banner slider={new_banner_step2}>
          <img src={new_banner_step2} className="slider_" />
          <div className="wrapper_" style={{top:"785px",left:"1144px"}}>
          <div className="banner_button2">프로젝트 자세히 보기</div>
          </div>
        </Banner> 
        </Slider>
        </Fade>
        <div className="pause"
             onClick={()=>{
               !this.state.play == true?
               this.slider.slickPlay()
               :
               this.slider.slickPause();
               this.setState({
                 play:!this.state.play,
               });
             }}
        />
      </Wrapper>
      {/* <MainList>
      <div className="list_wrap">
      <Fade cascade>
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
        </ScrollListContainer>
        </Fade>
      </div>
      </MainList> */}
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