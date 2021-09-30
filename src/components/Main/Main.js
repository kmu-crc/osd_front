import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import TopDesignListContainer from "containers/Designs/TopDesignListContainer";
import TopGroupListContainer from "containers/Groups/TopGroupListContainer";
import MainMyDesignListContainer from "containers/Designs/MainMyDesignContainer";
import MainMyGroupListContainer from "containers/Groups/MainMyGroupContainer";
import opendesign_style from 'opendesign_style';

import new_logo_arrow_left from "source/new_logo_arrow_left.svg"
import new_logo_arrow_right from "source/new_logo_arrow_right.svg";
import new_logo_pause from "source/new_logo_pause.svg";

import new_banner_step1 from "source/new_banner_step1x.png";
import new_banner_step2 from "source/new_banner_step2x.png";
import main_banner_1_button from "source/main-banner-1-button.png";
import main_banner_2_button from "source/main-banner-2-button.png";

// import new_banner_upper01 from "source/new_banner_upper01.png";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Pause = styled.div`
  background-color: red;
  border: 2px dashed black;

  max-width: 34px;
  width: 34px;
  height: 64px;
  position: absolute;
  z-index: 999 !important;
  top: 968px;
  left: 94%;
  background-image: url(${new_logo_pause});
  background-size: cover;
  cursor: pointer;
`;
const ButtonOnImage = styled.div`
  position: absolute;
  min-width: 1000px;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  bottom: ${props => props.bottom}px;
  right: ${props => props.right}px;
  cursor: pointer;
  z-index: 888;
  background-image: url(${props => props.src});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  // background-color: red;
  // :hover {
    // border: 1px dashed rgba(0,0,0,0.01);
    // background-color: rgba(0,0,0,0.01);
  // }

  // img { max-width: 100%; max-height: 100vh; width: 100%; height: 100vh; object-fit: fit; } 
  // debug
  // border: 1px dashed black;
