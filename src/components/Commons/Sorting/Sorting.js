import React, { Component } from "react";
import styled from "styled-components";
import market_style from "market_style";
const Container = styled.div`
  font-family: Noto Sans KR;
  // width: 215px;
  height: 29px;
  display: flex;
  flex-direction: row;
  justify-content:flex-end;
  align-items:center;
  cursor: default;
  .element {
    margin-left: 15px;
    font-size:${market_style.font.size.small1};
    font-weight: 300;
    text-align: center;
    cursor:pointer;
  }
  .active {
    color: #FF0000;
  }
`;

class Sorting extends Component {
  render() {
    const { placeholder } = this.props;
    const checkHere = placeholder == null?"name":placeholder;
    return (
      <Container>
        <div key={"like"} onClick={(e) => this.props.handleClick(e, { value: "like" })} className={`element ${checkHere === "like" ? "active" : ""}`}>인기순</div>
        <div key={"update"} onClick={(e) => this.props.handleClick(e, { value: "update" })} className={`element ${checkHere === "update" ? "active" : ""}`}>최신순</div>
        <div key={"name"} onClick={(e) => this.props.handleClick(e, { value: "name" })} className={`element ${checkHere === "name" ? "active" : ""}`}>이름순</div>
      </Container>
    );
  }
}

export default Sorting;
