import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'
import styled from "styled-components"
import Logo from "source/osd_logo.png";

const LoadingIconBox = styled.div`
  width:100px;
  height:100px;
  margin:0 auto;
  background: ${props => `url(${props.imageURL})`};
  background-position:center center;
  background-repeat:no-repeat;
  -webkit-animation: jello-horizontal 0.9s infinite both;
            animation: jello-horizontal 0.9s infinite both;
  
  @-webkit-keyframes jello-horizontal {
    0% {
      -webkit-transform: scale3d(1, 1, 1);
              transform: scale3d(1, 1, 1);
    }
    30% {
      -webkit-transform: scale3d(1.25, 0.75, 1);
              transform: scale3d(1.25, 0.75, 1);
    }
    40% {
      -webkit-transform: scale3d(0.75, 1.25, 1);
              transform: scale3d(0.75, 1.25, 1);
    }
    50% {
      -webkit-transform: scale3d(1.15, 0.85, 1);
              transform: scale3d(1.15, 0.85, 1);
    }
    65% {
      -webkit-transform: scale3d(0.95, 1.05, 1);
              transform: scale3d(0.95, 1.05, 1);
    }
    75% {
      -webkit-transform: scale3d(1.05, 0.95, 1);
              transform: scale3d(1.05, 0.95, 1);
    }
    100% {
      -webkit-transform: scale3d(1, 1, 1);
              transform: scale3d(1, 1, 1);
    }
  }
  @keyframes jello-horizontal {
    0% {
      -webkit-transform: scale3d(1, 1, 1);
              transform: scale3d(1, 1, 1);
    }
    30% {
      -webkit-transform: scale3d(1.25, 0.75, 1);
              transform: scale3d(1.25, 0.75, 1);
    }
    40% {
      -webkit-transform: scale3d(0.75, 1.25, 1);
              transform: scale3d(0.75, 1.25, 1);
    }
    50% {
      -webkit-transform: scale3d(1.15, 0.85, 1);
              transform: scale3d(1.15, 0.85, 1);
    }
    65% {
      -webkit-transform: scale3d(0.95, 1.05, 1);
              transform: scale3d(0.95, 1.05, 1);
    }
    75% {
      -webkit-transform: scale3d(1.05, 0.95, 1);
              transform: scale3d(1.05, 0.95, 1);
    }
    100% {
      -webkit-transform: scale3d(1, 1, 1);
              transform: scale3d(1, 1, 1);
    }
  }
`;

const TextWrapper = styled.p`
    color: #707070;
    font-size: 24px;
    font-weight: 500;
    font-family: Noto Sans KR;
`;

function Loading(props) {
    return (
        <Dimmer active>
            {props.ours
                ? <React.Fragment>
                    <LoadingIconBox imageURL={Logo} />
                    <TextWrapper>{props.msg || "데이터를 가져오고 있습니다."}</TextWrapper>
                </React.Fragment>
                :
                <React.Fragment>
                    <Loader size="huge" active >
                        <TextWrapper>{props.msg || "데이터를 가져오고 있습니다."}</TextWrapper>
                    </Loader>
                </React.Fragment>
            }

        </Dimmer>)
}
export default Loading