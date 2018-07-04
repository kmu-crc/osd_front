import React, { Component } from "react";
import styled from "styled-components";
import ClientTemplate from "templates/ClientTemplate";
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
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

const SignUpCard = styled.div`
  width: 600px;
  padding: 50px 20px;
  background-color: #fff;
`;

const InsertDetail = styled.div`
  position: relative;
  z-index: 2;
  width: 400px;
  padding: 30px 20px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 5px;
`;

const FromFilde = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

class SignUpPage extends Component {
  render() {
    return (
      <ClientTemplate>
        <SignUpContent>
          <InsertDetail>
            <SignUpContainer onSubmit={this.handleFormSubmit} />
          </InsertDetail>
        </SignUpContent>
      </ClientTemplate>
    );
  }
}

export default SignUpPage;
