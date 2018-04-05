import React, { Component } from 'react';
import styled from 'styled-components';

// css styling

class Designer extends Component {
  render(){
    let designer = this.props.designer;
    return(
      <div>{designer.uid}</div>
    );
  }
}

export default Designer;
