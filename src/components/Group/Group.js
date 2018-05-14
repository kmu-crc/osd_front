import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import eximg from "../../source/eximg.jpeg";

// css styling

const Groupli = styled.li`
  width: 100%;
  height: 370px;
  margin: 0 auto 20px;
  border-radius: 6px 6px 3px 3px;
  box-shadow: 0 1px 2px rgba(25,25,25,0.2);
  background-color: #fff;
  font-size: 13px;
  &:hover {
    border-bottom: 0.5px solid dimgray;
  }
  & .title {
    margin: 10px 0;
    font-size: 16px;
    font-weight: bold;
    height: 38px;
  }
  & .date {
    color: dimgray;
    font-weight: 400;
    font-size: 12px;
  }
  & .owner {
    float: left;
    width: 100px;
  }
`;

const GroupImg = styled.div`
  width: 100%;
  height: 140px;
  overflow: hidden;
  & img {
    width: 100%;
  }
`;

const GroupInfo = styled.div`
  padding: 10px 20px;
`;

const Count = styled.div`
  float: right;
  & div {
    float: left;
    width: 40px;
  }
  & .clear {
    clear: both;
    display: block;
  }
`;

const ButtonWrap = styled.div`
  margin-top: 10px;
  & button {
    font-size: 12px;
    padding: 4px 15px;
    margin-right: 10px;
  }
`;

const Img = styled.div`
  border-top: 1px solid #f2f2f2;
  margin-top: 15px;
  & .imgBox {
    float: left;
    width: 30%;
    height: 60px;
    background-color: #f2f2f2;
    margin: 10px 3px 0;
  }
`;

class Group extends Component {
  render(){
    let group = this.props.group;
    return(
      <NavLink to={"/groupDetail/"+group.uid}>
        <Groupli>
          <GroupImg>
            <img src={eximg} alt=""/>
          </GroupImg>
          <GroupInfo>
            <div className="date">{(group.create_time).split("T")[0]} 개설</div>
            <div className="title">{group.title}</div>
            <div className="owner">{group.userName}</div>
            <Count>
              <div>{group.like? group.like : 0}</div>
              <div>{group.member? group.member : 0}</div>
              <div>{group.design? group.design : 0}</div>
              <div className="clear"></div>
            </Count>
            <div className="clear"></div>
            <ButtonWrap>
              <button className="red">가입신청</button>
              <button className="red">관리</button>
            </ButtonWrap>
            <Img>
              {group.designTop3.map(design => 
                <div className="imgBox" key={design.uid}><img src={design.s_img} alt=""/></div>
              )}
            </Img>
          </GroupInfo>
        </Groupli>
      </NavLink>
    );
  }
}

export default Group;
