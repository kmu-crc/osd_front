import React, { Component } from 'react';
import ClientTemplate from 'templates/ClientTemplate';
import { PrivacyPolicy } from "components/Commons/About";

class PrivacyPolicyPage extends Component {
  render() {
    return (
      <ClientTemplate>
        <PrivacyPolicy />
      </ClientTemplate>
    );
  }
}

export default PrivacyPolicyPage;
