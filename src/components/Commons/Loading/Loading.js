import React, { Component } from "react";
import { Loader, Dimmer, } from "semantic-ui-react";
import styled from "styled-components";

const DimmerContainer = styled(Dimmer)`
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
const TextWrapper = styled.p`
    color: #707070;
    font-size: 24px;
    font-weight: 500;
    font-family: Noto Sans KR;
`;

class Loading extends Component {
  render() {
    return (
      <DimmerContainer active>
        <Loader size="huge" active>
          <TextWrapper>{this.props.msg || "데이터를 가져오고 있습니다."}</TextWrapper>
        </Loader>
      </DimmerContainer>
    );
  }
}

export default Loading;