`;
const Banner = styled.div`
  // width:100%;
  // width: ${props => props.width}px;
  height: ${props => props.height}px;
  position: relative;
  overflow-y: hidden;

  img {
    max-width: 100%;
    max-height: 100%;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const Head = styled.div`
  width: 100%;
  max-width: 1920px;
  // min-width: 1000px;
  font-weight: bold;
  font-size: 23px;
  line-height: 34px;
  font-family: Noto Sans KR;
  color: ${opendesign_style.color.grayScale.scale7};
  text-align: center;
  // margin-top: 27px;
  // margin-bottom: 27px;
  padding-top: 27px;
  padding-bottom: 27px;
`;
const ScrollListContainer = styled.div`
  padding-left: 20px;
`;
const Wrapper2 = styled.div`
  position: relative;
  transform: translate( 0px, ${props => props.y + 90}px);
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
let settings = {
  className: "Banner",
  infinite: true,
  speed: 2000,
  slidesToShow: 1,
  dots: false,
  autoplay: true,
  autoplaySpeed: 4000,
  slidesToScroll: 1,
  arrows: true,
};

const TEST1 = styled.div`
  position: absolute;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  background-color: #ECECEC;
  left: 0;
  top: 0;

  overflow: hidden;

  // pause button position
  .pause {
    max-width: 65px;
    max-height: 65px;
    width: 65px;
    height: 65px;
    position: absolute;
    z-index: 1000 !important;
    top: ${props => props.height - 130}px;
    left: ${props => props.width * 0.94}px;
    background-image: url(${new_logo_pause});
    background-size: contain;
    background-repeat: no-repeat;
    cursor: pointer;
  }

  // previous, next arrow button position
  .slick-list { 
    width: ${props => props.width}px;
  }
  .slick-track {
    overflow: hidden;
  }
  .slick-dots {
    z-index: 888;
    bottom: 50px;
  }
  .slick-prev {
    position: absolute;
    z-index: 999 !important;
    top: ${props => props.height - 100}px;
    left: ${props => props.width * 0.908}px;
    background-image: url(${new_logo_arrow_left});
    background-size: cover;
    opacity: 1 !important;
  }
  .slick-next {
    position: absolute;
    z-index: 999 !important;
    top: ${props => props.height - 100}px;
    left: ${props => props.width * 0.965}px;
    background-image: url(${new_logo_arrow_right});
    background-size: cover;
  }
  .slick-next:hover, .slick-next:before {
    position: absolute;
    z-index: 999 !important;
    top: ${props => props.height - 100}px;
    left: ${props => props.width * 0.965}px;
    background-image: url(${new_logo_arrow_right});
    background-size: cover;
    opacity: 1;
  }
  .slick-prev:hover, .slick-prev:before {
    position: absolute;
    z-index: 999 !important;
    top: ${props => props.height - 100}px;
    left: ${props => props.width * 0.908}px;
    background-image: url(${new_logo_arrow_left});
    background-size: cover;
    opacity: 1 !important;
  }
  .slick-arrow {
    // border: 1px dashed red;
    width: 45px;
    height: 45px;
  }
`;
const MainScrollWrapper = styled.div`
  margin-top: ${props => props.marginTop}px;
  width: ${props => props.width}px;
  // border: 1px dashed #0ABCDF;
`;

export default class Main extends Component {
  constructor(props) {
    super(props);
    // this.state = { w: window.innerWidth > 1920 ? 1920 : window.innerWidth <= 1000 ? 1000 : window.innerWidth, play: true };
    this.state = {
      w: window.innerWidth < 1000 ? 1000 : window.innerWidth,
      h: window.innerHeight,
      play: true,
      button2: { width: 952, height: 397, bottom: 150, right: 100 },
    };
    this.handleResize = this.handleResize.bind(this);
  }
  componentDidMount() {
    window.addEventListener("resize", this.handleResize, false);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize, false);
  }
  handleResize = (event) => {
    // this.setState({ w: window.innerWidth > 1920 ? 1920 : window.innerWidth <= 1000 ? 1000 : window.innerWidth });
    this.setState({ w: window.innerWidth < 1000 ? 1000 : window.innerWidth, h: window.innerHeight });
  }
  gostop = () => {
    if (this.slider) {
      if (this.state.play) {
        //stop
        this.slider.slickPause();
      } else {
        //start
        this.slider.slickPlay();
      }
    }
    this.setState({ play: !this.state.play, });
  }

  render() {
    const { w, h } = this.state;
    const width = w;
    const height = h;
    // const ratioW = width / 1920;
    // const ratioH = height / 1080;

    const widthScroll = (width > 1920 ? 1920 : width) - (this.props.menu ? 100 : 0) - 10;

    return (<React.Fragment>

      <TEST1 width={width} height={height}>
        <div className="pause" onClick={this.gostop} />
        <Slider ref={slider => (this.slider = slider)} {...settings}>
          <Banner height={height} >
            <img src={new_banner_step1} />
            <a href={"/designdetail/5348"}>
              <ButtonOnImage src={main_banner_1_button} {...{ width: 952 * width / 1920, height: 397 * height / 1080, bottom: 272, right: 130 }} />
            </a>
          </Banner>

          <Banner height={height} >
            <img src={new_banner_step2} />
            <a href={"/designdetail/5344"}>
              <ButtonOnImage src={main_banner_2_button} {...{ width: 952 * width / 1920, height: 397 * height / 1080, bottom: 154, right: 85 }} />
            </a>
          </Banner>
        </Slider>
      </TEST1>

      <MainScrollWrapper width={widthScroll} marginTop={height}>
        <div style={{ marginLeft: "10px" }}>
          {this.props.userInfo != null
            ? <MainMyDesignListContainer width={widthScroll} Head={Head} />
            : null}

          {this.props.userInfo != null
            ? <MainMyGroupListContainer width={widthScroll} Head={Head} />
            : null}

          <TopGroupListContainer width={widthScroll} Head={Head} />

          <TopDesignListContainer width={widthScroll} Head={Head} />
        </div>
      </MainScrollWrapper>

    </React.Fragment>);
  }
}


