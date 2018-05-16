import React, { Component } from "react";
import ClientTemplate from "templates/ClientTemplate";
import MainContainer from "containers/MainContainer";

class MainPage extends Component {
  render() {
    return(
      <ClientTemplate>
        <MainContainer />
      </ClientTemplate>
    );
  }
}

export default MainPage;
