import styled, { keyframes } from "styled-components";

const fadein = keyframes`
  0% {
    opacity:0;
  }
  100% {
    opacity:0.5;
  }
`;
export const Back = styled.div`
  display:${props => props.visible == true ? "block" : "none"};
  z-index: 100;
  position:fixed;
  width:${window.innerWidth}px;
  height:${window.innerHeight}px;
  opacity:0.5;
  background:transparent linear-gradient(180deg, #707070 0%, #383838 100%) 0% 0% no-repeat padding-box;  
  animation-name: ${fadein};
  animation-duration:1s;
  animation-direction:alternate;
  animation-fill-mode: forwards;
  animation-timing-function: ease-out;
`;
