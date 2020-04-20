import React, { Component } from "react";
import { Loader, /*Segment, Dimmer*/ } from "semantic-ui-react";
import styled from "styled-components";

const DimmerContainer = styled.div`
  & .ui.loader {
    position: fixed;
    &.ui.dimmer::before {
      border-color: rgba(255,255,255,.7);
    }
    &::after {
      border-color: #000 transparent transparent !important;
    }
  }
`;

class Loading extends Component {
  render() {
    return (
      <DimmerContainer>
        <Loader size="huge" active />
      </DimmerContainer>
    );
  }
}

export default Loading;
