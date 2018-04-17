import React, { Component } from "react";
import styled from "styled-components";

// css styling

const Wrapper = styled.div`
  width: 100%;
  padding: 20px 30px;
  & h3 {
    font-size: 24px;
  }
  & .explanation {
    width: 800px;
    margin: 20px 5px 40px;
  }
`;

const Count = styled.div`
  & span {
    float: left;
    margin-right: 30px;
    color: dimgray;
    font-weight: 400;
    font-size: 13px;
    padding-left: 20px;
  } 
`;

class GroupDetail extends Component {
  render(){
    const groupDetail = this.props.GroupDetail;
    return(
      <div>
        {groupDetail.length !== 0 && 
          <Wrapper>
            <h3>{groupDetail.title}</h3>
            <Count>
              <span>{groupDetail.count.design}</span>
              <span>{groupDetail.count.like}</span>
              <span>{groupDetail.count.member}</span>
              <div className="clear"></div>
            </Count>
            <div className="explanation">{groupDetail.explanation}</div>
          </Wrapper>
        }
      </div>
    );
  }
}

export default GroupDetail;