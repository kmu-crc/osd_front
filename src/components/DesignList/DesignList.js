import React, { Component } from "react";
import Design from "../Design";
import styled from "styled-components";
import { Container, Columns, Row } from "../Grid/index";

// css styling

const Wrapper = styled.div`
  background-color: #f9f9f9;
  width: 100%;
  padding: 40px 0px;
  min-width: 660px;
  & ul {
    margin-top: 30px;
  }
  //   margin: 100px auto 0;
  //   @media (min-width: 768px) and (max-width: 960px) {
  //     width: 660px;
  //   }
  //   @media (min-width: 960px) and (max-width: 1200px) {
  //     width: 880px;
  //   }
  //   @media (min-width: 1200px) and (max-width: 1320px) {
  //     width: 1100px;
  //   }
  //   @media (min-width: 1320px) {
  //     width: 1320px;
  //   }
  // }
`;

const Category = Columns.extend`
  width: 300px;
  float: left;
  & select {
    width: 140px;
    height: 30px;
    font-size: 13px;
    margin-right: 5px;
  }
`;

const Sorting = Columns.extend`
  width: 100px;
  float: right;
  & select {
    width: 100px;
    height: 30px;
    font-size: 13px;
    float: right;
  }
`;

class DesignList extends Component {
  render(){
    let list = this.props.DesignList;
    return(
      <Wrapper>
        <Container container={true}>
        <Category xs={4} sm={5} width={4}>
          <select>
            <option>패션</option>
            <option>제품</option>
            <option>커뮤니케이션</option>
            <option>공간</option>
            <option>엔터테인먼트</option>
          </select>
          <select>
            <option>의상</option>
          </select>
        </Category>
        <Sorting width={2}>
          <select>
            <option>최신순</option>
            <option>인기순</option>
          </select>
        </Sorting>
        <Row />
        <ul>
          {list.map(design =>
            <Design key={design.uid} design={design}/>
          )}
          <Row/>
        </ul>
        </Container>
      </Wrapper>
    );
  }
}

export default DesignList;
