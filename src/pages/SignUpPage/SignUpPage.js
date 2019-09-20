import React, { Component } from "react";
import styled from "styled-components";
import SignUpContainer from "containers/Registration/SignUpContainer";

const SignUpContent = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  padding: 20px 0;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-position: center;
  box-sizing: border-box;
  &::before {
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    position: absolute;
    display: block;
    content: "";
    z-index: 1;
  }
`;

class SignUpPage extends Component {
  render() {
    return (
      <SignUpContent>
        <SignUpContainer/>
      </SignUpContent>
    )
  }
}

export default SignUpPage;
