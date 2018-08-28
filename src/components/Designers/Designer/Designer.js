import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Icon } from "semantic-ui-react";
import profile from "source/thumbnail.png";
import StyleGuide from "StyleGuide";

// css styling

const Designerli = styled.li`
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
  & .date {
    color: ${StyleGuide.color.geyScale.scale6};
    font-size: ${StyleGuide.font.size.small};
    line-height: 1.35;
    padding: 1px 0;
  }
  & .userName {
    font-size: 16px;
    font-weight: bold;
    line-height: 20px;
    height: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  & .cate {
    color: ${StyleGuide.color.main.basic};
    font-weight: 300;
    margin: 5px 0;
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
    padding-right: 10px;
  }
  &::after{
    display: block;
    content: "";
    clear: both;
}
`;

class Designer extends Component {
  render(){
    let designer = this.props.data;

    return(
      <NavLink to={"/designerDetail/"+designer.uid}>
        <Designerli>
          <ImgPart style={designer.imgURL ? {backgroundImage: `url(${designer.imgURL.m_img})`} : {backgroundImage: `url(${profile})`}}/>
          <TextPart>
            <div className="userName">{designer.nick_name}</div>
            <div className="cate">{designer.categoryName? designer.categoryName : "전체"}</div>
            <div className="date">{designer.create_time? designer.create_time.split("T")[0]+"부터 활동" : ""}</div>
          </TextPart>
          <Count>
            <div>
              <Icon name="signup" size="mini"></Icon>
              {designer.total_design? designer.total_design : 0}
            </div>
            <div>
              <Icon name="unhide" size="mini"></Icon>
              {designer.total_view? designer.total_view : 0}
            </div>
            <div>
              <Icon name="heart" size="mini"></Icon>
              {designer.total_like? designer.total_like : 0}
            </div>
          </Count>
        </Designerli>
      </NavLink>
    );
  }
}

export default Designer;
