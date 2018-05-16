import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import eximg from "../../source/eximg.jpeg";
import { Row } from "../Grid/index";
import { Grid, Icon } from "semantic-ui-react";

// css styling

const Designli = styled.li`
  width: 100%;
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
  color: dimgray;
  font-weight: 400;
  font-size: 12px;
  & div {
    float: right;
    width: 40px;
  }
  & div.clear {
    clear: both;
    float: none;
  }
`;

class Design extends Component {
  render(){
    let design = this.props.design;
    let user = this.props.user;
    return(
      <NavLink to={"/designDetail/"+design.uid}>
        <Designli>
          <ImgPart><img src={eximg} alt="썸네일이미지"/></ImgPart>
          <TextPart>
            <div className="title">{design.title}</div>
            <div className="userName">{design.userName}</div>
            <div className="cate">{design.categoryName}</div>
            <Count>
              <div>
                <Icon name="unhide" color="grey" size="mini"></Icon>
                {design.total_view_count? design.total_view_count : 0}
              </div>
              <div>
                <Icon name="heart" color="grey" size="mini"></Icon>
                {design.like_count? design.like_count : 0}
              </div>
              <div className="clear"></div>
            </Count>
          </TextPart>
        </Designli>
      </NavLink>
    );
  }
}

export default Design;
