import React, { Component } from "react";
import styled from "styled-components";
import SignUpContainer from "containers/Registration/SignUpContainer";

const SignUpContent = styled.div`
  width: 100%;
  height: 100vh;
  padding: 20px 0;
  position: relative;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-position: center;
  &::before {
    display: block;
    content: "";
    position: absolute;
    z-index: 1;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
`;

class SignUpPage extends Component {
  render() {
    return (
      <SignUpContent>
        <SignUpContainer onSubmit={this.handleFormSubmit} />
      </SignUpContent>
    )
  }
}

export default SignUpPage;
