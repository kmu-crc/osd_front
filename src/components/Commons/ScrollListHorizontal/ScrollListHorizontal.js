import React, { Component } from "react";
import styled from "styled-components";
import { Icon } from "semantic-ui-react";

import StyleGuide from "StyleGuide";
import Open_img from "source/design_bg.jpg";
import Easy_img from "source/easy_bg2.jpg";
import Together_img from "source/together_bg.jpg";
import Carousel from 'react-leaf-carousel';


const SlideWrap = styled.div`
  width: 100%;
  height: 350px;
  overflow: hidden;
  position: relative;
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
    font-size: 26px;
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
    width: 100%;
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

class ScrollListHorizontal extends Component {
  constructor(props) {
    super(props);
    this.state = { hasMore: true, loading: false, scrollOffset: 500 };
    this.scrollHorizon = this.scrollHorizon.bind(this);
  };
  scrollHorizon(far) {
    document.getElementById("content").scrollLeft += far;
  };

  render() {
    const { ListComponent } = this.props;
    const List = this.props.getMore ? this.props.dataListAdded : this.props.dataList

    return (
      <SlideWrap id="content">
        <Carousel
        autoCycle={true}
        breakpoints={[
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ]}
    // dots={true}
    showSides={true}
    sidesOpacity={.5}
    sideSize={.1}
    slidesToScroll={6}
    slidesToShow={6}
    scrollOnDevice={true}
    cycleInterval={6000}
  >
        {/* {List.length > 6 ? <div className="arrow left" onClick={() => this.scrollHorizon(-1 * this.state.scrollOffset)}>
          <Icon name="caret left" size="big" /></div> : null}

        {List.length > 6 ? <div className="arrow right" onClick={() => this.scrollHorizon(1 * this.state.scrollOffset)}>
          <Icon name="caret right" size="big" /></div> : null} */}

        {List.length ? List.map((item, index) =>
        <Slide key={index}>
          {/* <div key={index} style={{ paddingRight: "10px", marginRight: "35px" }}> */}
            <ListComponent data={item} />
          {/* </div> */}
        </Slide>) : (
            <div style={{ marginLeft: "auto", marginRight: "auto" }}>노 데이타!</div>)}
            </Carousel>
      </SlideWrap>
    );
  }
}

export default ScrollListHorizontal;
