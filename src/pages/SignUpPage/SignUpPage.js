import React, { Component } from "react";
import styled from "styled-components";
import SignUpContainer from "containers/Registration/SignUpContainer";
// import open_bg from "source/open_bg.jpg";

const SignUpContent = styled.div`
        width: 100%;
        height:100vh;
        position: relative;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        background-size: cover;
        background-position: center;
  }
`;

const SignUpCard = styled.div`
        position: relative;
        z-index: 2;
        border-radius: 20px;
        box-shadow: 5px 5px 10px #00000029;
        background: #FFFFFF 0% 0% no-repeat padding-box;
`;

class SignUpPage extends Component {
  render() {
    return (
        <SignUpContent>
          <SignUpCard>
            <SignUpContainer onSubmit={this.handleFormSubmit} />
          </SignUpCard>
        </SignUpContent>
    );
  }
}

export default SignUpPage;
