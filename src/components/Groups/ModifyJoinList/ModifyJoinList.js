import React, { Component } from 'react';
import styled from 'styled-components';
import { Grid, Header, Form } from "semantic-ui-react";

// css styling

class ModifyJoinList extends Component {
  componentDidMount(){
    this.props.GetWaitingDesignRequest(this.props.id);
    this.props.GetWaitingGroupRequest(this.props.id);
  }
  render(){
    return(
      <div></div>
    );
  }
}

export default ModifyJoinList;
