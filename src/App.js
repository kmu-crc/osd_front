import React, { Component } from "react";
import "./App.css";
import { BrowserRouter } from 'react-router-dom';
import ClientTemplate from './templates/ClientTemplate';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <ClientTemplate/>
      </BrowserRouter>
    );
  }
}

export default App;
