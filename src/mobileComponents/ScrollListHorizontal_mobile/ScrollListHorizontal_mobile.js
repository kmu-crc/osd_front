import React, { Component } from "react";
import styled from "styled-components";
import arrow_new from "source/arrow_new.png";

const SliderBox = styled.div`
  width:100%;
  height:250px;
  scroll-behavior:smooth;
  display:flex;
  .wrapper_top{
    overflow-y:auto;
    scroll-behavior:smooth;
    display:flex;
    padding-left:15px;
    padding-right:5px;
    .item{
      margin-right:10px;
    }
  }
  .wrapper_top{
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .wrapper_top::-webkit-scrollbar {
    display: none;
  }
`
class ScrollListHorizontal_mobile extends Component {
  constructor(props) {
    super(props);
  };
  render() {
    const { ListComponent } = this.props;
    const List = this.props.getMore ? this.props.dataListAdded : this.props.dataList

    return (
      <SliderBox>
        <div className="wrapper_top">
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
    );
  }
}

export default ScrollListHorizontal_mobile;
