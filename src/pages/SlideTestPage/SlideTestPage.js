import React, { Component } from 'react';
import ClientTemplate from "templates/ClientTemplate";
import MainSlide from "components/Main/Slide";

class SlideTestPage extends Component {
  render() {
    return (
      <ClientTemplate>
        <MainSlide />
      </ClientTemplate>
    );
  }
}

export default SlideTestPage;
