import React, { Component } from "react";
import styled from "styled-components";

// css styling

const Wrapper = styled.div`
  width: 100%;
  padding: 20px 30px;
`;

const Title = styled.h3`
  
`;

class DesignDetail extends Component {
  render(){
    let designDetail = this.props.DesignDetail;
    return(
      <Wrapper>
        <Title>{designDetail.title}</Title>
        <span>{designDetail.count.like_count}</span>
        {/* <div>
          <span>{designDetail.categoryName.name}</span>
          <span>팀원 {designDetail.count.member_count}명</span>
        </div>
        <div>
          <span>{designDetail.count.total_view_count}</span>
          
          <span>{designDetail.children_count.count}</span>
        </div> */}
      </Wrapper>
    );
  }
}

export default DesignDetail;