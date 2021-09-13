import React, { Component } from "react";
import styled from 'styled-components';
import TopDesignListContainer from "containers/Designs/TopDesignListContainer";
import TopGroupListContainer from "containers/Groups/TopGroupListContainer";
import MainMyDesignListContainer from "containers/Designs/MainMyDesignContainer";
import MainMyGroupListContainer from "containers/Groups/MainMyGroupContainer";
import opendesign_style from 'opendesign_style';

import new_logo_arrow_left from "source/new_logo_arrow_left.svg"
import new_logo_arrow_right from "source/new_logo_arrow_right.svg";
import new_logo_pause from "source/new_logo_pause.svg";

import new_banner_step1 from "source/new_banner_step1-1.png";
import new_banner_step2 from "source/new_banner_step2-1.png";

import new_banner_upper01 from "source/new_banner_upper01.png";

import { Settings } from "material-ui-icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Fade from 'react-reveal/Fade';

const MainList = styled.div`
  // padding-left:100px;
  width: ${props => props.w}px;
  min-width: 1000px;
  max-width: 1920px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  // .list_wrap{
  //   max-width: 1920px;
  //   width: 100%;
  // }
`
const Wrapper = styled.div`
  // max-width: 1920px;
  // min-width: 1000px;
  width: 100%;
  position:relative !important;
  overflow: hidden;

  transform: translate( 0px, -100px);
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
    top:1001px;
    left:91.8%;
    background-image:url(${new_logo_arrow_left});
    background-size:cover;
    opacity:1 !important;
  }
  .pause{
    max-width: 34px;
    width: 34px;
    height: 64px;
    position: absolute;
    z-index:999 !important;
    top: 968px;
    left: 94%;
    background-image:url(${new_logo_pause});
    background-size:cover;
    cursor: pointer;
  }
  .slick-next{
    position:absolute;
    z-index:999 !important;
    top:1001px;
    left:95.5%;
    background-image:url(${new_logo_arrow_right});
    background-size:cover;
  }
  .slick-next:hover, .slick-next:before{
    position:absolute;
    z-index:999 !important;
    top:1001px;
    left:95.5%;
    background-image:url(${new_logo_arrow_right});
    background-size:cover;
    opacity:1;
  }
  .slick-prev:hover, .slick-prev:before{
    position:absolute;
    z-index:999 !important;
    top:1001px;
    left:91.8%;
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
`;
const ButtonOnImage = styled.div`
  position: absolute;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  bottom: ${props => props.bottom}px;
  right: ${props => props.right}px;
  cursor: pointer;
  z-index: 888;
`;
const Banner = styled.div`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  position: relative;
  overflow-y: hidden;

  img {
    max-width: 100%;
    max-height: 100%;
    width: 100%;
    height: 100%;
    object-fit: fill;
    max-width: 100%;
    max-height: 100%;
  }
`;
const Head = styled.div`
  width: 100%;
  max-width: 1920px;
  min-width: 1000px;
  font-weight: bold;
  font-size: 23px;
  line-height: 34px;
  font-family: Noto Sans KR;
  color: ${opendesign_style.color.grayScale.scale7};
  text-align: center;
  margin-top: 27px;
  margin-bottom: 27px;
`;
const ScrollListContainer = styled.div`
    padding-left:100px;
    display:flex;
    flex-wrap:wrap;
    justify-content:center;
`;

let settings = {
  className: "slide",
  infinite: true,
  speed: 2000,
  slidesToShow: 1,
  dots: false,
  autoplay: true,
  autoplaySpeed: 4000,
  slidesToScroll: 1,
  arrows: true,
};
export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { w: window.innerWidth > 1920 ? 1920 : window.innerWidth, play: true };
    this.handleResize = this.handleResize.bind(this);
  }
  componentDidMount() {
    window.addEventListener("resize", this.handleResize, false);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize, false);
  }
  handleResize = (event) => {
    this.setState({ w: window.innerWidth > 1920 ? 1920 : window.innerWidth });
  }
  gostop = () => {
    this.state.play == true
      ? this.slider.slickPause()
      : this.slider.slickPlay();
    this.setState({
      play: !this.state.play,
    });
  }
  render() {
    const { w } = this.state;
    const width = w;
    const height = width * (1 / 1.76);
    const ratioW = width / 1920;
    const ratioH = height / 1080;

    return (<React.Fragment>
      {/* banner */}
      <Wrapper>
        <Fade>
          <Slider ref={slider => (this.slider = slider)} {...settings}>
            <Banner width={1920 * ratioW} height={1080 * ratioH} >
              <img src={new_banner_step1} />
              <a onclick={() => window.location.href = "/designerdetail/1488"}>
                <ButtonOnImage width={285 * ratioW} height={51 * ratioH} bottom={164 * ratioH} right={293 * ratioW} />
              </a>
            </Banner>

            <Banner slider={new_banner_step2} width={1920 * ratioW} height={1080 * ratioH} >
              <img src={new_banner_step2} />
              <a onclick={() => window.location.href = "/designerdetail/1488"}>
                <ButtonOnImage width={232 * ratioW} height={55 * ratioH} bottom={240 * ratioH} right={544 * ratioW} />
              </a>
            </Banner>

          </Slider>
        </Fade>
        <div className="pause"
          onClick={() => this.gostop} />
      </Wrapper>

      {/* scroll-list */}
      <MainList w={w}>
        {(this.props && this.props.userInfo != null)
          ? <>
            <ScrollListContainer> <MainMyDesignListContainer /> </ScrollListContainer>
            <ScrollListContainer> <MainMyGroupListContainer /> </ScrollListContainer>
          </>
          : null}

        <Head>인기 그룹</Head>
        <ScrollListContainer>
          <TopGroupListContainer />
        </ScrollListContainer>

        <Head>인기 디자인</Head>
        <ScrollListContainer>
          <TopDesignListContainer />
        </ScrollListContainer>

      </MainList>


    </React.Fragment >
    )
  }
}

