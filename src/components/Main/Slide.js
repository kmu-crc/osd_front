import React, { Component } from "react";
import styled from "styled-components";
import { Carousel } from "react-responsive-carousel";
import StyleGuide from "StyleGuide";
import Open_img from "source/design_bg.jpg";
import Easy_img from "source/easy_bg2.jpg";
import Together_img from "source/together_bg.jpg";
import market_style from "market_style";
import Banner_new from "source/banner_new.png";
import { Link } from "react-router-dom";
import Zoom from "source/baseline_search_black_48dp.png";

const SlideWrap = styled.div`
  width: 100%;
  height: 188px;
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
const HeaderItem = styled.li`
  max-width:280px;
  height:35px;
  font-size: ${market_style.font.size.mini2};
  font-family:Noto Sans KR, Medium;
  font-weight:500;
  margin-right:20px;
  display:flex;
  align-items:center;
  .non_margin{
    margin:0px;
  }
  .margin_left{
    margin-left:100px;
  }
  &.first {
    width:max-content;
    height:max-content;
  }
  &.search {
    width: 290px;
    height: 25px;
    background: #E9E9E9;
    border-radius: 15px;
    position: relative;
    .search-icon-wrapper {
      width:100%;
      .input-style {
        width: 100%;
        height: 25px;
        padding-left: 14px;
        padding-right: 40px;
        border: none;
        outline:none;
        background: transparent;
      }
      .search-icon {
        position: absolute;
        top: 2px;
        right: 10px;
        width: 20px;
        height: 20px;
        opacity: .3;
      }
    }
  }
  .hover{
    color:#707070;
  }
  .active {
    color: #F00;
  }
`;
const BannerBox = styled.div`
  width:100%;
  height:188px;
  background-image: url(${Banner_new});
  background-size: cover;
  padding:34px 226px;
  display:flex;
  justify-content:flex-end;
  .text_rgn{
    width:290px;
    height:121px;
    .text_normal{      
      font-size:${market_style.font.size.mini1};
      font-weight:500;
      margin-bottom:5px;
    }
    .red_button{
      width:max-content;
      height:max-content;
      padding:6px 21px;
      background-color:red;
      border-radius:17px;
      font-size:${market_style.font.size.mini2};
      color:white;
      margin-bottom:20px;
    }
  }
