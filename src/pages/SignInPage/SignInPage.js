import React, { Component } from "react";
import SignInContainer from "containers/Registration/SignInContainer";

class SignInPage extends Component {
  render() {
    return (
          <SignInContainer history={this.props.history}/>
    )
  }
}

export default SignInPage;
