import React, { Component } from "react";
import styled from "styled-components";
import SignUpContainer from "containers/Registration/SignUpContainer";
// import open_bg from "source/open_bg.jpg";

const SignUpContent = styled.div`
    width: 100%;
    height:100%;
    position: relative;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    background-size: cover;
    background-position: center;
    margin-top:80px;
    padding:0px 20px;
        // position: relative;
        // box-sizing: border-box;
        // display: flex;
        // justify-content: center;
        // align-items: center;
        // background-size: cover;
        // background-position: center;
        // margin-top:80px;
        // margin-bottom:152px;
  
`;

const SignUpCard = styled.div`
        width:806px;
        height:496px;
        display:flex;
        align-items:center;
        justify-content:center;
        max-width:100%;
        position: relative;
        z-index: 2;
        box-shadow: 3px 3px 5px #00000029;
        border: 0.5px solid #EAEAEA;
        border-radius: 20px;
        background: #FFFFFF 0% 0% no-repeat padding-box;
        margin:0px 20px;
        // position: relative;
        // z-index: 2;
        // box-shadow: 3px 3px 5px #00000029;
        // border: 0.5px solid #EAEAEA;
        // border-radius: 20px;
        // background: #FFFFFF 0% 0% no-repeat padding-box;
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
