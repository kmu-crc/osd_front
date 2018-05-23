import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import eximg from "source/eximg.jpeg";
import { Icon } from "semantic-ui-react";

// css styling

const Groupli = styled.li`
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
  & .title, & .owner {
    height: 36px;
    line-height: 1.35;
    padding: 10px 0;
    margin: 0 10px;
  }
  & .title {
    font-weight: bold;
  }
  & .owner {
    border-bottom: 1px solid #f2f2f2;
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

const ButtonWrap = styled.div`
  padding: 5px 0 5px 10px;
  & button {
    font-size: 12px;
    padding: 4px 15px;
    margin-right: 10px;
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
    let group = this.props.group;
    let user = this.props.user;
    return(
      <NavLink to={"/groupDetail/"+group.uid} onClick={this.refresh}>
        <Groupli>
          <ImgPart><img src={eximg} alt="썸네일이미지"/></ImgPart>
          <TextPart>
            <div className="title">{group.title}</div>
            <div className="owner">{group.userName}</div>
            <div className="cate">
              <ButtonWrap>
                <button className="red">가입신청</button>
                { (user != null && user.uid === group.user_id ) && <button className="red">관리</button> }
              </ButtonWrap>
            </div>
            <Count>
              <div>
                <Icon name="window restore" color="grey" size="mini"></Icon>
                {group.design? group.design : 0}
              </div>
              <div>
                <Icon name="signup" color="grey" size="mini"></Icon>
                {group.design? group.design : 0}
              </div>
              <div>
                <Icon name="heart" color="grey" size="mini"></Icon>
                {group.like? group.like : 0}
              </div>
              <div className="clear"></div>
            </Count>
          </TextPart>
        </Groupli>
      </NavLink>
    );
  }
}

export default Group;
