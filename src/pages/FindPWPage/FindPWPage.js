import React, { Component } from "react";
import FindPWContainer from "containers/Registration/FindPWContainer";
import ClientTemplate from "templates/ClientTemplate";
import { isMobile } from "constant";

class SignInPage extends Component {

  render() {

    return (

      <ClientTemplate hideheader={isMobile()}>
        <FindPWContainer loginOpen={true} history={this.props.history} />
      </ClientTemplate>

    );
  }
}

export default SignInPage;
