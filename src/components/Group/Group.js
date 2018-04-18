import React, { Component } from "react";
import { Link, Route, NavLink } from "react-router-dom";
import styled from "styled-components";

// css styling

const Groupli = styled.li`
  width: 310px;
  margin: 0 10px 20px;
  height: 240px;
  float: left;
  border-radius: 6px 6px 3px 3px;
  box-shadow: 0 1px 2px rgba(25,25,25,0.2);
  background-color: #fff;
  padding: 10px 20px;
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
    width: 80px;
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
          <div className="date">{(group.create_time).split("T")[0]} 개설</div>
          <div className="title">{group.title}</div>
          <div className="owner">{group.userName}</div>
          <Count>
            <div>{group.count.like}</div>
            <div>{group.count.member}</div>
            <div>{group.count.design}</div>
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
        </Groupli>
      </NavLink>
    );
  }
}

export default Group;