`
export default class MainSlide extends Component {
  constructor(props) {
    super(props);
    this.state = { active: false, keyword:""};
    this.onClickSearch=this.onClickSearch.bind(this);
    this.saveKeyword = this.saveKeyword.bind(this);
    this.submitEnter = this.submitEnter.bind(this);
  }
  submitEnter = e => {
    if (e.keyCode === 13) {
      const dom = document.getElementById("searchbox");
      dom && dom.click();
    }
  };
  saveKeyword = async e => {
    const target = e.target;
    const word = target.value;
    let regExp = /^[a-zA-Zㄱ-힣0-9]*$/i;
    if (!word.match(regExp)) {
      await alert("특수문자는 사용할 수 없습니다.");
      target.value = this.state.keyword;
    } else {
      this.setState({ keyword: word });
    }
  };
  onClickSearch=async(event)=>{
    const location = window.location.pathname;

    const designerActive = (location.indexOf("/designer") !== -1 || location.indexOf("/designerDetail") !== -1) && (location.indexOf(`/request`) === -1)
    const makerActive = (location.indexOf("/maker") !== -1 || location.indexOf("/makerDetail") !== -1) && (location.indexOf(`/request`) === -1)
    const itemActive = (location.indexOf("/product") !== -1 || (location.indexOf("/createproduct") !== -1)|| (location.indexOf("/productModify") !== -1)|| location.indexOf("/productDetail") !== -1) && (location.indexOf(`/request`) === -1)
    let searchtype = designerActive ? "designer" : makerActive ? "maker" : itemActive ? "item" : null;
    console.log(this.state.keyword);
    let countItem =-1;
    let countMaker=-1;
    let countDesigner=-1;
    await this.props.GetItemSearchCountRequest(this.props.sort, this.props.cate1, this.props.cate2, this.state.keyword)
    .then((data)=>{console.log(data);countItem=data.searchCount==null?-1:data.searchCount;});
    await this.props.GetMakerSearchCountRequest(this.props.sort, this.props.cate1, this.props.cate2, this.state.keyword)
    .then((data)=>{console.log(data);countMaker=data.searchCount==null?-1:data.searchCount;});
    await this.props.GetDesignerSearchCountRequest(this.props.sort, this.props.cate1, this.props.cate2, this.state.keyword)
    .then((data)=>{console.log(data);countDesigner=data.searchCount==null?-1:data.searchCount;});
    if(makerActive){
      searchtype=countMaker>0?"maker":
      countDesigner>0?"designer":
      countItem>0?"item":
      "item";
    }else if(itemActive){
      searchtype=countItem>0?"item":
      countDesigner>0?"designer":
      countMaker>0?"maker":
      "item";
    }else{
        searchtype=countDesigner>0?"designer":
        countMaker>0?"maker":
        countItem>0?"item":
        "item";
    }
    console.log(searchtype);

    window.location.href = `/search/${searchtype}/name/${this.state.keyword}`;
  }
  render() {
    const location = window.location.pathname;
    const designerActive = (location.indexOf("/designer") !== -1 || location.indexOf("/designerDetail") !== -1) && (location.indexOf(`/request`) === -1)
    const makerActive = (location.indexOf("/maker") !== -1 || location.indexOf("/makerDetail") !== -1) && (location.indexOf(`/request`) === -1)
    const itemActive = (location.indexOf("/product") !== -1 || (location.indexOf("/createproduct") !== -1)|| (location.indexOf("/productModify") !== -1)|| location.indexOf("/productDetail") !== -1) && (location.indexOf(`/request`) === -1)
    const requestActive = (location.indexOf("/request") !== -1)
    const searchtype = designerActive ? "designer" : makerActive ? "maker" : itemActive ? "item" : null;
    return (
      <BannerBox>
        <div className="text_rgn">
          <div className="text_normal">오픈디자인월드에서 당신의 지식을 판매해보세요.</div>
          <div className="red_button"> <Link to={`/createProduct`}>아이템 등록하기</Link></div>
          <div className="text_normal">오픈디자인월드에서 당신에게 맞는 아이디어를 찾아보세요.</div>
          <div className="">
            <HeaderItem className="search">
              <div className="search-icon-wrapper">
                <input className="input-style" onChange={this.saveKeyword} onKeyDown={this.submitEnter} />
                <Link to={`/search/${searchtype}/name/${this.state.keyword}`} id="searchLink">
                  <img alt="icon" src={Zoom} id="searchbox" className="search-icon" onClick={this.onClickSearch}/>
                </Link>
              </div>
            </HeaderItem>
          </div>
        </div>
      </BannerBox>
      // <SlideWrap>
      //   <Carousel
      //     autoPlay
      //     showArrows={true}
      //     stopOnHover={false}
      //     showIndicators={true}
      //     axis="horizontal"
      //     transitionTime={1000}
      //     interval={20000}
      //     width="100%"
      //     infiniteLoop={true}
      //     showThumbs={false}
      //   >
      //   {
      //     <Slide className="guide">
      //       <Wrap>
      //         <Content>
      //           <h1 className="title">사용자 가이드</h1>
      //           <p>
      //             오픈디자인에서 제공하는 사용자 설명서입니다.
      //             <br />각 기능에 대하여 사용법이 정리되어있습니다.
      //           </p>
      //           <LinkBtn to="/designDetail/2494">보러가기</LinkBtn>
      //         </Content>
      //       </Wrap>
      //     </Slide>
      //   }
      //     <Slide className="open">
      //       <span>오픈 디자인</span>
      //     </Slide>
      //     <Slide className="easy">
      //       <span>쉬운 디자인</span>
      //     </Slide>
      //     <Slide className="together">
      //       <span>함께하는 디자인</span>
      //     </Slide>
      //   </Carousel>
      // </SlideWrap>
    );
  }
}
