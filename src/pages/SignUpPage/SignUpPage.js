import React, { Component } from "react";
import styled from "styled-components";
import ClientTemplate from "templates/ClientTemplate";
import SignUpContainer from "containers/Registration/SignUpContainer";

const SignUpContent = styled.div`
  width: 100%;
  padding: 20px 0;
  position: relative;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
`;

const SignUpCard = styled.div`
  width: 600px;
  padding: 50px 20px;
  background-color: #fff;
`;

const InsertDetail = styled.div`
  width: 600px;
  padding: 50px 20px;
  background-color: #fff;
`

const FromFilde = styled.div`
  width: 100%;
  margin-bottom: 20px;
`

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
