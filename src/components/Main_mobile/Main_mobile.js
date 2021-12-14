import React, { Component } from "react";
import styled from "styled-components";
import TopDesignListContainer_mobile from "containers/Designs/TopDesignListContainer_mobile";
import TopGroupListContainer_mobile from "containers/Groups/TopGroupListContainer_mobile";
import MainMyDesignListContainer from "containers/Designs/MainMyDesignContainer";
import MainMyGroupListContainer from "containers/Groups/MainMyGroupContainer";
import opendesign_style from 'opendesign_style';

import new_logo_arrow_left from "source/new_logo_arrow_left.svg"
import new_logo_arrow_right from "source/new_logo_arrow_right.svg";
import new_logo_pause from "source/new_logo_pause.svg";

import new_banner_step1 from "source/new_banner_step1x.png";
import new_banner_step2 from "source/new_banner_step2x.png";
import new_banner_step3 from "source/new_banner_step3x.png";
import main_banner_1_button from "source/main-banner-1-button.png";
import main_banner_2_button from "source/main-banner-2-button.png";
import main_banner_3_button from "source/main-banner-3-button.png";
// import main_banner_3_button_ from "source/main-banner-3-button_.png";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Wrapper = styled.div`
  .hrline{
    width:100%;
    display:flex;
    justify-content:center;
    margin-top:6px;
    margin-bottom:8px;
    .line{
      width:195px;
      border-bottom:1px solid #707070;
    }
  }

`
const SliderBlank = styled.div`
  width:100%;
  height:360px;
`
const SliderWrapper = styled.div`
  position:absolute;
  width: ${window.innerWidth}px;
  height:360px;
  left: 0;
  top: 40;
  .slick-slider{
    height:360px;
  }
  .slick-list{
    height:360px;
  }
  .slick-track{
    height:360px;
  }
  .slick-dots{
    bottom:0px;
  }
`
const Banner = styled.div`
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

const ButtonOnImage = styled.div`
  position: absolute;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  cursor: pointer;
  z-index: 888;
  background-image: url(${props => props.src});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;

let settings = {
  infinite: true,
  speed: 2000,
  slidesToShow: 1,
  dots: true,
  autoplay: true,
  autoplaySpeed: 4000,
  slidesToScroll: 1,
  arrows: false,
  pauseOnHover: false,
};
export default class Main_mobile extends Component {
  constructor(props) {
    super(props);
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
  next = () => {
    if (this.slider) {
      this.slider.slickNext();
    }
  }
  prev = () => {
    if (this.slider) {
      this.slider.slickPrev();
    }
  }

  render() {
    const { w, h } = this.state;
    const width = w;
    const height = h;

    const widthScroll = (width > 1920 ? 1920 : width) - (this.props.menu ? 100 : 0) - 10;

    return (
      <React.Fragment>
        <Wrapper>
          <SliderWrapper>
            <Slider ref={slider => (this.slider = slider)} {...settings}>
              <Banner height={360} >
                <img src={new_banner_step2} />
                <ButtonOnImage
                  onClick={() => { window.location.href = "/designdetail/5344" }}
                  src={main_banner_2_button}
                  {...{
                    width: 300,//952 * width / 1920,
                    height: 150,//397 * height / 1080,
                    top: height - 516,//(1080 - 516) * (h / 1080),
                    left: width - 965,//(1920 - 965) * (w / 1920),
                  }}
                />
              </Banner>

              <Banner height={360} >
                <img src={new_banner_step1} />
                <ButtonOnImage
                  onClick={() => { window.location.href = "/designdetail/5157" }}
                  src={main_banner_1_button}
                  {...{
                    width: 300,
                    height: 120,
                    top: height - 500,//(h / 1080) * (1080 - 600),
                    left: width - 1000,// (w / 1920) * (1920 - 1000),
                  }}
                />
              </Banner>

              <Banner height={360}>
                <img src={new_banner_step3} />
                <ButtonOnImage
                  onClick={() => { window.location.href = "/designdetail/5343" }}
                  src={main_banner_3_button}
                  {...{
                    width: 300,
                    height: 130,
                    top: height - 540,
                    left: 50,
                  }}
                >
                  <div style={{
                    position: "absolute",
                    left: "123px", bottom: "0px",
                    padding: "0px",
                    width: "75px", height: "20px",
                    backgroundColor: "rgba(84,134,199,0.52)",
                    alignItems: "center", textAlign: "center",
                    color: "#fff", fontSize: "10px", fontFamily: "Spoqa Han Sans Neo", fontWeight: "700"
                  }}>자세히 보기</div>
                </ButtonOnImage>
              </Banner>
            </Slider>
          </SliderWrapper>
          <SliderBlank />

          <TopGroupListContainer_mobile width={widthScroll} />

          <div className="hrline">
            <div className="line" />
          </div>

          <TopDesignListContainer_mobile width={widthScroll} />

        </Wrapper>
      </React.Fragment>);
  }
}
{/* <React.Fragment>

<SliderWrapper width={width} height={height} >
  <NaviBox top={height - (98)} left={width - (158)}>
    <div className="arrow-prev" onClick={this.prev}></div>
    <div className="arrow-pause" onClick={this.gostop}></div>
    <div className="arrow-next" onClick={this.next}></div>
  </NaviBox>
  <Slider ref={slider => (this.slider = slider)} {...settings}>

    <Banner height={height} >
      <img src={new_banner_step2} />
      <ButtonOnImage
        onClick={() => { window.location.href = "/designdetail/5344" }}
        src={main_banner_2_button}
        {...{
          width: 870,//952 * width / 1920,
          height: 410,//397 * height / 1080,
          top: height - 516,//(1080 - 516) * (h / 1080),
          left: width - 965,//(1920 - 965) * (w / 1920),
        }}
      />
    </Banner>

    <Banner height={height} >
      <img src={new_banner_step1} />
      <ButtonOnImage
        onClick={() => { window.location.href = "/designdetail/5157" }}
        src={main_banner_1_button}
        {...{
          width: 952,
          height: 397,
          top: height - 500,//(h / 1080) * (1080 - 600),
          left: width - 1000,// (w / 1920) * (1920 - 1000),
        }}
      />
    </Banner>

    <Banner height={height}>
      <img src={new_banner_step3} />
      <ButtonOnImage
        onClick={() => { window.location.href = "/designdetail/5343" }}
        src={main_banner_3_button}
        {...{
          width: 884,
          height: 346,
          top: height - 490,
          left: 126,
        }}
      >
        <div style={{
          position: "absolute",
          left: "73px", bottom: "0px",
          padding: "0px",
          width: "208px", height: "55px",
          backgroundColor: "rgba(84,134,199,0.52)",
          alignItems: "center", textAlign: "center",
          color: "#fff", fontSize: "33px", lineHeight: "55px", fontFamily: "Spoqa Han Sans Neo", fontWeight: "700"
        }}>자세히 보기</div>
      </ButtonOnImage>
    </Banner>

  </Slider>
</SliderWrapper>

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

</React.Fragment> */}

// const ButtonOnImage = styled.div`
//   position: absolute;
//   // min-width: 1000px;
//   width: ${props => props.width}px;
//   height: ${props => props.height}px;
//   top: ${props => props.top}px;
//   left: ${props => props.left}px;
//   // bottom: ${props => props.bottom}px;
//   // right: ${props => props.right}px;
//   cursor: pointer;
//   z-index: 888;
//   background-image: url(${props => props.src});
//   background-position: center;
//   background-repeat: no-repeat;
//   background-size: contain;
//   // background-color: red;
//   // :hover {
//     // border: 1px dashed rgba(0,0,0,0.01);
//     // background-color: rgba(0,0,0,0.01);
//   // }

