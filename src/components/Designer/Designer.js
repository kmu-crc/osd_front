import React, { Component } from 'react';
import styled from 'styled-components';

// css styling

const Designerli = styled.div`
  width: 300px;
  height: 200px;
  float: left;
  border-radius: 6px 6px 3px 3px;
  box-shadow: 0 1px 2px rgba(25,25,25,0.2);
  background-color: #fff;
`;

class Designer extends Component {
  render(){
    let designer = this.props.designer;
    return(
      <Designerli>
        <div>{designer.imgURL.m_img}</div>
        <div>{designer.nick_name}</div>
        <div>{designer.count.total_like}</div>
        <div>{designer.count.total_design}</div>
        <div>{designer.count.total_view}</div>
      </Designerli>
    );
  }
}

export default Designer;
