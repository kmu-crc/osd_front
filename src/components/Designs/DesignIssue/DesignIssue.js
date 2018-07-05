import React, { Component } from "react";
import styled from "styled-components";
import { Icon } from "semantic-ui-react";
import StyleGuide from "StyleGuide";
import { Link } from "react-router-dom";
import DesignIssueListContainer from "containers/Designs/DesignIssueListContainer";
import DesignIssueDetailContainer from "containers/Designs/DesignIssueDetailContainer";

// css styling

const IssuePage = styled.div`
  margin-top: 20px;
  min-height: 200px;
  position: relative;
  padding: 60px 40px;
  box-shadow: 0px 1px 2px 2px rgba(0,0,0,0.1);
  background-color: #fff;
  border-radius: 3px;
`;

const IssueHeader = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  height: 3px;
  background-color: ${StyleGuide.color.geyScale.scale5};
  & > a {
    position: absolute;
    top: 10px;
    right: 3px;
    color: ${StyleGuide.color.geyScale.scale6};
  }
`;

class DesignIssue extends Component {
  render(){
    const param = this.props.match.params;
    return(
      <IssuePage>
        <IssueHeader>
          <Link to={`/designDetail/${this.props.match.params.id}`}>
            <Icon name="close" size="large"></Icon>
          </Link>
        </IssueHeader>
        {param.issue_id && param.issue_id !== null 
        ? <DesignIssueDetailContainer {...this.props}/>
        : <DesignIssueListContainer {...this.props}/>
        } 
      </IssuePage>
    );
  }
}

export default DesignIssue;
