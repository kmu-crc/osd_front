import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'
import styled from "styled-components"
import Logo from "source/logo.png";

// const TextWrapper = styled.p`
//     color: #707070;
//     font-size: 24px;
//     font-weight: 500;
//     font-family: Noto Sans KR;
// `;
const LoadingBox = styled.div`
  padding: 20px;
  background-color: #FFFFFF;
  border-radius: 35px;
  .IconBox{
    width:100px;
    height:100px;
    margin:0 auto;
  }
  .loadingText{
    margin-top: 20px;
    width: 100%;
    font-family: Noto Sans KR;
    font-size: 20px;
    text-align: center;
    color: black;
  }
`;
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
  }
`;
function Loading() {
    return (<React.Fragment>
        <Dimmer active>
            {/* <Loader size="huge" active > */}
            <LoadingBox>
                <LoadingIconBox imageURL={Logo} />
                <div className="loadingText"> 처리중입니다...</div>
            </LoadingBox>
            {/* <TextWrapper>데이터를 가져오고 있습니다.</TextWrapper> */}
            {/* </Loader> */}
        </Dimmer>
    </React.Fragment>)
}
export default Loading