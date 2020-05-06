import React, { Component } from "react";
import styled from "styled-components";
import { Icon } from "semantic-ui-react";

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
      <ScrollContainer id="content">
        {List.length > 6 ? <div className="arrow left" onClick={() => this.scrollHorizon(-1 * this.state.scrollOffset)}>
          <Icon name="caret left" size="big" /></div> : null}

        {List.length > 6 ? <div className="arrow right" onClick={() => this.scrollHorizon(1 * this.state.scrollOffset)}>
          <Icon name="caret right" size="big" /></div> : null}

        {List.length ? List.map((item, index) =>
          <div key={index} style={{ paddingRight: "10px", marginRight: "35px" }}>
            <ListComponent data={item} /></div>) : (
            <div style={{ marginLeft: "auto", marginRight: "auto" }}>노 데이타!</div>)}
      </ScrollContainer>
    );
  }
}

export default ScrollListHorizontal;
