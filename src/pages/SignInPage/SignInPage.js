import React, { Component } from "react";
import SignInContainer from "containers/Registration/SignInContainer";
import ClientTemplate from "templates/ClientTemplate"
class SignInPage extends Component {
  render() {
    return (<ClientTemplate>
      <SignInContainer history={this.props.history} />
    </ClientTemplate>
    )
  }
}

export default SignInPage;
