import React, { Component } from "react";
import DesignIssueListContainer from "containers/Designs/DesignIssueListContainer";
import DesignIssueDetailContainer from "containers/Designs/DesignIssueDetailContainer";

// css styling

class DesignIssue extends Component {
  render(){
    const param = this.props.match.params;
    return(
      <div>
        {param.issue_id && param.issue_id !== null 
        ? <DesignIssueDetailContainer {...this.props}/>
        : <DesignIssueListContainer {...this.props}/>
        } 
      </div>
    );
  }
}

export default DesignIssue;
