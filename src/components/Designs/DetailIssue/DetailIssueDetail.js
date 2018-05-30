import React, { Component } from "react";
import styled from "styled-components";
import { Grid } from "semantic-ui-react";

// css styling

const IssueWrapper = styled(Grid)`
  min-width: 660px;
  position: relative;
  background-color: #fff;
  &.ui.grid {
    padding: 10px 20px 40px;
  }
`;

class DetailIssueDetail extends Component {
  render(){
    let data = this.props.data;
    return(
      <IssueWrapper>
        <div className="ui fluid container">
          <h2 className="ui header">{data.title}</h2>
          <p>{data.content}</p>
        </div>
        <button onClick={this.props.handleClick}>목록</button>
      </IssueWrapper>
    );
  }
} 

export default DetailIssueDetail;