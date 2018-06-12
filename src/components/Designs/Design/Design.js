import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Icon } from "semantic-ui-react";
import eximg from "source/topDesign.png";

// css styling

const Designli = styled.li`
  width: 100%;
  margin: 0 auto 2rem;
  font-size: 13px;
  border-radius: 3px 3px 3px 3px;
  overflow: hidden;
  box-shadow: 0 1px 2px rgba(25,25,25,0.2);
  background-color: #fff;
  & a {
    cursor: pointer;
    display: block;
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
  padding: 10px 10px;
  & .userName {
    line-height: 1.35;
  }
  & .title {
    font-weight: bold;
    line-height: 20px;
    height: 40px;
    margin: 10px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
  }
  & .userName {
  }
  & .cate {
    color: #EB3324;
    font-weight: 300;
    font-size: 12px;
  }
`;

const Count = styled.div`
  background-color: #000;
  padding: 5px 10px;
  color: white;
  font-weight: 400;
  font-size: 12px;
  & div {
    float: left;
    width: 40px;
  }
  &::after{
    display: block;
    content: "";
    clear: both;
  }
`;

class Design extends Component {
  render() {
    let design = this.props.data;
    let user = this.props.user;
    return (
      <NavLink to={"/designDetail/" + design.uid}>
        <Designli>
          <ImgPart>
            <img src={design.thumbnailUrl ? design.thumbnailUrl.m_img : eximg} alt="썸네일이미지" />
          </ImgPart>
          <TextPart>
            <div className="cate">{design.categoryName? design.categoryName : "전체"}</div>
            <div className="title">{design.title}</div>
            <div className="userName">{design.userName}</div>
          </TextPart>
          <Count>
            <div>
              <Icon name="unhide" size="mini"></Icon>
              {design.total_view_count ? design.total_view_count : 0}
            </div>
            <div>
              <Icon name="heart" size="mini"></Icon>
              {design.like_count ? design.like_count : 0}
            </div>
          </Count>
        </Designli>
      </NavLink>
    );
  }
}

export default Design;
