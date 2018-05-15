import React, { Component } from "react";
import styled from "styled-components";

// css styling

const Designerli = styled.div`
  width: 300px;
  height: 200px;
  float: left;
  border-radius: 6px 6px 3px 3px;
  box-shadow: 0 1px 2px rgba(25,25,25,0.2);
  background-color: #fff;
`;

const Count = styled.div``;

class Designer extends Component {
  render(){
    let designer = this.props.designer;
    return(
      <Designerli>
        {/* {designer.myProfileImg.m_img == null?
        <div>등록된 사진이 없습니다.</div> :
        <div>{designer.myProfileImg.m_img}</div>
        } */}
        <div>{designer.nick_name}</div>
        <Count>
          <div>{designer.total_like}</div>
          <div>{designer.total_design}</div>
          <div>{designer.total_view}</div>
        </Count>
      </Designerli>
    );
  }
}

export default Designer;
