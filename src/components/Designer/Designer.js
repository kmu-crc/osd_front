import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Icon } from "semantic-ui-react";
import eximg from "../../source/eximg.jpeg";

// css styling

const Designerli = styled.li`
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
  & .date, & .userName {
    height: 36px;
    line-height: 1.35;
    padding: 10px 0;
    margin: 0 10px;
  }
  & .date {
    font-weight: 400;
    color: dimgrey;
  }
  & .userName {
    border-bottom: 1px solid #f2f2f2;
    font-weight: bold;
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

class designer extends Component {
  render(){
    let designer = this.props.designer;
    let user = this.props.user;
    return(
      <NavLink to={"/designerDetail/"+designer.uid}>
        <Designerli>
          <ImgPart><img src={eximg} alt="썸네일이미지"/></ImgPart>
          <TextPart>
            <div className="date">2018-04-01 부터 활동</div>
            <div className="userName">{designer.nick_name}</div>
            <div className="cate">{designer.categoryName}</div>
            <Count>
              <div>
                <Icon name="signup" color="grey" size="mini"></Icon>
                {designer.total_design? designer.total_design : 0}
              </div>
              <div>
                <Icon name="unhide" color="grey" size="mini"></Icon>
                {designer.total_view? designer.total_view : 0}
              </div>
              <div>
                <Icon name="heart" color="grey" size="mini"></Icon>
                {designer.total_like? designer.total_like : 0}
              </div>
              <div className="clear"></div>
            </Count>
          </TextPart>
        </Designerli>
      </NavLink>
    );
  }
}

export default designer;
