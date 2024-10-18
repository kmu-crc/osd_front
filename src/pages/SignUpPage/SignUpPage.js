import React, { Component } from "react";
import SignUpContainer from "containers/Registration/SignUpContainer";
import ClientTemplate from "templates/ClientTemplate";
import { isMobile } from "constant";

class SignUpPage extends Component {
  render() {
    return (<ClientTemplate hideheader={isMobile()}>
      <SignUpContainer />
    </ClientTemplate>
    )
  }
}

export default SignUpPage;
