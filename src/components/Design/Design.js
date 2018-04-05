import React, { Component } from 'react';
import styled from 'styled-components';

// css styling

const Designli = styled.li`
  width: 200px;
  height: 290px;
  float: left;
  border-radius: 6px 6px 3px 3px;
  box-shadow: 0 1px 2px rgba(25,25,25,0.2);
  background-color: #fff;
`;

class Design extends Component {
  render(){
    let design = this.props.design;
    return(
      <Designli>
        <div>{design.thumbnailUrl.s_img}</div>
        <div>{design.title}</div>
        <div>{design.categoryName.name}</div>
        <div>{design.userName.nick_name}</div>
        <div>{design.count.like_count}</div>
        <div>{design.count.member_count}</div>
        <div>{design.count.card_count}</div>
      </Designli>
    );
  }
}

export default Design;