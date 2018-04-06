import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route } from 'react-router-dom';
import DesignListPage from './pages/DesignPage';
import DesignDetailPage from './pages/DesignPage';
import GroupListPage from './pages/GroupPage';
import DesignerListPage from './pages/DesignerPage';
import CreateDesignPage from './pages/CreateDesignPage';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/createdesign" component={CreateDesignPage}/>
          <Route exact path="/design" component={DesignListPage}/>
          <Route path="/designDetail/:id" component={DesignDetailPage}/>
          <Route exact path="/group" component={GroupListPage}/>
          <Route exact path="/designer" component={DesignerListPage}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
