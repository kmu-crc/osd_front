import React, { Component } from 'react';
import styled from "styled-components";
import { Carousel } from 'react-responsive-carousel';
import StyleGuide from "StyleGuide";
import Open_img from "source/design_bg.jpg";
import Easy_img from "source/easy_bg2.jpg";
import Together_img from "source/together_bg.jpg";

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
      box-shadow: 1px 1px 2px rgba(0,0,0,.9);
      background: #fff;
      border-radius: 50%;
      width: 8px;
      height: 8px;
      cursor: pointer;
      display: inline-block;
      margin: 0 8px;
      transition: opacity .25s ease-in;
      opacity: .3;
    }
    & .dot.selected, & .dot:hover{
      opacity: 1;
    }
  }
`;

const Slide = styled.div`
  width: 100%;
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
`;

export default class MainSlide extends Component {
  render() {
    return (
      <SlideWrap>
        <Carousel autoPlay
                  showArrows={true}
                  stopOnHover={false}
                  showIndicators={true}
                  axis="horizontal"
                  transitionTime={1000}
                  interval={10000}
                  width="100%"
                  infiniteLoop={true}
                  showThumbs={false}>
          <Slide className="open">
            <span>오픈 디자인</span>
          </Slide>
          <Slide className="easy">
            <span>쉬운 디자인</span>
          </Slide>
          <Slide className="together">
            <span>함께하는 디자인</span>
          </Slide>
        </Carousel>
      </SlideWrap>
    );
  }
};
