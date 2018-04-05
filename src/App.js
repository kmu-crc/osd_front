import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route } from 'react-router-dom';
import DesignListPage from './pages/DesignPage';
import CreateDesignPage from './pages/CreateDesignPage';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/createdesign" component={CreateDesignPage}/>
          <Route exact path="/design" component={DesignListPage}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
