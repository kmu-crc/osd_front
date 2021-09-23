import React, { Component } from 'react';
import ClientTemplate from 'templates/ClientTemplate';
import { TermsOfUse } from "components/Commons/About";

class TermsOfUsePage extends Component {
  render() {
    return (
      <ClientTemplate>
        <TermsOfUse />
      </ClientTemplate>
    );
  }
}
export default TermsOfUsePage;
