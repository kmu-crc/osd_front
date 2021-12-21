import React, { Component } from 'react';
import ClientTemplate from 'templates/ClientTemplate';
import { PrivacyPolicy } from "components/Commons/About";
import { PrivacyPolicy_mobile } from "components/Commons/About";
import { isMobile } from "constant";

class PrivacyPolicyPage extends Component {
  render() {
    return (
      <ClientTemplate>
        {isMobile()
          ? <PrivacyPolicy_mobile />
          : <PrivacyPolicy />
        }
      </ClientTemplate>
    );
  }
}

export default PrivacyPolicyPage;
