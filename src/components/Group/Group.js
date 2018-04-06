import React, { Component } from "react";
import { Link, Route, NavLink } from "react-router-dom";
import styled from "styled-components";

// css styling

const Groupli = styled.li`
  width: 300px;
  height: 200px;
  float: left;
  border-radius: 6px 6px 3px 3px;
  box-shadow: 0 1px 2px rgba(25,25,25,0.2);
  background-color: #fff;
`;

class Group extends Component {
  render(){
    let group = this.props.group;
    return(
      <NavLink to={"/groupDetail/"+group.uid}>
        <Groupli>
          <div>{group.title}</div>
          <div>{group.create_time}</div>
          <div>{group.userName}</div>
          <div>{group.count.like}</div>
          <div>{group.count.member}</div>
          <div>{group.count.design}</div>
        </Groupli>
      </NavLink>
    );
  }
}

export default Group;
