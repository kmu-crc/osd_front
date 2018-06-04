import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import eximg from "source/eximg.jpeg";
import { Icon } from "semantic-ui-react";

// css styling

const Groupli = styled.li`
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
  & .title, & .owner {
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
  & .owner {
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
    let group = this.props.data;
    let user = this.props.user;
    return(
      <NavLink to={"/groupDetail/"+group.uid} onClick={this.refresh}>
        <Groupli>
          <ImgPart><img src={eximg} alt="썸네일이미지"/></ImgPart>
          <TextPart>
            <div className="title">{group.title}</div>
            <div className="owner">{group.userName}</div>
            <div className="cate">
              {/* <ButtonWrap>
                <button className="red">가입신청</button>
                { (user != null && user.uid === group.user_id ) && <button className="red">관리</button> }
              </ButtonWrap> */}
            </div>
          </TextPart>
          <Count>
            <div>
              <Icon name="window restore" size="mini"></Icon>
              {group.design? group.design : 0}
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
