import React, { Component } from "react";
import styled from "styled-components";
import { Icon } from "semantic-ui-react";
// import InfiniteScroll from "react-infinite-scroller";

// CSS STYLE
const ScrollContainer = styled.div`
  // border: 1px solid red;
  width: 100%;
  height: 330px;
  display: flex;
  overflow-x: scroll;
  ::-webkit-scrollbar { display: none; }
  .arrow {
    position: absolute;
    width: 35px;
    height: 35px;
    display: none;
    margin-top: 125px;
    border-radius: 50%;
    background: #EFEFEF;
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
    this.state = { hasMore: true, loading: false };
    this.hScroll = React.createRef();
  };
  scrollLeft = e => { };
  render() {
    // console.log("scroll:", this.props);
    const { ListComponent } = this.props;
    const List = this.props.getMore ? this.props.dataListAdded : this.props.dataList

    return (
      <ScrollContainer id="container">
        <div className="arrow left" onClick={this.scrollLeft}>
          <div>
            <Icon name="caret left" size="big" />
          </div>
        </div>
        <div className="arrow right"> <Icon name="caret right" size="big" /> </div>
        {List.length ? List.map(item =>
          <div key={item.uid} style={{ marginRight: "45px" }}>
            <ListComponent data={item} />
          </div>
        ) : (<div style={{ marginLeft: "auto", marginRight: "auto" }}>노 데이타!</div>)}
      </ScrollContainer>
    );
  }
}

export default ScrollListHorizontal;
