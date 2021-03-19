import React, { Component } from "react";
import styled from "styled-components";
import { Icon } from "semantic-ui-react";

import StyleGuide from "StyleGuide";
import Open_img from "source/design_bg.jpg";
import Easy_img from "source/easy_bg2.jpg";
import Together_img from "source/together_bg.jpg";
import Carousel from 'react-leaf-carousel';
import market_style from "market_style";
import arrow_new from "source/arrow_new.png";

const SlideWrap = styled.div`
  min-width: 1366px;
  height: 310px;
  overflow: hidden;
  position: relative;
  margin-bottom:15px;
  & .slider-wrapper ul {
    display: flex;
  }
  & .slider-wrapper li {
    min-width: 100%;
    height: 350px;
    overflow: hidden;
    position: relative;
    flex-direction: column;
    flex-flow: column;
  }
  & .carousel.carousel-slider .control-arrow {
    z-index: 10;
    top: 50%;
    position: absolute;
    color: #fff;
    font-size:${market_style.font.size.giant3};
    width: 80px;
    height: 80px;
    background: transparent;
    border: none;
    margin-top: -40px;
    &:before {
      margin: 0 5px;
      display: inline-block;
      border-top: 8px solid transparent;
      border-bottom: 8px solid transparent;
      content: "";
    }
  }
  & .carousel .control-next.control-arrow {
    right: 0;
    &:before {
      border-left: 8px solid #fff;
    }
  }
  & .carousel .control-prev.control-arrow {
    left: 0;
    &:before {
      border-right: 8px solid #fff;
    }
  }
  & .carousel .control-dots {
    position: absolute;
    bottom: 0;
    margin: 10px 0;
    text-align: center;
    width: 1366px;
    & li {
      box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.9);
      background: #fff;
      border-radius: 50%;
      width: 8px;
      height: 8px;
      cursor: pointer;
      display: inline-block;
      margin: 0 8px;
      transition: opacity 0.25s ease-in;
      opacity: 0.3;
    }
    & .dot.selected,
    & .dot:hover {
      opacity: 1;
    }
  }
  .InfiniteCarouselFrame{
    & ul{
    }
  }
`;
const Slide = styled.div`
  width: max-content;
  height: 350px;
  & > span {
    font-size: ${StyleGuide.font.size.heading1};
    position: absolute;
    font-weight: bold;
    color: #fff;
    top: 20%;
    left: 15%;
  }
  &.open {
    background-image: url(${Open_img});
    background-size: cover;
    background-position-y: 40%;
  }
  &.easy {
    background-image: url(${Easy_img});
    background-size: cover;
    background-position: 0 80%;
  }
  &.together {
    background-image: url(${Together_img});
    background-size: cover;
    background-position: 0 20%;
  }
  &.guide {
    background: #6ddb99; /* Old browsers */
    background: -moz-linear-gradient(
      top,
      #6ddb99 0%,
      #45b291 100%
    ); /* FF3.6-15 */
    background: -webkit-linear-gradient(
      top,
      #6ddb99 0%,
      #45b291 100%
    ); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(
      to bottom,
      #6ddb99 0%,
      #45b291 100%
    ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  }
`;
// CSS STYLE
const ScrollContainer = styled.div`
  padding: 5px 10px 10px 5px;
  height: 330px;
  display: flex;
  overflow-x: scroll;
  ::-webkit-scrollbar { display: none; };
  .arrow {
    position: absolute;
    width: 35px;
    height: 35px;
    display: none;
    margin-top: 125px;
    border-radius: 50%;
    background: #EFEFEF;
    border: 1px solid #EEEEEE;
    &.left {
      padding-top: 4px;
      margin-left: 7px;
    }
    &.right {
      padding-top: 4px;
      margin-left: ${1790 - 30}px;
    }
  }
  :hover {
    .arrow {
      display: block;
    }
  }
`;
const SliderBox = styled.div`
  width:100%;
  height:300px;
  overflow:hidden;
  position:relative;

  .wrapper_top{
    overflow-X:hidden;
    overflow-Y:hidden;
    scroll-behavior:smooth;
    height:100%;
    display:flex;
    .item{
      margin-right:25px;
    }
  }

    .left_gradient{
      position:absolute;
      left:0px;
      width:111px;
      height:338px;
      padding:143px 68px 124px 30px;
      background: transparent linear-gradient(-90deg, #FFFFFF00 0%, #FFFFFFC3 73%, #FFFFFF 100%) 0% 0% no-repeat padding-box;
      .arrow{
        z-index:999;
        width:13px;
        height:70px;
        background:url(${arrow_new});
        background-size:cover;
        transform:rotate(-180deg);
        cursor:pointer;
      }
    }
    .right_gradient{
      position:absolute;
      right:0px;
      width:111px;
      height:300px;
      padding:143px 30px 124px 68px;
      background: transparent linear-gradient(90deg, #FFFFFF00 0%, #FFFFFFC3 70%, #FFFFFF 100%) 0% 0% no-repeat padding-box;
      .arrow{
        z-index:999;
        width:13px;
        height:70px;
        background:url(${arrow_new});
        background-size:cover;
        cursor:pointer;
      }
    }
`
class ScrollListHorizontal extends Component {
  constructor(props) {
    super(props);
    this.state = { L_handler:false,R_handler:true,hasMore: true, loading: false, scrollOffset: 500 };
    this.onClickArrow = this.onClickArrow.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  };
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll, true);
  }
  componentDidMount() {
      window.addEventListener("scroll", this.handleScroll, true);
  }
  async handleScroll(event) {

    if(event.target.id=="wrapper_top"){
      console.log(document.getElementById("wrapper_top").scrollLeft,document.getElementById("wrapper_top").scrollWidth-1366);
      document.getElementById("wrapper_top").scrollLeft>5?await this.setState({L_handler:true}):await this.setState({L_handler:false});
      document.getElementById("wrapper_top").scrollLeft<document.getElementById("wrapper_top").scrollWidth-1366
      ?await this.setState({R_handler:true}):await this.setState({R_handler:false});
    }
  }
  onClickArrow=async (far)=>{
    document.getElementById("wrapper_top").scrollLeft+=far;
  }
  render() {
    const { ListComponent } = this.props;
    const List = this.props.getMore ? this.props.dataListAdded : this.props.dataList
    return (
      <SliderBox>
        {
          this.state.L_handler?
          <div className="left_gradient">
            <div className="arrow" onClick={()=>this.onClickArrow(-1000)}></div>
          </div>
          :null
        }
        {
          this.state.R_handler?
          <div className="right_gradient">
            <div className="arrow" onClick={()=>this.onClickArrow(1000)}></div>
          </div>
          :null
        }


        

        <div id="wrapper_top" className="wrapper_top">
        {
          List.map((item,index)=>{
            return(
            <div className="item">
              <ListComponent data={item} />
            </div>
            )
          })
        }
        </div>
      </SliderBox>
  //     <SlideWrap id="content">
  //       <Carousel
  //       autoCycle={false}
  //       breakpoints={[
  //     {
  //       breakpoint: 500,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //       },
  //     },
  //     {
  //       breakpoint: 768,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //       },
  //     },
  //   ]}
  //   showSides={true}
  //   sidesOpacity={.5}
  //   sideSize={-0.5}
  //   slidesToScroll={4}
  //   slidesToShow={6}
  //   scrollOnDevice={true}
  //   cycleInterval={6000}
  // >
  //       {List.length ? List.map((item, index) =>
  //       <Slide key={index}>
  //           <ListComponent data={item} />
  //       </Slide>) : (
  //           <div style={{ marginLeft: "auto", marginRight: "auto" }}>노 데이타!</div>)}
  //           </Carousel>
  //     </SlideWrap>
    );
  }
}

export default ScrollListHorizontal;