//   // img { max-width: 100%; max-height: 100vh; width: 100%; height: 100vh; object-fit: fit; } 
//   // debug
//   // border: 1px dashed red;
// `;
// const Banner = styled.div`
//   // width:100%;
//   // width: ${props => props.width}px;
//   height: ${props => props.height}px;
//   position: relative;
//   overflow-y: hidden;

//   img {
//     max-width: 100%;
//     max-height: 100%;
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//   }
// `;
// const Head = styled.div`
//   width: 100%;
//   max-width: 1920px;
//   // min-width: 1000px;
//   font-weight: bold;
//   font-size: 23px;
//   line-height: 34px;
//   font-family: Noto Sans KR;
//   color: ${opendesign_style.color.grayScale.scale7};
//   text-align: center;
//   // margin-top: 27px;
//   // margin-bottom: 27px;
//   padding-top: 27px;
//   padding-bottom: 27px;
// `;
// const ScrollListContainer = styled.div`
//   padding-left: 20px;
// `;
// const Wrapper2 = styled.div`
//   position: relative;
//   transform: translate( 0px, ${props => props.y + 90}px);
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
// `;
// let settings = {
//   className: "Banner",
//   infinite: true,
//   speed: 2000,
//   slidesToShow: 1,
//   dots: false,
//   autoplay: true,
//   autoplaySpeed: 4000,
//   slidesToScroll: 1,
//   arrows: true,
//   pauseOnHover:false,
// };

// const SliderWrapper = styled.div`
//   position: absolute;
//   width: ${props => props.width}px;
//   height: ${props => props.height}px;
//   background-color: #ECECEC;
//   left: 0;
//   top: 0;

//   overflow: hidden;

//   // pause button position
//   .pause {
//     max-width: 65px;
//     max-height: 65px;
//     width: 65px;
//     height: 65px;
//     position: absolute;
//     z-index: 1000 !important;
//     top: ${props => props.height - 130}px;
//     left: ${props => props.width * 0.94}px;
//     background-image: url(${new_logo_pause});
//     background-size: contain;
//     background-repeat: no-repeat;
//     cursor: pointer;
//   }

//   // previous, next arrow button position
//   .slick-list { 
//     width: ${props => props.width}px;
//   }
//   .slick-track {
//     overflow: hidden;
//   }
//   .slick-dots {
//     z-index: 888;
//     bottom: 50px;
//   }
// `;
// const NaviBox = styled.div`
//   width: 125px;
//   height: 64px;
//   position: absolute; 
//   z-index: 999 !important;
//   top: ${props => props.top}px;
//   left: ${props => props.left}px;
//   padding: 0;
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;

//   .arrow-prev {
//     width: 45px;
//     height: 45px;
//     background-image: url(${new_logo_arrow_left});
//     background-size: cover;
//     cursor: pointer;
//   }
//   .arrow-pause {
//     width: 35px;
//     height: 64px;
//     background-image: url(${new_logo_pause});
//     background-size: contain;
//     background-repeat: no-repeat;
//     cursor: pointer;
//   }
//   .arrow-next {
//     width: 45px;
//     height: 45px;
//     background-image: url(${new_logo_arrow_right});
//     background-size: cover;
//     cursor: pointer;
//   }

//   // debug
//   // border: 1px dashed black;
// `;
// const MainScrollWrapper = styled.div`
//   margin-top: ${props => props.marginTop}px;
//   width: ${props => props.width}px;
//   // debug
//   // border: 1px dashed #0ABCDF;
// `;
