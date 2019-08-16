import React, { Component } from "react";
import styled from "styled-components";
import SignUpContainer from "containers/Registration/SignUpContainer";
import open_bg from "source/open_bg.jpg";

const SignUpContent = styled.div`
  width: 100%;
  height: 100vh;
  padding: 20px 0;
  position: relative;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
  background-image: url(${open_bg});
  background-size: cover;
  background-position: center;
  &::before {
    display: block;
    content: "";
    position: absolute;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.7);
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
`;

const InsertDetail = styled.div`
  position: relative;
  z-index: 2;
  width: 400px;
  padding: 30px 20px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 5px;
`;

class SignUpPage extends Component {
  render() {
    return (
        <SignUpContent>
          <InsertDetail>
            <SignUpContainer onSubmit={this.handleFormSubmit} />
          </InsertDetail>
        </SignUpContent>
    )
  }
}

export default SignUpPage;
