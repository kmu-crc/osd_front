import React, { Component } from 'react';
import ClientTemplate from "templates/ClientTemplate";
import TestContainer from "containers/TestContainer";
class TestPage extends Component {
  render() {
    return (
      <ClientTemplate>
        <TestContainer />
      </ClientTemplate>
    );
  }
}

export default TestPage;
