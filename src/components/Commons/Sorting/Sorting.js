import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.div`
  font-family: Noto Sans KR;
  width: 215px;
  height: 29px;
  display: flex;
  flex-direction: row;
  cursor: default;
  .element {
    width: 69px;
    margin-left: 4px;
    font-size: 20px;
    font-weight: 500;
    text-align: center;
    line-height: 29px;
  }
  .active {
    color: #FF0000;
  }
`;

class Sorting extends Component {
  render() {
    const { placeholder } = this.props;
    return (
      <Container>
        <div key={"update"} onClick={(e) => this.props.handleClick(e, { value: "update" })} className={`element ${placeholder === "update" ? "active" : ""}`}>최신순</div>
        <div key={"create"} onClick={(e) => this.props.handleClick(e, { value: "create" })} className={`element ${placeholder === "create" ? "active" : ""}`}>등록순</div>
        <div key={"like"} onClick={(e) => this.props.handleClick(e, { value: "like" })} className={`element ${placeholder === "like" ? "active" : ""}`}>인기순</div>
      </Container>
    );
  }
}

export default Sorting;
