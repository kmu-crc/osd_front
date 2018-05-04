import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import eximg from "../../source/eximg.jpeg";
import { Columns, Row } from "../Grid/index";

// css styling

const DesignCon = Columns.extend`
 `;

const Designli = styled.li`
  width: 93%;
  margin: 0 auto 20px;
  height: 270px;
  font-size: 13px;
  border-radius: 6px 6px 3px 3px;
  box-shadow: 0 1px 2px rgba(25,25,25,0.2);
  background-color: #fff;
  & a {
    cursor: pointer;
    display: block;
  }
  &:hover {
    border-bottom: 0.5px solid dimgray;
  }
`;

const ImgPart = styled.div`
  width: 100%;
  height: 140px;
  overflow: hidden;
  & img {
    width: 100%;
    height: 100%;
  }
`;

const TextPart = styled.div`
  & .title, & .userName {
    height: 36px;
    line-height: 1.35;
    padding: 10px 0;
    margin: 0 10px;
  }
  & .title {
    font-weight: bold;
  }
  & .userName {
    border-bottom: 1px solid #f2f2f2;
  }
  & .cate {
    color: dimgray;
    padding: 10px 0 5px 10px;
    font-weight: 300;
  }
`;

const Count = styled.div`
  float: right;
  color: dimgray;
  font-weight: 400;
  font-size: 12px;
  & div {
    float: left;
    width: 40px;
  }
`;

class Design extends Component {
  render(){
    let design = this.props.design;
    return(
      <NavLink to={"/designDetail/"+design.uid}>
      <DesignCon xs={4} sm={3} md={3} width={2}>
        <Designli>
          <ImgPart><img src={eximg} alt="썸네일이미지"/></ImgPart>
          <TextPart>
            <div className="title">{design.title}</div>
            <div className="userName">{design.userName.nick_name}</div>
            <div className="cate">{design.categoryName.name}</div>
            <Count>
              <div>{design.count.like_count}</div>
              <div>{design.count.member_count}</div>
              <div>{design.count.card_count}</div>
              <Row/>
            </Count>
          </TextPart>
        </Designli>
        </DesignCon>
      </NavLink>
    );
  }
}

export default Design;
