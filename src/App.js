import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import DesignListPage, { DesignDetailPage } from './pages/DesignPage';
import GroupListPage from './pages/GroupPage';
import DesignerListPage from './pages/DesignerPage';
import CreateDesignPage from './pages/CreateDesignPage';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/createdesign" component={CreateDesignPage}/>
          <Route path="/designDetail/:id" component={DesignDetailPage}/>
          <Route path="/design" component={DesignListPage}/>
          <Route path="/group" component={GroupListPage}/>
          <Route path="/designer" component={DesignerListPage}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
