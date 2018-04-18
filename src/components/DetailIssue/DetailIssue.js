import React, { Component } from "react";
import styled from "styled-components";

class DetailIssue extends Component {
  render(){
    let issue = this.props.DesignDetailIssue;
    console.log(issue);
    return(
      <div>issue</div>
    );
  }
}

export default DetailIssue;
