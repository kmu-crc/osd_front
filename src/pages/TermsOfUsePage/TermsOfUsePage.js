import React, { Component } from 'react';
import ClientTemplate from 'templates/ClientTemplate';
import { TermsOfUse } from "components/Commons/About";
import { TermsOfUse_mobile } from "components/Commons/About";

class TermsOfUsePage extends Component {
  render() {
    return (
      <ClientTemplate>
        {
          window.innerWidth<500?
          <TermsOfUse_mobile />
          :
          <TermsOfUse />
        }
      </ClientTemplate>
    );
  }
}
export default TermsOfUsePage;
