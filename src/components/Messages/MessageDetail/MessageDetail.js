import React, { Component } from 'react';
import styled from 'styled-components';
import { Container, Header } from "semantic-ui-react";

// css styling

class MessageDetail extends Component {
  componentDidMount() {
    this.props.GetMyMsgDetailRequest(this.props.token, this.props.id);
  }

  componentWillUnmount() {
    this.props.GetMyMessageDetailClear();
  }

  render(){
    return(
      <div>
        {this.props.id}
      </div>
    );
  }
}

export default MessageDetail;
