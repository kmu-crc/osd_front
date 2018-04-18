import React, { Component } from "react";
import styled from "styled-components";

class DetailStep extends Component {
  render(){
    let step = this.props.DesignDetailStep;
    return(
      <div>
      {step.length !== 0 && 
        <div>{step[0].uid}</div>
      }
    </div>
    );
  }
}

export default DetailStep;
