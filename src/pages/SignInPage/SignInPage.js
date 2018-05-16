import React, { Component } from "react";
import styled from "styled-components";
import ClientTemplate from "templates/ClientTemplate";
import SignInContainer from "containers/Registration/SignInContainer";

const SignUpContent = styled.div`
  width: 100%;
  height:100vh;
  position: relative;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
`;

const SignUpCard = styled.div`
  width: 600px;
  background-color: #fff;
  padding: 30px;
`;

class SignInPage extends Component {
  render() {
    return (
      <ClientTemplate>
        <SignUpContent>
          <SignUpCard>
            <SignInContainer />
          </SignUpCard>
        </SignUpContent>
      </ClientTemplate>
    );
  }
}

export default SignInPage;
