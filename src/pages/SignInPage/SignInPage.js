import React, { Component } from "react";
import SignInContainer from "containers/Registration/SignInContainer";
import ClientTemplate from "templates/ClientTemplate";
import { isMobile } from "constant";

class SignInPage extends Component {

  render() {

    return (

      isMobile()

        ? <SignInContainer loginOpen={true} history={this.props.history} />

        : <ClientTemplate>
          <SignInContainer loginOpen={true} history={this.props.history} />
        </ClientTemplate>
    );
  }
}

export default SignInPage;
