import React, { Component } from "react";
import Design from "../Design";
import styled from "styled-components";

// css styling

const Wrapper = styled.div`
  background-color: #f9f9f9;
  width: 100%;
  padding: 40px 50px;
  & ul {
    margin: 100px auto 0;
    min-width: 660px;
    @media (min-width: 768px) and (max-width: 960px) {
      width: 660px;
    }
    @media (min-width: 960px) and (max-width: 1200px) {
      width: 880px;
    }
    @media (min-width: 1200px) and (max-width: 1320px) {
      width: 1100px;
    }
    @media (min-width: 1320px) {
      width: 1320px;
    }
  }
`;

const Category = styled.div`
  width: 300px;
  float: left;
  & select {
    width: 140px;
    height: 30px;
    font-size: 13px;
    margin-right: 5px;
  }
`;

const Sorting = styled.div`
  width: 100px;
  float: right;
  & select {
    width: 100px;
    height: 30px;
    font-size: 13px;
  }
`;

class DesignList extends Component {
  render(){
    let list = this.props.DesignList;
    return(
      <Wrapper>
        <Category>
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
        <Sorting>
          <select>
            <option>최신순</option>
            <option>인기순</option>
          </select>
        </Sorting>
        <ul>
          {list.map(design =>
            <Design key={design.uid} design={design}/>
          )}
          <div className="clear"></div>
        </ul>
      </Wrapper>
    );
  }
}

export default DesignList;
