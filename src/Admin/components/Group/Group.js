import React, { Component } from "react";
import styled from "styled-components";
import eximg from "source/myPage.jpeg";
import StyleGuide from "StyleGuide";

// css styling
const Groupli = styled.li`
  width: 100%;
  margin: 0 auto 2rem;
  font-size: 13px;
  border-radius: 3px 3px 3px 3px;
  overflow: hidden;
  box-shadow: 0px 2px 10px 2px rgba(0,0,0,0.1);
  background-color: #fff;
  list-style-type: none;
  box-sizing: border-box;
  padding: 10px;
`;

const ImgPart = styled.div`
  display: inline-block;
  width:  35px;
  height: 35px;
  background-size: cover;
  background-position: center;
  & img {
    width: 100%;
    height: 100%;
  }
`;

const TextPart = styled.div`
  padding: 10px 10px;
  display: inline-block;
  font-size: ${StyleGuide.font.size.paragraph};
  & .owner {
    line-height: 1.35;
    margin: 5px 0;
    color: ${StyleGuide.color.geyScale.scale6};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  & .title {
    font-size: 16px;
    font-weight: bold;
    line-height: 20px;
    height: 20px;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: ${StyleGuide.color.geyScale.scale7};
  }
  & .cate {
    color: ${StyleGuide.color.geyScale.scale6};
    font-size: ${StyleGuide.font.size.small};
  }
`;

class Group extends Component {
  render(){
    let group = this.props.data;
    console.log(group);
    return(
        <Groupli>
          <ImgPart style={{backgroundImage:`url(${group.thumbnailUrl ? group.thumbnailUrl.m_img: eximg})`}}/>
          <TextPart>
            <div className="title">{group.title}</div>
            <div className="owner">{group.userName};</div>
          </TextPart>
        </Groupli>
    );
  }
}

export default Group;
