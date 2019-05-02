import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Carousel } from "react-responsive-carousel";
import StyleGuide from "StyleGuide";
import Open_img from "source/design_bg.jpg";
import Easy_img from "source/easy_bg2.jpg";
import Together_img from "source/together_bg.jpg";
import ContentBox from "components/Commons/ContentBox";

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

const Wrap = styled(ContentBox)`
  position: relative;
  height: 100%;
`;

const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  color: white;
  .title {
    color: white;
    font-size: ${StyleGuide.font.size.heading1};
    margin-bottom: 1rem;
  }
  p {
    margin-bottom: 1rem;
  }
`;

const LinkBtn = styled(Link)`
  display: inline-block;
  box-sizing: border-box;
  padding: 0.5rem 2rem;
  border: 1px solid white;
  color: white;
  border-radius: 3px;
  &:hover {
    color: white;
  }
`;

export default class MainSlide extends Component {
  render() {
    return (
      <SlideWrap>
        <Carousel
          autoPlay
          showArrows={true}
          stopOnHover={false}
          showIndicators={true}
          axis="horizontal"
          transitionTime={1000}
          interval={10000}
          width="100%"
          infiniteLoop={true}
          showThumbs={false}
        >
        {
          // <Slide className="guide">
          //   <Wrap>
          //     <Content>
          //       <h1 className="title">사용자 가이드</h1>
          //       <p>
          //         오픈디자인에서 제공하는 사용자 설명서입니다.
          //         <br />각 기능에 대하여 사용법이 정리되어있습니다.
          //       </p>
          //       <LinkBtn to="/designDetail/2494">보러가기</LinkBtn>
          //     </Content>
          //   </Wrap>
          // </Slide>
        }
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
}
