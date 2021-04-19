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

const SliderBox = styled.div`
  width:98%;
  margin-left:30px;
  height:320px;
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
      left:-1px;
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
      right:-1px;
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
    this.state = { L_handler: false, R_handler: true, hasMore: true, loading: false, scrollOffset: 500 };
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

    if (event.target.id == "wrapper_top") {
      console.log(document.getElementById("wrapper_top").scrollLeft, document.getElementById("wrapper_top").scrollWidth - 1366);
      document.getElementById("wrapper_top").scrollLeft > 5 ? await this.setState({ L_handler: true }) : await this.setState({ L_handler: false });
      document.getElementById("wrapper_top").scrollLeft < document.getElementById("wrapper_top").scrollWidth - 1366
        ? await this.setState({ R_handler: true }) : await this.setState({ R_handler: false });
    }
  }
  onClickArrow = async (far) => {
    document.getElementById("wrapper_top").scrollLeft += far;
  }
  render() {
    const { ListComponent } = this.props;
    const List = this.props.getMore ? this.props.dataListAdded : this.props.dataList
    return (
      <SliderBox>
        {
          this.state.L_handler ?
            <div className="left_gradient">
              <div className="arrow" onClick={() => this.onClickArrow(-1000)}></div>
            </div>
            : null
        }
        {
          this.state.R_handler ?
            <div className="right_gradient">
              <div className="arrow" onClick={() => this.onClickArrow(1000)}></div>
            </div>
            : null
        }




        <div id="wrapper_top" className="wrapper_top">
          {
            List.map((item, index) => {
              return (
                <div className="item" key={index}>
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
