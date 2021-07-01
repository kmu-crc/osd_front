import React, { Component } from "react";
import styled from "styled-components";
import SignUpContainer from "containers/Registration/SignUpContainer";
// import open_bg from "source/open_bg.jpg";



class SignUpPage extends Component {
  render() {
    return (
            <SignUpContainer onSubmit={this.handleFormSubmit} />
    );
  }
}

export default SignUpPage;
