import React, { Component } from "react";
import styled from "styled-components";
import SignInContainer from "containers/Registration/SignInContainer";
import open_bg from "source/open_bg.jpg";

const SignUpContent = styled.div`
  width: 100%;
  height:100vh;
  position: relative;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
  background-image: url(${open_bg});
  background-size: cover;
  background-position: center;
  &::before{
    display: block;
    content: "";
    position: absolute;
    z-index:1;
    background-color: rgba(0,0,0,0.7);
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
`;

const SignUpCard = styled.div`
  position: relative;
  z-index: 2;
  width: 400px;
  background-color: rgba(255,255,255,0.9);
  padding: 30px;
  border-radius: 5px;
`;

class SignInPage extends Component {
  render() {
    return (
        <SignUpContent>
          <SignUpCard>
            <SignInContainer />
          </SignUpCard>
        </SignUpContent>
    )
  }
}

export default SignInPage;
