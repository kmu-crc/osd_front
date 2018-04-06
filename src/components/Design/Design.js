import React, { Component } from "react";
import { Link, Route, NavLink } from "react-router-dom";
import styled from "styled-components";

// css styling

const Designli = styled.li`
  width: 200px;
  height: 290px;
  float: left;
  border-radius: 6px 6px 3px 3px;
  box-shadow: 0 1px 2px rgba(25,25,25,0.2);
  background-color: #fff;
  & a {
    cursor: pointer;
    display: block;
  }
`;

const ImgPart = styled.div`
  width: 100%;
  height: 158px;
  overflow: hidden;
  & img {
    width: 100%;
    height: auto;
  }
`;

class Design extends Component {
  render(){
    let design = this.props.design;
    return(
      <NavLink to={"/designDetail/"+design.uid}>
        <Designli>
          <ImgPart><img src={design.thumbnailUrl.m_img} alt="썸네일이미지"/></ImgPart>
          <div>{design.title}</div>
          <div>{design.categoryName.name}</div>
          <div>{design.userName.nick_name}</div>
          <div>{design.count.like_count}</div>
          <div>{design.count.member_count}</div>
          <div>{design.count.card_count}</div>
        </Designli>
      </NavLink>
    );
  }
}

export default Design;
