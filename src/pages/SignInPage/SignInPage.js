import React, { Component } from "react";
import styled from "styled-components";
import SignInContainer from "containers/Registration/SignInContainer";
import open_bg from "source/noimg.png";

const SignUpContent = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  background-color: #f2f2f2;
  background-image: url(${open_bg});
  background-size: cover;
  background-position: center;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  &::before{
    position: absolute;
    display: block;
    content: "";
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index:1;
    background-color: rgba(0,0,0,0.7);
  };
`;

const SignUpCard = styled.div`
  width: 400px;
  position: relative;
  padding: 30px;
  border-radius: 5px;
  background-color: rgba(255,255,255,0.9);
  z-index: 2;
`;

class SignInPage extends Component {
  render() {
    return (
      // <SignUpContent>
      //   <SignUpCard>
          <SignInContainer history={this.props.history}/>
      //   </SignUpCard>
      // </SignUpContent>
    )
  }
}

export default SignInPage;
