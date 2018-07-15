import React, { Component } from 'react';
import ClientTemplate from "templates/ClientTemplate";
import TestForm from "components/TestForm2";
class TestPage extends Component {
  render() {
    return (
      <ClientTemplate>
        <TestForm />
      </ClientTemplate>
    );
  }
}

export default TestPage;
