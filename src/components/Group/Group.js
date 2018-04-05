import React, { Component } from 'react';
import styled from 'styled-components';

// css styling

const Groupli = styled.li`
  width: 200px;
  height: 290px;
  float: left;
  border-radius: 6px 6px 3px 3px;
  box-shadow: 0 1px 2px rgba(25,25,25,0.2);
  background-color: #fff;
`;

class Group extends Component {
  render(){
    let group = this.props.group;
    return(
      <Groupli>
        <div>{group.title}</div>
      </Groupli>
    );
  }
}

export default Group;
