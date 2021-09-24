import React, { Component } from 'react';
import MainContainer from "containers/Main/MainContainer";
import ClientTemplate from "templates/ClientTemplate"

class MainPage extends Component {
  render() {
    return (
    <ClientTemplate>
        <MainContainer {...this.props} />
    </ClientTemplate>)
  }
}

export default MainPage;
