import React, { Component } from "react";
import styled from "styled-components";
import SignUpContainer from "containers/Registration/SignUpContainer";
// import open_bg from "source/open_bg.jpg";

const SignUpContent = styled.div`
        position: relative;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        background-size: cover;
        background-position: center;
        margin-top:80px;
        margin-bottom:152px;
  }
`;

const SignUpCard = styled.div`
        position: relative;
        z-index: 2;
        box-shadow: 3px 3px 5px #00000029;
        border: 0.5px solid #EAEAEA;
        border-radius: 20px;
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
