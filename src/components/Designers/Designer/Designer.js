import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Icon } from "semantic-ui-react";
import eximg from "source/designIs.png";
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
  font-size: ${StyleGuide.font.size.paragraph};
  & .date {
    color: ${StyleGuide.color.geyScale.scale6};
    font-size: ${StyleGuide.font.size.small};
    line-height: 1.35;
    padding: 1px 0;
  }
  & .userName {
    font-weight: bold;
    line-height: 20px;
    height: 40px;
    white-space: normal;
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

class designer extends Component {
  render(){
    let designer = this.props.data;

    return(
      <NavLink to={"/designerDetail/"+designer.uid}>
        <Designerli>
          <ImgPart><img src={designer.imgURL ? designer.imgURL.m_img : eximg} alt="썸네일이미지"/></ImgPart>
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

export default designer;
