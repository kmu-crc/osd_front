import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";
import { Icon } from "semantic-ui-react";
import eximg from "source/topDesign.png";
import StyleGuide from "StyleGuide";

// css styling

const Designli = styled.li`
  width: 100%;
  margin: 0 auto 2rem;
  font-size: 13px;
  border-radius: 3px 3px 3px 3px;
  overflow: hidden;
  box-shadow: 0px 2px 10px 2px rgba(0,0,0,0.1);
  background-color: #fff;
  text-align: left;
`;

const ImgPart = styled.div`
  width: 100%;
  height: 140px;
  overflow: hidden;
  background-position: center;
  background-size: cover;
  & img {
    width: 100%;
    height: 100%;
  }
`;

const TextPart = styled.div`
  padding: 10px 10px;
  font-size: ${StyleGuide.font.size.paragraph};
  & .title {
    font-weight: bold;
    line-height: 20px;
    height: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${StyleGuide.color.geyScale.scale7};
    font-size: 16px;
  }
  & .userName {
    line-height: 1.35;
    margin: 5px 0;
    color: ${StyleGuide.color.geyScale.scale6};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  & .cate {
    color: ${StyleGuide.color.main.basic};
    font-weight: 300;
    font-size: ${StyleGuide.font.size.small};
  }
`;

const Count = styled.div`
  background-color: ${StyleGuide.color.geyScale.scale9};
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

    return (
      <NavLink to={"/designDetail/" + design.uid}>
        <Designli>
          <ImgPart style={design.thumbnailUrl ? {backgroundImage: `url(${design.thumbnailUrl.m_img})`} : {backgroundImage: `url(${eximg})`}}/>
          <TextPart>
            <div className="title">{design.title}</div>
            <div className="userName">
              <Link to={`/designerDetail/${design.user_id}`}>{design.userName}</Link>
            </div>
            <div className="cate">{design.categoryName? design.categoryName : "전체"}</div>
          </TextPart>
          <Count>
            <div>
              <Icon name="unhide" size="mini"></Icon>
              {design.view_count ? design.view_count : 0}
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
