import React, { Component } from "react";
import Group from "../Group";
import styled from "styled-components";
import { Link } from "react-router-dom"
import { Container, Columns, Row } from "../Grid/index";

// css styling

const Wrapper = styled.div`
  background-color: #f9f9f9;
  width: 100%;
  padding: 40px 0px;
  min-width: 660px;
  // & ul {
  //   min-width: 660px;
  //   margin: auto;
  //   @media (min-width: 768px) and (max-width: 960px) {
  //     width: 660px;
  //   }
  //   @media (min-width: 960px) and (max-width: 1320px) {
  //     width: 990px;
  //   }
  //   @media (min-width: 1320px) {
  //     width: 1320px;
  //   }
  // }
`;

const BtnWrap = Columns.extend`
  text-align: right;
  margin: 0px 0 20px;
  float: right;
  & button {
    padding: 5px 18px;
    font-size: 14px;
    border: 1px solid rgba(25,25,25,0.2);
    font-weight: 400;
    background-color: #fff;
    border-radius: 5px;
  }
  & button:hover {
    background-color: #f2f2f2;
  }
`;

class GroupList extends Component {
  render(){
    let list = this.props.GroupList;
    return(
      <Wrapper>
        <Container container={true}>
        <BtnWrap width={2}>
          <button><Link to="/createGroup">새 그룹 추가 +</Link></button>
        </BtnWrap>
        <Row/>
        <ul>
          {list.map(group =>
            <Group key={group.uid} group={group}/>
          )}
          <div className="clear"></div>
        </ul>
        </Container>
      </Wrapper>
    );
  }
}

export default GroupList;
