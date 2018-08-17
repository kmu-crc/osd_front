import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";
import eximg from "source/myPage.jpeg";
import { Icon } from "semantic-ui-react";
import StyleGuide from "StyleGuide";
import DateFormat from "modules/DateFormat";

// css styling

const Groupli = styled.li`
  width: 100%;
  margin: 0 auto 2rem;
  font-size: 13px;
  border-radius: 3px 3px 3px 3px;
  overflow: hidden;
  box-shadow: 0px 2px 10px 2px rgba(0,0,0,0.1);
  background-color: #fff;
`;

const ImgPart = styled.div`
  width: 100%;
  height: 140px;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  & img {
    width: 100%;
    height: 100%;
  }
`;

const TextPart = styled.div`
  padding: 10px 10px;
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
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${StyleGuide.color.geyScale.scale7};
  }
  & .cate {
    color: ${StyleGuide.color.geyScale.scale6};
    font-size: ${StyleGuide.font.size.small};
  }
`;

const Count = styled.div`
  background-color: #fff;
  padding: 5px 10px;
  color: ${StyleGuide.color.geyScale.scale6};
  border-top: 1px solid ${StyleGuide.color.geyScale.scale1};
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


class Group extends Component {
  refresh = (e) => {
    if (this.props.rerender) {
      Component.forceUpdate();
    } else {
      return;
    }
  }

  render(){
    let group = this.props.data;

    return(
      <NavLink to={"/groupDetail/"+group.uid} onClick={this.refresh}>
        <Groupli>
          <ImgPart style={group.thumbnailUrl ? {backgroundImage: `url(${group.thumbnailUrl.m_img})`} : {backgroundImage: `url(${eximg})`}}/>
          <TextPart>
            <div className="title">{group.title}</div>
            <div className="owner">
              {group.userName}님의 그룹
            </div>
            <div className="cate">
              최근 업데이트 {DateFormat(group.child_update_time)}
            </div>
          </TextPart>
          <Count>
            <div>
              <Icon name="window restore" size="mini"></Icon>
              {group.group? group.group : 0}
            </div>
            <div>
              <Icon name="signup" size="mini"></Icon>
              {group.design? group.design : 0}
            </div>
            <div>
              <Icon name="heart" size="mini"></Icon>
              {group.like? group.like : 0}
            </div>
          </Count>
        </Groupli>
      </NavLink>
    );
  }
}

export default Group;
