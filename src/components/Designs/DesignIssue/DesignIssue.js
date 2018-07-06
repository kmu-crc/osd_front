import React, { Component } from "react";
import styled from "styled-components";
import { Icon } from "semantic-ui-react";
import StyleGuide from "StyleGuide";
import { Link } from "react-router-dom";
import DesignIssueListContainer from "containers/Designs/DesignIssueListContainer";
import DesignIssueDetailContainer from "containers/Designs/DesignIssueDetailContainer";

// css styling

const IssuePage = styled.div`
  padding-top: 30px;
  padding-bottom: 60px;
  min-height: 200px;
  position: relative;
`;

class DesignIssue extends Component {
  render(){
    const param = this.props.match.params;
    return(
      <IssuePage>
        {param.issue_id && param.issue_id !== null 
        ? <DesignIssueDetailContainer {...this.props}/>
        : <DesignIssueListContainer {...this.props}/>
        } 
      </IssuePage>
    );
  }
}

export default DesignIssue;
